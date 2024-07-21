import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderProduct } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class OrderproductsService {
    constructor(private readonly prisma: PrismaService){}

    async orderproduct_exist(query: object): Promise<boolean>{
        const res = await this.prisma.prismaClient.orderProduct.findFirst({where:query})
        if(!res) return false
        return true
    }

    async create_orderproduct(data){
        try {
            await this.prisma.prismaClient.orderProduct.create({data})
        } catch (error: any) {
            throw new BadRequestException('There was an ERROR creating an ORDERPRODUCT')
        }
    }

    async fetch_orderproducts(query: object):Promise<OrderProduct[]>{
        try {
            return await this.prisma.prismaClient.orderProduct.findMany({where:query})
        } catch (error) {
            throw new BadRequestException('There was an ERROR fetching ORDERPRODUCTS')
        }
    }

    async fetch_orderproduct(id: number):Promise<OrderProduct>{
        try {
            return await this.prisma.prismaClient.orderProduct.findFirst({where:{id}})
        } catch (error) {
            throw new BadRequestException('There was an ERROR fetching ORDERPRODUCTS')
        }
    }

    async fetch_status(id: number){
        try {
            const orderproduct = await this.prisma.prismaClient.orderProduct.findFirst({where:{id}})
            return orderproduct.status
        } catch (error: any) {
            throw new BadRequestException('There was an ERROR fetching the STATUS')
        }
    }

    async update_orderproduct(id: number, data: any): Promise<OrderProduct>{
        try {
            if(data.status === 'SHIPPED'){
                const orderproduct = await this.prisma.prismaClient.orderProduct.findFirst({where:{id}})
                const product = await this.prisma.prismaClient.product.findFirst({where:{id:orderproduct.product_id}})
                if(orderproduct.quantity > product.stocks) throw new BadRequestException('Out of Stocks')
                await this.prisma.prismaClient.product.update({where:{id:product.id}, data:{stocks:product.stocks - orderproduct.quantity}})
            }
            return await this.prisma.prismaClient.orderProduct.update({where:{id}, data})
        } catch (error: any) {
            throw new BadRequestException(error.message)
        }
    }
}
