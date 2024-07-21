import { BadRequestException, Injectable } from '@nestjs/common';
import { CartProduct } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CartproductsService {
    constructor(private readonly prisma:PrismaService){}

    async is_owner(product_id: number, user_id: number): Promise<boolean>{
        const product = await this.prisma.prismaClient.product.findFirst({where:{id:product_id}})
        const store = await this.prisma.prismaClient.store.findFirst({where:{id: product.store_id}})
        if(user_id === store.user_id) return true
        return false
    }

    async cartproduct_exist(query:Object): Promise<Boolean>{
        const res = await this.prisma.prismaClient.cartProduct.findFirst({where:query})
        if(res) return true
        return false
    }

    async create_cartproduct(data):Promise<CartProduct>{
        try {
            return this.prisma.prismaClient.cartProduct.create({data})
        } catch (error) {
            throw new BadRequestException('There was an ERROR creating a cart product')
        }
    }

    async fetch_cartproducts(query:Object):Promise<CartProduct[]>{
        try {
            return this.prisma.prismaClient.cartProduct.findMany({where:query})
        } catch (error) {
            throw new BadRequestException('There was an ERROR fetching cart products')
        }
    }

    async fetch_cartproduct(query:Object):Promise<CartProduct>{
        try {
            return this.prisma.prismaClient.cartProduct.findFirst({where:query})
        } catch (error) {
            throw new BadRequestException('There was an ERROR fetching cart product')
        }
    }

    async update_cartproduct(id: number, data): Promise<CartProduct>{
        try {
            if(data.quantity < 1) throw new BadRequestException('Quantity should not be ZERO')
            return this.prisma.prismaClient.cartProduct.update({where:{id}, data})
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }

    async delete_cartproduct(id: number): Promise<CartProduct>{
        try {
            return this.prisma.prismaClient.cartProduct.delete({where:{id}})
        } catch (error) {
            throw new BadRequestException('There was an ERROR deleting the cart product')
        }
    }
}
