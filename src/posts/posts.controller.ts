import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-posts-dto';
import { PatchPostDto } from './dtos/patch-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
      ) {}
    
      /*
       * GET localhost:3000/posts/:userId
       */
      @Get('/:userId')
      public getPosts(@Param('userId') userId: string) {
        return this.postsService.findAll(userId);
      }

      @Post()
      public createPost(@Body() createPostDto: CreatePostDto) {
        console.log(createPostDto);
      }


      @ApiOperation({
        summary: 'Updates and existing blog post in the database.',
      })
      @ApiResponse({
        status: 200,
        description:
          'You get a success 200 response if the post is updated successfully',
      })
      @Patch()
      public updatePost(@Body() patchPostsDto: PatchPostDto) {
        console.log(patchPostsDto);
      }
    }

