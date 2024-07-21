import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service'
import { OrderproductsService } from '../orderproducts/orderproducts.service'

@Module({
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService, OrderproductsService]
})
export class OrdersModule {}
