import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ){}
  async create(createAttendanceDto: CreateAttendanceDto) {
    const data = this.attendanceRepository.create(createAttendanceDto);
    return this.attendanceRepository.save(data);
  }

  async findAll() {
    return await this.attendanceRepository.query(
      `SELECT * FROM attendance WHERE attendance=1;`
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} attendance`;
  }

  update(id: number, updateAttendanceDto: UpdateAttendanceDto) {
    return `This action updates a #${id} attendance`;
  }

  remove(id: number) {
    return this.attendanceRepository.delete(id);
  }
}
