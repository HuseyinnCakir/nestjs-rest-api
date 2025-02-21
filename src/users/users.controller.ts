import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Post, Query, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {

    @Get('/:id')
    public getUsers(
        @Param('id') id?: number | undefined,
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit?: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    ){
        console.log(limit);
        console.log(page);

        return 'You sent a get request to users endpoint';
    }
    

        @Post()
        public createUser(
            @Body(new ValidationPipe()) createUserDto: CreateUserDto){
                return "Create user";
            }
    }

