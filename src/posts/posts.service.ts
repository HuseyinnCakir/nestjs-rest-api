import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
    constructor(
        /*
         * Injecting Users Service
         */
        private readonly usersService: UsersService,
      ) {}
    
      public findAll(userId: string) {
        const user = this.usersService.findOneById(userId);
    
        return [
          {
            user: user,
            title: 'Test Tile',
            content: 'Test Content',
          },
          {
            user: user,
            title: 'Test Tile 2',
            content: 'Test Content 2',
          },
        ];
      }
}
