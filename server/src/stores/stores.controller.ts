import { Body, Controller, Delete, FileTypeValidator, Get, Param, ParseFilePipe, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/createstore-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthenticationGuard } from '../auth/guard/authentication-guard'
import { UpdateStoreDto } from './dto/updatestore-dto';
import { uploadImage } from '../utils/file'

@Controller('stores')
export class StoresController {
    constructor(private readonly storesService:StoresService){}

    @Post('/mystores/upload')
    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthenticationGuard)
    async upload_image(@UploadedFile(
        new ParseFilePipe({
            validators: [
                new FileTypeValidator({ fileType: '.(png|jpeg|jpg|JPG)' })
            ]
        })
    ) file: Express.Multer.File){
        return await uploadImage(file, '/xpayecommerce/stores/')
    }

    @Post('/mystores')
    @UseGuards(AuthenticationGuard)
    async create_mystore(@Body() data:CreateStoreDto, @Request() req){
        data.user_id = req.user.id
        return await this.storesService.create_store(data)
    }

    @Get('/mystores')
    @UseGuards(AuthenticationGuard)
    async fetch_mystores(@Request() req){
        return await this.storesService.fetch_stores({user_id:req.user.id})
    }

    @Get('/mystores/:id')
    //@UseGuards(AuthenticationGuard)
    async fetch_mystore(@Param('id') id: string){
        return await this.storesService.fetch_store(parseInt(id))
    }

    @Patch('/mystores/:id')
    @UseGuards(AuthenticationGuard)
    async update_mystore(@Param('id') id: string, @Body() data:UpdateStoreDto){
        delete data.id
        return await this.storesService.update_store(parseInt(id), data)
    }

    @Delete('/mystores/:id')
    @UseGuards(AuthenticationGuard)
    async delete_mystore(@Param('id') id: string){
        return await this.storesService.delete_store(parseInt(id))
    }

    @Get()
    async fetch_stores(){
        return await this.storesService.fetch_stores({})
    }

    @Get(':id')
    async fetch_store(@Param('id') id :string){
        return await this.storesService.fetch_store(parseInt(id))
    }
}
