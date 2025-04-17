
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { RefreshTokenDto } from '../dtos/reflesh-token.dto';
import { RefreshTokensProvider } from './reflesh-token.provider';
import { SignInDto } from '../dtos/sign-in.dto';
import { SignInProvider } from './signin.provider';


@Injectable()
export class AuthService {
  constructor(
    // Injecting UserService
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject the signInProvider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * Inject refreshTokensProvider
     */
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  public async signIn(signInDto: SignInDto) {
    return await this.signInProvider.signIn(signInDto);
  }

  public async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return await this.refreshTokensProvider.refreshTokens(refreshTokenDto);
  }
}