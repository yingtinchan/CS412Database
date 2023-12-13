import { Injectable } from '@nestjs/common';
import { CreateLectureDto } from './dto/create-lecture.dto';
import { UpdateLectureDto } from './dto/update-lecture.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lecture } from './entities/lecture.entity';

@Injectable()
export class LectureService {
  constructor(
    @InjectRepository(Lecture)
    private readonly lectureRepository: Repository<Lecture>,
  ){}
  create(createLectureDto: CreateLectureDto) {
    const data = this.lectureRepository.create(createLectureDto);
    return this.lectureRepository.save(data);
  }

  findAll() {
    return this.lectureRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} lecture`;
  }

  update(id: number, updateLectureDto: UpdateLectureDto) {
    return `This action updates a #${id} lecture`;
  }

  remove(id: number) {
    return this.lectureRepository.delete(id);
  }

  getLectureById(id: string){
    var _table="student";
    if(id.toUpperCase().substring(0, 1) == "T"){
      _table="teacher";
    }
    var _sql="select *,lecture.name as lecture_name from lecture inner join "+_table+"_lectures_lecture on lecture.id = "+_table+"_lectures_lecture.lectureId inner join "+_table+" on "+_table+".id = "+_table+"_lectures_lecture."+_table+"Id where "+_table+"."+_table+"_id='"+id+"';";
    //console.log(_sql);
    return this.lectureRepository.query(_sql);
  }
}
