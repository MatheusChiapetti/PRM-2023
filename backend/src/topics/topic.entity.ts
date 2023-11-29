import { User } from "src/users/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Tree, TreeParent, UpdateDateColumn, VirtualColumn } from "typeorm";

@Tree('materialized-path')
@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, length: 250 })
    content: string;

    @ManyToOne(() => User, {eager: true, nullable: false})
    @JoinColumn({name: 'user_id'})
    owner: User; 

    @TreeParent()
    @JoinColumn({name: 'topic_id'})
    repost: Topic;                        // Representa a relação entre as classes (pai e filho).

    @Column({name: 'topic_id', nullable: true})
    topic_id: number;                     // Para saber que há o id no tópico pai.

    @VirtualColumn({query: (alias) => `select count(id) from topic_user_comment where topic_id = ${alias}.id`})
    totalComments: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date; 
}