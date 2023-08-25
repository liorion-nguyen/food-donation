import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PostmanagerService } from './postmanager.service';
import { Postmanager } from './schemas/postmanager.schema';
import { PostmanagerDto } from './dto/postmanager.dto';
import { AbilitiesGuard } from 'src/user/ability/ability.guard';
import { CheckAbilities, ReadUserAbility } from 'src/user/ability/abilities.decorator';

@Controller('postmanagers')
export class PostmanagerController {
    constructor(private postmanagerService: PostmanagerService) { }

    @Get()
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
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

    @Get(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async getPostSelf(
        @Param('id')
        id: string,
    ) {
        return this.postmanagerService.getPostSelf(id);
    }


    @Post()
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async createPostmanager(@Body() postmanager: PostmanagerDto): Promise<Postmanager> {
        return this.postmanagerService.createPostmanager(postmanager);
    }

    @Put(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async update(
        @Param('id')
        id: string,
        @Body() postmanager: PostmanagerDto,
    ): Promise<Postmanager> {
        return this.postmanagerService.updatePostmanager(id, postmanager);
    }

    @Delete(':id')
    @UseGuards(AbilitiesGuard)
    @CheckAbilities(new ReadUserAbility())
    async deletePostmanager(
        @Param('id')
        id: string,
    ) {
        return this.postmanagerService.deletePostmanager(id);
    }
}
