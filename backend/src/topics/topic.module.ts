import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/users/user.module";
import { TopicService } from "./topic.service";
import { TopicController } from "./topic.controller";
import { Topic } from "./topic.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Topic]),
        UserModule
    ],
    providers: [ TopicService ],
    controllers: [ TopicController ],
    exports: [ TopicService ]
})

export class TopicModule {};