import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @Column({ length: 250 })
    content: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}