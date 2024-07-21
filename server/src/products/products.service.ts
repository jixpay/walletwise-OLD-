import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ProductsService {
    constructor(private readonly prisma:PrismaService){}

    async product_exist(query:Object):Promise<Boolean>{
        const res = await this.prisma.prismaClient.product.findFirst({where:query})
        if(res) return true
        return false
    }

    async create_product(data):Promise<Product>{
        try {
            return await this.prisma.prismaClient.product.create({data})
        } catch (error) {
            console.log(error)
            throw new BadRequestException('An ERROR occured creating the product')
        }
    }

    async fetch_products(query:Object): Promise<Product[]>{
        try {
            return await this.prisma.prismaClient.product.findMany({where:query})
        } catch (error) {
            throw new BadRequestException('An ERROR occured fetching the products')
        }
    }

    async search_products(keyword: string): Promise<Product[]>{
        try {
            return await this.prisma.prismaClient.product.findMany(
                {
                    where: {
                        name: {
                          contains: keyword,
                          mode: 'insensitive', // Case insensitive search
                        },
                    },
                }
            )
        } catch (error) {
            throw new BadRequestException('An ERROR occured while searching')
        }
    }

    async fetch_product(id: number): Promise<Product>{
        try {
            return await this.prisma.prismaClient.product.findFirst({where:{id}})
        } catch (error) {
            throw new BadRequestException('An ERROR occured fetching the product')
        }
    }

    async update_product(id: number, data){
        try {
            return await this.prisma.prismaClient.product.update({where:{id}, data})
        } catch (error) {
            throw new BadRequestException('An ERROR occured updating the product')
        }
    }

    async delete_product(id: number): Promise<Product>{
        try {
            return await this.prisma.prismaClient.product.delete({where:{id}})
        } catch (error) {
            throw new BadRequestException('An ERROR occured deleting the product')
        }
    }
}
