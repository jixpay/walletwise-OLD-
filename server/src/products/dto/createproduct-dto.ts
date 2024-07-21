import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    store_id: number;

    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    stocks: number;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    image: string;
}