import { Body, Controller, DefaultValuePipe, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user-dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {

    @Get('/:id')
    @ApiOperation({
        summary: 'Fetches a list of registered users on the application.'
      })
      @ApiQuery({
        name: 'limit',
        type: String,
        description: 'The upper limit of pages you want the pagination to return',
        required: false,
      })
      @ApiQuery({
        name: 'page',
        type: String,
        description:
          'The position of the page number that you want the API to return',
        required: false,
      })
      @ApiResponse({
        status: 200,
        description: 'Users fetched successfully based on the query',
      })
    public getUsers(
        @Param() getUsersParamDto: GetUsersParamDto,
        @Query('limit',new DefaultValuePipe(10),ParseIntPipe) limit?: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    ){
        console.log(limit);
        console.log(page);

        return 'You sent a get request to users endpoint';
    }
    

        @Post()
        public createUser(
            @Body() createUserDto: CreateUserDto){
                return "Create user";
            }

            @Patch('/:id')
            public updateUser(@Body() patchUserDto: PatchUserDto){}
    }

