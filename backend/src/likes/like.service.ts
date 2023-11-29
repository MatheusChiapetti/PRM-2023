import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topic } from "src/topics/topic.entity";
import { Repository } from "typeorm";
import { Like } from "./like.entity";

@Injectable()
export class LikeService {

    constructor(
        @InjectRepository(Like)
        private readonly repository: Repository<Like>
    ) { }

    findByTopic(topic: Topic): Promise<Like[]> {
        return this.repository.find({
            where: {
                topic: {
                    id: topic.id
                }
            }
        });
    }
}