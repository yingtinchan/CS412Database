import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get(':id')
  findByUserID(@Param('id') id: string) {
    return this.bookService.findByUserID(id);
  }

  @Get('name')
  getByName(@Query() query: {name:string} ) {
    return this.bookService.findByName(query.name);
  }
  
  @Get('author')
  getByAuthor(@Query() query: {author:string}) {
    return this.bookService.findByAuthor(query.author);
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
