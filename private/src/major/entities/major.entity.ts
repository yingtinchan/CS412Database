import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Major {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ unique: true })
    major_id: string;
  
    @Column()
    name: string;
    
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}
