import { Body, Controller, FileTypeValidator, Get, ParseFilePipe, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {v4} from 'uuid'
import { SignUpDto } from './dto/signup-dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin-dto';
import { AuthenticationGuard } from './guard/authentication-guard';
import { uploadImage } from '../utils/file'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('/signin')
    async signin(@Body() data: SignInDto){
        return await this.authService.signin(data)
    }

    @Post('/signup')
    async signup(@Body() data:SignUpDto){
        return await this.authService.signup(data)
    }

    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async upload_image(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg|JPG)' })
            ]
        })
    ) file: Express.Multer.File){
        return await uploadImage(file, '/xpayecommerce/users/')
    }

    @Get()
    @UseGuards(AuthenticationGuard)
    async authenticate_user(@Request() req){
        return await this.authService.authenticate(req.user.id)
    }
}
