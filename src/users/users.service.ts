import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
    constructor(
        // Injecting Auth Service
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
      ) {}
    
     /**
   * The method to get all the users from the database
   */
      public findAll(
        getUserParamDto: GetUsersParamDto,
        limt: number,
        page: number,
      ) {
        const isAuth = this.authService.isAuth();
        console.log(isAuth);
    
        return [
          {
            firstName: 'John',
            email: 'john@doe.com',
          },
          {
            firstName: 'Alice',
            email: 'alice@doe.com',
          },
        ];
      }
    
       /**
   * Find a single user using the ID of the user
   */
      public findOneById(id: string) {
        return {
          id: 1234,
          firstName: 'Alice',
          email: 'alice@doe.com',
        };
      }
}
