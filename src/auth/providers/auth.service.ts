import { SignInProvider } from './signin.provider';
import { Inject, Injectable, forwardRef } from '@nestjs/common';

import { UsersService } from 'src/users/providers/users.service';
import { SignInDto } from '../dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
  
    /**
     * Inject the signInProvider
     */
    private readonly signInProvider: SignInProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public isAuth() {
    return true;
  }
}