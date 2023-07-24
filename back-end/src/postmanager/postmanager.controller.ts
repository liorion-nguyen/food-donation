import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostmanagerService } from './postmanager.service';
import { Postmanager } from './schemas/postmanager.schema';
import { PostmanagerDto } from './dto/postmanager.dto';

@Controller('postmanagers')
export class PostmanagerController {
    constructor(private postmanagerService: PostmanagerService) {}

    @Get()
    async getAllPostmanager(): Promise<Postmanager[]> {
        return this.postmanagerService.getAllPostmanager();
    }

    @Post() 
    async createPostmanager(@Body() postmanager: PostmanagerDto): Promise<Postmanager> {
        return this.postmanagerService.createPostmanager(postmanager);
    }

    @Put(':id') 
    async update(
        @Param('id')
        id: string,
        @Body() postmanager: PostmanagerDto,
    ): Promise<Postmanager> {
        return this.postmanagerService.updatePostmanager(id, postmanager);
    }

    @Delete(':id')
    async deletePostmanager(
        @Param('id')
        id: string,
    ) {
        return this.postmanagerService.deletePostmanager(id);
    }
}
