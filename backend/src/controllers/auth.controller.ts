import { Controller, Body, Post, UnauthorizedException, HttpStatus, HttpCode, UseInterceptors, ClassSerializerInterceptor, HttpException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt/dist/jwt.service";
import { User } from "src/entities/user.entity";
import { AuthService } from "src/services/auth.service";
import { UserService } from "src/services/user.service";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {

    constructor(
        private readonly service: AuthService,
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ){}

    @Post('signin')
    @HttpCode(HttpStatus.OK)
    async signIn(@Body() credential: Record<string, string>) {

        const found = await this.service.validateCredential(credential.username, credential.password)

        if(!found) {
            throw new UnauthorizedException();
        }

        const payload = {userId: found.id, username: found.username, fullname: found.fullname}

        const token = await this.jwtService.signAsync(payload);

        return {
            accessToken: token
        }
    }

    @Post('signup')
    async signUp(@Body() user: User): Promise<User> {

        // Busca o username do usuário.
        const found = await this.userService.findByUsername(user.username)

        // Verifica se o username já existe/está em uso. 
        if(found) {
            // Caso o username já existe, exibe a mensagem e o erro. 
            throw new HttpException('Este usuário já está em uso! ', HttpStatus.CONFLICT)
        }

        return this.userService.create(user);
    }
}