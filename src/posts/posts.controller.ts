import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts-dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
      ) {}
    
      /*
       * GET localhost:3000/posts/:userId
       */
      @Get('/:userId?')
      public getPosts(@Param('userId') userId: string) {
        return this.postsService.findAll(userId);
      }

      @Post()
      public createPost(@Body() createPostDto: CreatePostDto) {
        console.log(createPostDto);
      }
}
