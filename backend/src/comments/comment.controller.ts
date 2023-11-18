import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { TopicService } from "src/topics/topic.service";
import { AuthGuard } from "src/auth/auth.guard";
import { Comment } from "./comment.entity";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('comments')
export class CommentController {
    constructor(private readonly service: CommentService, private readonly topicService: TopicService) { }

    // Algoritmo igual no CURTIR. 
    // ------------------------------------------------------------------------- //
    @UseGuards(AuthGuard)
    @Get()
    async findByTopic(@Query() query): Promise<Comment[]> {

        if (!query?.topic) {
            throw new HttpException('Tópico não informado. ', HttpStatus.BAD_REQUEST);
        }
        const found = await this.topicService.findById(query.usename);

        if (!found) {
            throw new HttpException('Tópico não encontrado. ', HttpStatus.BAD_REQUEST);
        }

        return this.service.findByTopic(found);
    }
    // ------------------------------------------------------------------------- //

    @Post()
    create(@Body() topic: Comment): Promise<Comment> {
        return this.service.create(topic);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.service.delete(id);
    }
}