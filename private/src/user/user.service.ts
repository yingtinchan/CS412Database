import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { Teacher } from './entities/teacher.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Admin } from './entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { checkPassword } from '../utils/hash';
import { UserForgetPWError, UserNotExistError, UserPasswordMissMatchError, UserStudentError } from '../utils/errorhandling';
import { MailerService } from '@nestjs-modules/mailer';
import { UserController } from './user.controller';
import { jwtConstants } from '../utils/constants';
import { AuthGuard } from './auth.guard';
import { request } from 'express';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,

    private jwtService: JwtService,

    private readonly mailerService: MailerService
  ) { }

  createStudent(createStudentDto: CreateStudentDto) {
    const data = this.studentRepository.create(createStudentDto);
    
    if(!data.major || data.major==null){
      throw new UserStudentError();
    }

    return this.studentRepository.save(data);
  }

  async findAllStudent() {
    return await this.studentRepository.createQueryBuilder('student')
    .innerJoinAndSelect('student.major', 'major')
    .orderBy('student.student_id', 'ASC').getMany();
  }

  findOneStudent(id: string) {
    return this.studentRepository.createQueryBuilder("student")
    .innerJoinAndSelect('student.major', 'major')
    .where("student.student_id = :id", { id: id }).getOne();
  }

  updateStudent(id: string, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.update(id,updateStudentDto);
  }

  removeStudent(id: number) {
    return this.studentRepository.delete(id);
  }

  createTeacher(createTeacherDto: CreateTeacherDto) {
    const data = this.teacherRepository.create(createTeacherDto);
    return this.teacherRepository.save(data);
  }

  findAllTeacher() {
    return this.teacherRepository.find();
  }

  findOneTeacher(id: string) {
    return this.teacherRepository.createQueryBuilder("teacher")
      .where("teacher.teacher_id = :id", { id: id }).getOne();
  }

  updateTeacher(id: string, updateTeacherDto: UpdateTeacherDto) {
    return this.teacherRepository.update(id,updateTeacherDto);
  }

  removeTeacher(id: number) {
    return this.teacherRepository.delete(id);
  }

  createAdmin(createAdminDto: CreateAdminDto) {
    const data = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(data);
  }

  findAllAdmin() {
    return this.adminRepository.find();
  }

  findOneAdmin(id: string) {
    return this.adminRepository.createQueryBuilder("admin")
      .where("admin.admin_id = :id", { id: id }).getOne();
  }

  updateAdmin(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.update(id,updateAdminDto);
  }

  removeAdmin(id: number) {
    return this.adminRepository.delete(id);
  }

  async login(id: string, password: string) {
    var data: Teacher | Admin | Student |any;
    var payload: { id:string, name:string, role:string} = {
      id:'',
      name:'',
      role:'',
    };   
    if (id.substring(0, 1) == "A") {
      data = await this.adminRepository.findOneBy({ admin_id: id })
      payload.id = data.admin_id;
      payload.role = 'admin'
    } else if (id.substring(0, 1) == "S") {
      data = await this.studentRepository.findOneBy({ student_id: id })
      payload.id = data.student_id;
      payload.role = 'student'
    } else if (id.substring(0, 1) == "T") {
      data = await this.teacherRepository.findOneBy({ teacher_id: id })
      payload.id = data.teacher_id;
      payload.role = 'teacher'
    }
    payload.name = data.name;
    const token = await this.jwtService.sign(payload);

    if (data == null) {
      throw new UserNotExistError();
    } else {
      if (await checkPassword(password, data["password"])) {
        return {
          "statusCode": 200,
          "msg": "login success",
          access_token: token,
          data: data,
          role: payload.role
        };
      } else {
        throw new UserPasswordMissMatchError();
      }
    }
  }
  
  async forgetPWByEmail(email: string, verifyUrl: string){
    var _rtn = {
      "statusCode": 200,
      "msg": "mail success",
    };
    const promise1 = new Promise(async (resolve, reject) => {
      try{
        var _info=null;
        var role="";
        var userId="";
        var id="";
        _info = await this.studentRepository.createQueryBuilder("student")
        .where("student.email = :email", { email: email }).getOne();
        if(_info){
          role="student";
          userId=_info.student_id;
          id=_info.id;
        }
        if(!_info){
          _info = await this.teacherRepository.createQueryBuilder("teacher")
          .where("teacher.email = :email", { email: email }).getOne();
          if(_info){
            role="teacher";
            userId=_info.teacher_id;
            id=_info.id;
          }
        }
        if(!_info){
          _info = await this.adminRepository.createQueryBuilder("admin")
          .where("admin.email = :email", { email: email }).getOne();
          if(_info){
            role="admin";
            userId=_info.admin_id;
            id=_info.id;
          }
        }
        var name=_info.name;

        var payload: { id:string, name:string, role:string } = {
          id:id,
          name:name,
          role:role
        };   
        const token = await this.jwtService.sign(payload);
        //var _verifyUrl="http://34.150.5.152:3001/user/verify/"+token;
        var _verifyUrl=verifyUrl+token;
        
        console.log(token);
        this.mailerService
        .sendMail({
          to: email,
          from: 'no_reply@HKITCs412Group5.com',
          subject: 'Request to change your password',
          html: '<b>Dear '+name+'</b> <p>There was a request to change your password.</p> <p>If you did not make this request then please ignore this email.</p> <p>Otherwise, please click this link to change your password: <a href="+'+_verifyUrl+'+">'+_verifyUrl+'</a></p>',
        })
        .then(()=>{resolve(_rtn);})
        .catch(ex=>{console.log(ex);_rtn.statusCode=401;_rtn.msg="error";resolve(_rtn);})
      }catch(ex){
        //console.log(ex);
        _rtn.statusCode=401;_rtn.msg="error";resolve(_rtn);
      }
    });
    await promise1.then((value) => {
      return value;
    });
    return _rtn;
  }

  async verifyForgetPW(newPW: string, token: string){
    console.log(token.split(' ')[1]);
    const payload = await this.jwtService.verifyAsync(
      token.split(' ')[1],
      {
        secret: jwtConstants.secret
      }
    );

    if(payload.role=="student"){
      return this.updateStudent(payload.id, {"password":newPW});
    }else if(payload.role=="teacher"){
      return this.updateTeacher(payload.id, {"password":newPW});
    }else if(payload.role=="admin"){
      return this.updateAdmin(payload.id, {"password":newPW});
    }

    //console.log(payload);
    //console.log(newPW);
    return newPW;
  }
}
