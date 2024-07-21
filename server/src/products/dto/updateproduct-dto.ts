import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto {
    id: number

    name: string;

    description: string;

    store_id: number;

    price: number;

    stocks: number;

    category: string;

    image: string;
}