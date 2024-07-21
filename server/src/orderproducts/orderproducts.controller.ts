import { BadRequestException, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { OrderproductsService } from './orderproducts.service';
import { AuthenticationGuard } from '../auth/guard/authentication-guard'

@Controller('orderproducts')
export class OrderproductsController {
    constructor(private readonly orderProductService:OrderproductsService){}

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async fetch_orderproducts(@Param('id') id: string){
        return await this.orderProductService.fetch_orderproducts({order_id: parseInt(id)})
    }

    @Get('store/:id')
    async fetch_storeorders(@Param('id') id: string){
        return await this.orderProductService.fetch_orderproducts({store_id: parseInt(id)})
    }

    @Patch('/cancel/:id')
    async cancel_order(@Param('id') id: string){
        if(await this.orderProductService.fetch_status(parseInt(id)) === 'SHIPPED') throw new BadRequestException('CANNOT CANCEL IF STATUS IS SHIPPED')
        return await this.orderProductService.update_orderproduct(parseInt(id), {status:'CANCELLED'})
    }
    
    @Patch('/ship/:id')
    async ship_order(@Param('id') id: string){
        if(await this.orderProductService.fetch_status(parseInt(id)) === 'CANCELLED') throw new BadRequestException('CANNOT SHIP IF STATUS IS CANCELLED')
        return await this.orderProductService.update_orderproduct(parseInt(id), {status:'SHIPPED'})
    }
    
    @Patch('/receive/:id')
    async receive_order(@Param('id') id: string){
        if(['CANCELLED','PREPARING'].includes(await this.orderProductService.fetch_status(parseInt(id)))) throw new BadRequestException('CANNOT RECEIVE')
        return await this.orderProductService.update_orderproduct(parseInt(id), {status:'RECEIVED'})
    }
}
