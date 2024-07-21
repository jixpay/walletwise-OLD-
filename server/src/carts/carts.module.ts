import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [CartsController],
  providers: [CartsService, PrismaService]
})
export class CartsModule {}
