import { Lecture } from "../../lecture/entities/lecture.entity";
import { Student } from "../../user/entities/student.entity";
import { PrimaryGeneratedColumn, Column, Entity, JoinColumn, ManyToOne, OneToOne, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class Attendance {
    @PrimaryGeneratedColumn()
    id:number;

    @ManyToOne(() => Lecture, (lecture) => lecture.lecture_id)
    @JoinColumn({ name: "lecture_id", referencedColumnName: "lecture_id" })
    lecture_id: Lecture['lecture_id'];
  
    @ManyToOne(() => Student, (student) => student.student_id)
    @JoinColumn({ name: "student_id", referencedColumnName: "student_id" })
    student_id: Student['student_id'];

    @Column()
    attendance: boolean;
}


