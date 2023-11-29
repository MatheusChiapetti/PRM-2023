import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { UserModule } from "src/users/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";

@Module({
    imports: [ TypeOrmModule.forFeature([User]), UserModule ],
    controllers: [ ProfileController]
})
export class ProfileModule {};