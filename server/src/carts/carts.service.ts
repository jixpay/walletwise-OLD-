import { BadRequestException, Injectable } from '@nestjs/common';
import { Cart } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CartsService {
    constructor(private readonly prisma:PrismaService){}

    async cart_exist(query:Object):Promise<Boolean>{
        const res = await this.prisma.prismaClient.cart.findFirst({where:query})
        if(res) return true
        return false
    }

    async create_cart(data):Promise<Cart>{
        try {
            return await this.prisma.prismaClient.cart.create({data})
        } catch (error) {
            throw new BadRequestException('An ERROR occured creating a new cart')
        }
    }

    async fetch_carts(query:Object):Promise<Cart[]>{
        try {
            return await this.prisma.prismaClient.cart.findMany({where:query})
        } catch (error) {
            throw new BadRequestException('There was an ERROR occured fetching your carts')
        }
    }

    async fetch_cart(id: number):Promise<Cart>{
        try {
            return await this.prisma.prismaClient.cart.findFirst({where:{id}})
        } catch (error) {
            throw new BadRequestException('There was an ERROR occured fetching your cart')
        }
    }

    async update_cart(id: number, data): Promise<Cart>{
        try {
            return await this.prisma.prismaClient.cart.update({where:{id}, data})
        } catch (error) {
            throw new BadRequestException('There was an ERROR updating your cart')
        }
    }

    async delete_cart(id: number): Promise<Cart>{
        try {
            return await this.prisma.prismaClient.cart.delete({where:{id}})
        } catch (error) {
            throw new BadRequestException('There was an ERROR deleting the cart')
        }
    }
}
