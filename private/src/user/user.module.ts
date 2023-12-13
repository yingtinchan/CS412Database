import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from '../book/entities/book.entity';
import { Teacher } from './entities/teacher.entity';
import { Major } from '../major/entities/major.entity';
import { Student } from './entities/student.entity';
import { Admin } from './entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../utils/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {expiresIn: '3600s'},
    }),
    TypeOrmModule.forFeature([Book, Admin, Teacher, Student, Major])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
