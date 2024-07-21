import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Request, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CartproductsService } from './cartproducts.service';
import { CreateCartProductDto } from './dto/createcartproduct-dto';
import { UpdateCartProductDto } from './dto/updatecartproducts-dto';
import { AuthenticationGuard } from '../auth/guard/authentication-guard'

@Controller('cartproducts')
export class CartproductsController {
    constructor(private readonly cartproductsService:CartproductsService){}

    @Post()
    @UseGuards(AuthenticationGuard)
    async create_cartproduct(@Body() data:CreateCartProductDto, @Request() req){
        if(await this.cartproductsService.is_owner(data.product_id, req.user.id)) throw new UnauthorizedException('You are not AUTHORIZED to add this product to a cart.')
        return await this.cartproductsService.create_cartproduct(data)
    }

    @Get('/cart/:id')
    @UseGuards(AuthenticationGuard)
    async fetch_cartproducts(@Param('id') id: string){
        return await this.cartproductsService.fetch_cartproducts({cart_id: parseInt(id)})
    }

    @Get(':id')
    @UseGuards(AuthenticationGuard)
    async fetch_cartproduct(@Param('id') id :string){
        return await this.cartproductsService.fetch_cartproduct({id:parseInt(id)})
    }

    @Patch(':id')
    @UseGuards(AuthenticationGuard)
    async update_cartproduct(@Param('id') id: string, @Body() data:UpdateCartProductDto){
        return await this.cartproductsService.update_cartproduct(parseInt(id), data)
    }

    @Delete(':id')
    @UseGuards(AuthenticationGuard)
    async delete_cartproduct(@Param('id') id: string){
        return await this.cartproductsService.delete_cartproduct(parseInt(id))
    }
}
