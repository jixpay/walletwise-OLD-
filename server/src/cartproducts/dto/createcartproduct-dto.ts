import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartProductDto {
    @IsNotEmpty()
    cart_id: number;

    @IsNotEmpty()
    product_id: number;

    @IsNotEmpty()
    @IsNumber()
    quantity: number;
}