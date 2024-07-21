import { IsNotEmpty } from 'class-validator';

export class UpdateStoreDto {
    id: number

    name: string;

    description: string;

    user_id: number;

    image: string;
}