import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
    book_id: number;
    available: boolean;
    student?: String;
    teacher?: String;
}
