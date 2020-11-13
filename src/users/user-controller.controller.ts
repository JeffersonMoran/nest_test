import { Controller, Get, Post, Body, Param, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UserService } from './user-service.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post('/register')
    async create(@Body(new ValidationPipe({ transform: true })) createUserDTO: CreateUserDto) {
        console.log('aqui', createUserDTO);
        const response = await this.userService.create(createUserDTO);
        return { "success": true };
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id) {
        console.log(id);
        return this.userService.findOne(id);
    }

    @Get()
    async findAll() {
        const response = await this.userService.findAll();
        return response;
    }
}
