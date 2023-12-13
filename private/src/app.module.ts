import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { UserModule } from './user/user.module';
import { MajorModule } from './major/major.module';
import { join } from 'path';
import { LectureModule } from './lecture/lecture.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
          host: 'smtp.gmail.com',
          port: 465,
          ignoreTLS: true,
          secure: true,
          auth: {
              user: "hkithkit75@gmail.com",
              pass: "bvqa heai malh lptm"
          },
      },
      defaults: {
          from: '"No Reply" <no-reply@gmail.com>',
      },
      preview: false,
      template: {
          dir: process.cwd() + '/template/',
          adapter: new EjsAdapter(),
          options: {
              strict: true,
          },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'school',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
      autoLoadEntities: true,
    }),
    BookModule,
    UserModule,
    MajorModule,
    LectureModule,
    AttendanceModule,],
})
export class AppModule {}