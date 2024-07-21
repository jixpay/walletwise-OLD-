import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prisma:PrismaService){}

    ///check if a user exist
    async user_exist(query:Object): Promise<Boolean>{
        const res = await this.prisma.prismaClient.user.findFirst({where:query})
        if(res) return true
        return false
    }
    ///create user
    async create_user(data):Promise<User>{
        try {
            return await this.prisma.prismaClient.user.create({data})
        } catch (error) {
            throw new BadRequestException('There was an ERROR creating the user')
        }
    }
    ///fetch user by id
    async fetch_user(query:Object): Promise<User>{
        const res = await this.prisma.prismaClient.user.findFirst({where:query})
        if(!res) throw new NotFoundException('The user with such id no longer exist')
        return res
    }
    ///update user
    async update_user(id: number, data): Promise<User>{
        try {
            return await this.prisma.prismaClient.user.update({where:{id}, data})
        } catch (error) {
            throw new BadRequestException('There was an ERROR updating the user')
        }
    }
    ///delete user
    async delete_user(id: number){
        try {
            return await this.prisma.prismaClient.user.delete({where:{id}})
        } catch (error) {
            throw new BadRequestException('There was an ERROR deleting the user')
        }
    }
}
