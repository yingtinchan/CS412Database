import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AuthGuard } from './auth.guard';
import { Teacher } from './entities/teacher.entity';;
import { hashPassword } from "../utils/hash";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('/verifyForgetPW')
  async verifyForgetPW(@Body() body: {newPW:string}, @Req() req){
    return this.userService.verifyForgetPW(await hashPassword(body.newPW),req.headers.authorization);
  }

  @Post('/forgetPWByEmail')
  forgetPWByEmail(@Body() body: {email:string, verifyUrl:string}){
    return this.userService.forgetPWByEmail(body.email, body.verifyUrl);
  }

  @Post('/login')
  login(@Body() body: {id:string, password:string}){
    let id = body.id.trim();
    let password = body.password.trim();
    return this.userService.login(id, password);
  }
  
  @Post('/student')
  async createStudent(@Body() createStudentDto: CreateStudentDto) {
    let findlastid = null;
    var autoGenId=1;
    try{
      findlastid = await this.userService.findAllStudent();
      autoGenId=findlastid[findlastid.length-1].id+1;
    }catch(ex){

    }
    let genid = "S"+(autoGenId).toString();

    while(genid.length<8){
      genid = genid.substring(0, 1) + '0' + genid.substring(1)
    }
    createStudentDto.student_id = genid;
    createStudentDto.password = await hashPassword(createStudentDto.password);
    return this.userService.createStudent(createStudentDto);
  }

  @UseGuards(AuthGuard)
  @Get('/student')
  findAllStudent() {
    //console.log("controller:findAllStudent:38");
    return this.userService.findAllStudent();
  }

  @Get('/student/:id')
  findOneStudent(@Param('id') id: string) {
    //console.log("controller:findOneStudent:44");
    return this.userService.findOneStudent(id);
  }

  @Patch('/student/:id')
  async updateStudent(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    if(updateStudentDto.password){
      updateStudentDto.password = await hashPassword(updateStudentDto.password);
    }
    return this.userService.updateStudent(id, updateStudentDto);
  }

  @Delete('/student/:id')
  removeStudent(@Param('id') id: string) {
    return this.userService.removeStudent(+id);
  }

  @Post('/teacher')
  async createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    let findlastid = null;
    var autoGenId=1;
    try{
      findlastid = await this.userService.findAllTeacher();
      autoGenId=findlastid[findlastid.length-1].id+1;
    }catch(ex){

    }

    let genid = "T"+(autoGenId).toString();
    //let genid = "T"+(findlastid.length+1).toString();
    while(genid.length<8){
      genid = genid.substring(0, 1) + '0' + genid.substring(1)
    }
    createTeacherDto.teacher_id = genid;
    createTeacherDto.password = await hashPassword(createTeacherDto.password);
    return this.userService.createTeacher(createTeacherDto);
  }

  @Get('/teacher')
  findAllTeacher() {
    return this.userService.findAllTeacher();
  }

  @Get('/teacher/:id')
  findOneTeacher(@Param('id') id: string) {
    return this.userService.findOneTeacher(id);
  }

  @Patch('/teacher/:id')
  async updateTeacher(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    if(updateTeacherDto.password){
      updateTeacherDto.password = await hashPassword(updateTeacherDto.password);
    }
    return this.userService.updateTeacher(id, updateTeacherDto);
  }

  @Delete('/teacher/:id')
  removeTeacher(@Param('id') id: string) {
    return this.userService.removeTeacher(+id);
  }

  @Post('/admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    let findlastid = null;
    var autoGenId=1;
    try{
      findlastid = await this.userService.findAllAdmin();
      autoGenId=findlastid[findlastid.length-1].id+1;
    }catch(ex){

    }
    let genid = "A"+(autoGenId).toString();
    //let genid = "A"+(findlastid.length+1).toString();
    while(genid.length<8){
      genid = genid.substring(0, 1) + '0' + genid.substring(1)
    }
    createAdminDto.admin_id = genid;
    createAdminDto.password = await hashPassword(createAdminDto.password);
    return this.userService.createAdmin(createAdminDto);
  }

  @Get('/admin')
  findAllAdmin() {
    return this.userService.findAllAdmin();
  }

  @Get('/admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.userService.findOneAdmin(id);
  }

  @Patch('/admin/:id')
  async updateAdmin(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    if(updateAdminDto.password){
      updateAdminDto.password = await hashPassword(updateAdminDto.password);
    }
    return this.userService.updateAdmin(+id, updateAdminDto);
  }

  @Delete('/admin/:id')
  removeAdmin(@Param('id') id: string) {
    return this.userService.removeAdmin(+id);
  }
}
