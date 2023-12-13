import { Injectable } from '@nestjs/common';
import { CreateMajorDto } from './dto/create-major.dto';
import { UpdateMajorDto } from './dto/update-major.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from './entities/major.entity';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(Major)
    private readonly majorRepository: Repository<Major>,
  ){}
  create(createMajorDto: CreateMajorDto) {
    const data = this.majorRepository.create(createMajorDto);
    return this.majorRepository.save(data);
  }

  findAll() {
    return this.majorRepository.find();
  }

  find(id: string) {
    return this.majorRepository
    .createQueryBuilder("major")
    .where("major.major_id like :major_id", { major_id:`%${id}%` })
    .getMany();
  }

  update(id: number, updateMajorDto: UpdateMajorDto) {
    return `This action updates a #${id} major`;
  }

  remove(id: number) {
    return this.majorRepository.delete(id);
  }
}
