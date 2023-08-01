import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { PostmanagerService } from './postmanager.service';
import { Postmanager } from './schemas/postmanager.schema';
import { PostmanagerDto } from './dto/postmanager.dto';

@Controller('postmanagers')
export class PostmanagerController {
    constructor(private postmanagerService: PostmanagerService) { }

    @Get()
    async getNumberPostmanager(
        @Query() pageOption: {
            page?: number,
            show?: number,
        }
    ): Promise<{ data: Postmanager[], count: number }> {
        if (pageOption.page && pageOption.page < 1) {
            throw new BadRequestException('Invalid page number. Page number must be greater than or equal to 1.');
        }
        return this.postmanagerService.getNumberPostmanager(pageOption);
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
