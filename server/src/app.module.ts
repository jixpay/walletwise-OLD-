import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StoresModule } from './stores/stores.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { CartproductsModule } from './cartproducts/cartproducts.module';
import { OrdersModule } from './orders/orders.module';
import { OrderproductsModule } from './orderproducts/orderproducts.module';

@Module({
  imports: [PrismaModule,
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true
    }),
    UsersModule,
    AuthModule,
    StoresModule,
    ProductsModule,
    CartsModule,
    CartproductsModule,
    OrdersModule,
    OrderproductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
