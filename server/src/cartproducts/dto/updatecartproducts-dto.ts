import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartProductDto {
    cart_id: number;

    product_id: number;

    quantity: number;
}