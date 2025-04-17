import { Module, forwardRef } from '@nestjs/common';


import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';

import { UsersService } from './providers/users.service';

import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

import profileConfig from './config/profile.config';
import { FindOneByGoogleIdProvider } from './providers/find-one-google-id-user.provider';
import { UsersCreateManyProvider } from './providers/user-create-many.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    FindOneByGoogleIdProvider,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
    forwardRef(() => AuthModule),
  ],
})
export class UsersModule {}