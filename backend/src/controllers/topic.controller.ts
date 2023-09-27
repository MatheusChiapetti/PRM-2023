import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import {Topic} from "src/entities/topic.entity";
import { TopicService } from "src/services/topic.service";
import { Repository } from "typeorm";

@Controller('topic')
export class TopicController {

    constructor(private service: TopicService){}

    @Get()
    findAll(): Promise<Topic[]> {
        return this.service.findAll();
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Topic> {
        return this.service.findById(id);
    }

    @Post()
    create(@Body() topic: Topic): Promise<Topic> {
        return this.repository.save(topic);
    }

    

}