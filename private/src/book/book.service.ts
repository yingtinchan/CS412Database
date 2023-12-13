import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  create(createBookDto: CreateBookDto) {
    const data = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(data);
  }

  async findAll() {
    return await this.bookRepository.query(
      `SELECT * FROM book;`
    );
  }

  findByUserID(id: string) {
    if (id.substring(0, 1) == "S") {
      return this.bookRepository.createQueryBuilder('book')
        .where("book.student = :id", { id: id }).getMany();
    } else if (id.substring(0, 1) == "T") {
      return this.bookRepository.createQueryBuilder('book')
        .where("book.teacher = :id", { id: id }).getMany();
    }
  }

  findByName(name: string) {
    console.log("book name",name)
    return this.bookRepository
      .createQueryBuilder("book")
      .where("book.name like :name", { name: `%${name}%` })
      .getMany();
  }

  findByAuthor(author: string) {
    return this.bookRepository
      .createQueryBuilder("book")
      .where("book.author like :author", { author: `%${author}%` })
      .getMany();
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, {    
      available: false,
      student: updateBookDto.student as string,
      teacher: updateBookDto.teacher as string});
  }

  remove(id: number) {
    return this.bookRepository.delete(id);
  }
}
