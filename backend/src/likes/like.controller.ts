import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { TopicService } from "src/topics/topic.service";
import { AuthGuard } from "src/auth/auth.guard";
import { LikeService } from "./like.service";
import { Topic } from "src/topics/topic.entity";
import { Like } from "./like.entity";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('likes')
export class LikeController {
    constructor(
        private readonly likeService: LikeService, 
        private readonly topicService: TopicService) 
    { }

    @UseGuards(AuthGuard)
    @Get()
    async filterByTopic(@Query() query): Promise<Like[]> {

        if (!query?.topic) {
            throw new HttpException('Curtida não informada. ', HttpStatus.BAD_REQUEST);
        }

        const found = await this.topicService.findById(query.topic);

        if (!found) {
            throw new HttpException('Curtida não encontrada. ', HttpStatus.BAD_REQUEST);
        }

        return this.likeService.findByTopic(found);
    }

}