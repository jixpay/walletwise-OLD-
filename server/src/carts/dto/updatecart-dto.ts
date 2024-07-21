import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCartDto {
    id: number

    name: string;

    user_id: number
}