import { Controller, Body, Post, UnauthorizedException, HttpStatus, HttpCode } from "@nestjs/common";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly service: AuthService
    ){}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() credential: Record<string, string>) {

        const found = this.service.validateCredential(credential.username, credential.password)

        if(!found) {
            throw new UnauthorizedException();
        }

        return {
            status: "deu certo"
        }

    }

}