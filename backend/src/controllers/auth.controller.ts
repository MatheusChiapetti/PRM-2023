import { Controller, Body, Post, UnauthorizedException, HttpStatus, HttpCode } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { AuthService } from "src/services/auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly service: AuthService,
        private readonly jwtService: JwtService
    ){}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() credential: Record<string, string>) {

        const found = await this.service.validateCredential(credential.username, credential.password)

        if(!found) {
            throw new UnauthorizedException();
        }

        const payload = {userId: found.id, username: found.username}

        const token = await this.jwtService.signAsync(payload);

        return {
            accessToken: token
        }
    }
}