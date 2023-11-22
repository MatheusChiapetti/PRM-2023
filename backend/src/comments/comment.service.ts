import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topic } from "src/topics/topic.entity";
import { Repository } from "typeorm";
import { Comment } from "./comment.entity";

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment)
        private readonly repository: Repository<Comment>
    ) { }

    // Mesmo método para o CURTIR.
    // Like é uma palavra reservada do SQL, por isso usar entre `like` crases.

    findByTopic(topic: Topic): Promise<Comment[]> {
        return this.repository.find({
            where: {
                topic: {
                    id: topic.id
                }
            }
        });
    }

    create(topic: Comment): Promise<Comment> {
        return this.repository.save(topic);
    }

    // TALVEZ USE NO LIKE: 
    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

}