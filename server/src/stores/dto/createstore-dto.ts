import { IsNotEmpty } from 'class-validator';

export class CreateStoreDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    user_id: string;

    @IsNotEmpty()
    image: string;
}