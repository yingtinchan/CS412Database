import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Lecture {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    lecture_id: string;
  
    @Column()
    name: string;

    @Column()
    start_time: string;

    @Column()
    end_time: string;

    @Column()
    sem: string;
    
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

