import { IsNotEmpty, IsNumber } from 'class-validator';

export class FetchCartProductDto {
    @IsNotEmpty()
    cart_id: number;
}