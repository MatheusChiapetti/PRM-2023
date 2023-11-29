import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TopicModule } from "src/topics/topic.module";
import { UserModule } from "src/users/user.module";
import { Topic } from "src/topics/topic.entity";
import { RepostController } from "./repost.controller";
import { RepostService } from "./repost.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ Topic ]),
        TopicModule,
        UserModule
    ],
    providers: [RepostService], 
    controllers: [ RepostController]

})

export class RepostModule { };