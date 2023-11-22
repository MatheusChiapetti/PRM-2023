import { Topic } from "src/topics/topic.entity";
import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// Estrutura para o CURTIR da prova semelhante ao REPOST e COMMENT. 

// PARA A PROVA (CURTIR): Criar um arquivo 'entity', um arquivo 'service', um arquivo 'controller' e um arquivo 'module'. 

// PARA A PROVA (CURTIR): Replicar o COMMENT. 

@Entity('topic_user_comment')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    // O CURTIR não vai ter isso: 
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