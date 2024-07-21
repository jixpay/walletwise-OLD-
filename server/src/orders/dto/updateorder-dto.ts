import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDto {
    @IsNotEmpty()
    status: string
}