import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from '../users/users.service'
import { comparePassword, hashPassword } from '../utils/password'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService:UsersService,
        private readonly jwtService:JwtService
    ){}

    async signup(data): Promise<User>{
        if(await this.usersService.user_exist({username:data.username})) throw new BadRequestException('The username is already in used')
        data.password = await hashPassword(data.password)
        return await this.usersService.create_user(data)
    }

    async signin(data): Promise<string>{
        if(!await this.usersService.user_exist({username:data.username})) throw new BadRequestException('Wrong credentials')
        const user = await this.usersService.fetch_user({username:data.username})
        
        if(!await comparePassword(data.password, user.password)) throw new BadRequestException('Wrong credentials')
        return await this.jwtService.signAsync({id:user.id})
    }

    async authenticate(id: number): Promise<User>{
        if(!await this.usersService.user_exist({id})) throw new BadRequestException('The user no longer exist')
        return await this.usersService.fetch_user({id})
    }
}
