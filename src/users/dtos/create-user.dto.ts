import { IsNotEmpty, IsOptional, IsString, MinLength, MaxLength,IsEmail, Matches } from "class-validator";

export class CreateUserDto{
@IsString()
@IsNotEmpty()
@MinLength(3)
@MaxLength(50)
firstName: string;

@IsOptional()
@MinLength(3)
@MaxLength(50)
lastName?: string;


@IsEmail()
@IsNotEmpty()   
email:string;

@IsString()
@IsNotEmpty()
@MinLength(8)
@Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
password:string;
}