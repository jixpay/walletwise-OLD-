import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
    @IsNotEmpty()
    name: string;

    user_id: number
}