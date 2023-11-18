import { Topic } from "src/topics/topic.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Estrutura para o CURTIR da prova. 
// O CURTIR não precisa do 

// Criar um arquivo 'entity', um arquivo 'service', 

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 250 })
    content: string;

    @ManyToOne(() => User, {eager: true, nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User; 

    @ManyToOne(() => Topic, {eager: true, nullable: false})
    @JoinColumn({name: 'topic_id'})
    topic: Topic; 

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date; 
}