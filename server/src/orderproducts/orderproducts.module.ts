import { Module } from '@nestjs/common';
import { OrderproductsController } from './orderproducts.controller';
import { OrderproductsService } from './orderproducts.service';
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [OrderproductsController],
  providers: [OrderproductsService, PrismaService]
})
export class OrderproductsModule {}
