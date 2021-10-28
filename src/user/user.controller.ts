import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

     
    
    @Get()
     // isAdmin
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
      return this.userService.findOne(id);
    }

    @Post()
     // isAdmin
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.create(createUserDto);
    }
  
    @Delete(':id')
     // isAdmin
    remove(@Param('id') id: string): Promise<string> {
      return this.userService.remove(id);
    }

    @Put()
    // isAdmin
    updateUser(@Body() updateUserDto:UpdateUserDto): Promise<User> {
      return this.userService.updateUser(updateUserDto);
    }
}
