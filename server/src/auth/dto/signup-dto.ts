import { IsNotEmpty } from 'class-validator';

export class SignUpDto {
    @IsNotEmpty()
    fname: string;

    @IsNotEmpty()
    lname: string;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    image: string;
}