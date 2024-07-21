import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    cart_id: number;

    @IsNotEmpty()
    mode_of_payment: string;

    @IsNotEmpty()
    destination: string;

    message: string;

    user_id: number;

    total: number

    status: string
}