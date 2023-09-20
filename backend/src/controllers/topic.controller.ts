import { Controller, Get } from "@nestjs/common";
import { TopicService } from "src/services/topic.service";

@Controller('topic')
export class TopicController {

    constructor(private service: TopicService){}

    @Get()
    getProfile() {
        return this.service.topic();
    }

}