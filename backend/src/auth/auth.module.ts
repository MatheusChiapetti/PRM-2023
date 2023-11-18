import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/user.entity";
import { UserModule } from "src/users/user.module";
import { AuthController } from "./auth.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        UserModule],
    providers: [ AuthService],
    controllers: [ AuthController]
})

export class AuthModule {};