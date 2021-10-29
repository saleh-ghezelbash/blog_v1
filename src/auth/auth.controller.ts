import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SigninDTO } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    
    @Post('/signup')
    signup(@Res({ passthrough: true }) res:Response,@Body() createUserDto: CreateUserDto){
      return  this.authService.signup(createUserDto,res);
    }

    @Post('/signin')
    signin(@Res({ passthrough: true }) res:Response,@Body() credentials:SigninDTO){
      return  this.authService.signin(credentials,res);
    }

    @Get('/signout')
    @UseGuards(AuthGuard('jwt'))
    signout(@Res({ passthrough: true }) res:Response){
      return  this.authService.signout(res);
    }
}
