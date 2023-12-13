import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Student } from '../user/entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Student])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
