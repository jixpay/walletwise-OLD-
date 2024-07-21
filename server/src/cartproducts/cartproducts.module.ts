import { Module } from '@nestjs/common';
import { CartproductsController } from './cartproducts.controller';
import { CartproductsService } from './cartproducts.service';
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [CartproductsController],
  providers: [CartproductsService, PrismaService]
})
export class CartproductsModule {}
