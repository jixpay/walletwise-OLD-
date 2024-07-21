import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/createorder-dto';
import { AuthenticationGuard } from '../auth/guard/authentication-guard'

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService:OrdersService){}

    @Get('/calculate_total/:id')
    async calculate_total(@Param('id') id: string){
        return await this.ordersService.fetch_total(parseInt(id))
    }

    @Post()
    @UseGuards(AuthenticationGuard)
    async create_order(@Body() data:CreateOrderDto, @Request() req){
        data.user_id = req.user.id
        data.message = data.message || ''
        const total = await this.ordersService.fetch_total(data.cart_id)
        data.total = total
        if(total === 0) throw new BadRequestException('Nothing to checkout!')
        return await this.ordersService.create_order(data)
    }

    @Get()
    @UseGuards(AuthenticationGuard)
    async fetch_orders(@Request() req){
        return await this.ordersService.fetch_orders({user_id: req.user.id})
    }

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async fetch_order(@Param('id') id: string){
        return await this.ordersService.fetch_order({id:parseInt(id)})
    }

    @Delete(':id')
    @UseGuards(AuthenticationGuard)
    async delete_order(@Param('id') id: string){
        return await this.ordersService.delete_order(parseInt(id))
    }
}
