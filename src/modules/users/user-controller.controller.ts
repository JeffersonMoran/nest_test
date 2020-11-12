import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user-service.service';
import { CreateUserDTO } from './user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    async create(@Body() createUserDTO: CreateUserDTO) {
        const response = await this.userService.create(createUserDTO);
        return response;
    }

    @Get(':id')
    findOne(@Param() params): string {
        console.log(params.id);
        return `This action returns a #${params.id} cat`;
    }

    @Get()
    async findAll() {
        const response = await this.userService.findAll();
        return response;
    }
}
