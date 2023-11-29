import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Topic } from "src/topics/topic.entity";
import { Repository } from "typeorm";

@Injectable()
export class RepostService {

    constructor(
        @InjectRepository(Topic)
        private readonly repository: Repository<Topic>
    ) { }

    // Vai ser assim no like, mas ao invés de 'repost' vai ser 'topic'. 
    findByTopic(topic: Topic): Promise<Topic[]> {
        return this.repository.find({
            where: {
                repost: {
                    id: topic.id
                }
            }
        });
    }
}