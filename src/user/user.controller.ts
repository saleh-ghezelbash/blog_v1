import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }



  @Get()
  // @UseGuards(AuthGuard('jwt'))
  // isAdmin
  findAll(
    // @GetUser() user:User
  ): Promise<User[]> {
    // console.log('User:',user);
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  // isAdmin
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  // isAdmin
  remove(@Param('id') id: string): Promise<string> {
    return this.userService.remove(id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  // isAdmin
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(updateUserDto);
  }
}
