import { Body, Controller, Get, Post, Put, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { SigninDTO } from './dtos/signin.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}
    
    @Post('/signup')
    signup(@Res({ passthrough: true }) res:Response,@Body(ValidationPipe) createUserDto: CreateUserDto){
      return  this.authService.signup(createUserDto,res);
    }

    @Post('/signin')
    signin(@Res({ passthrough: true }) res:Response,@Body(ValidationPipe) credentials:SigninDTO){
      return  this.authService.signin(credentials,res);
    }

    @Get('/signout')
    @UseGuards(AuthGuard('jwt'))
    signout(@Res({ passthrough: true }) res:Response){
      return  this.authService.signout(res);
    }

    @Put('/updatepassword')
    @UseGuards(AuthGuard('jwt'))
    updatePassword(
      @GetUser() user:User,
      @Body(ValidationPipe) updatePasswordDto:UpdatePasswordDto,
      @Res({ passthrough: true }) res:Response
      ){
      return this.authService.updatePassword(user,updatePasswordDto,res)
    }
}
