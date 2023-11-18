import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { Topic } from "./topic.entity";
import { TopicService } from "./topic.service";
import { UserService } from "src/users/user.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('topics')
export class TopicController {
    constructor(private readonly service: TopicService, private readonly userService: UserService) { }

    @UseGuards(AuthGuard)
    @Get()
    async findAll(@Query() query): Promise<Topic[]> {

        if (query?.usename) {
            const found = await this.userService.findByUsername(query.usename);
            if(!found) {
                throw new HttpException('Usuário não encontrado. ', HttpStatus.BAD_REQUEST);
            }
            return this.service.findByUser(found);
        } else {
            return this.service.findAll();
        }
    }

    @Get(':id')
    findById(@Param('id', ParseIntPipe) id: number): Promise<Topic> {

        const found = this.service.findById(id);

        if (!found) {
            throw new HttpException('Topic not found', HttpStatus.NOT_FOUND)
        }

        return found;
    }

    @Post()
    create(@Body() topic: Topic): Promise<Topic> {
        return this.service.create(topic);
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {

        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Topic not found', HttpStatus.NOT_FOUND)
        }

        return this.service.delete(found.id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() topic: Topic): Promise<Topic> {

        const found = await this.service.findById(id);

        if (!found) {
            throw new HttpException('Topic not found', HttpStatus.NOT_FOUND)
        }

        return this.service.update(found.id, topic);
    }
}