import { BadRequestException, ConflictException, HttpCode, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/auth/dtos/create-user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { SigninDTO } from './dtos/signin.dto';
import { Response } from 'express';
import { UpdatePasswordDto } from './dtos/update-password.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private userRipository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signin(credentials: SigninDTO,res:Response) {
        
        try {
            const {email,password} = credentials;
            const user = await this.userRipository.findOne({ where: { email} })

            if (user && await bcrypt.compare(password, user.password)) {
                
                const payload = { username: email };
                const token = this.jwtService.sign(payload);
                const cookieOptions = {
                    expires: new Date(
                      Date.now() + 90 * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                };
                res.cookie('jwt', token, cookieOptions);

                return { ...user, token };
            }
            
          throw  new UnauthorizedException('Invalid credentials!',);
           

        } catch (err) {
            
            throw new InternalServerErrorException()
        }
    }

    async signup(createUserDto: CreateUserDto,res:Response) {
        
        try {
            const {name,email,password,confirmpassword} = createUserDto;
            if (!name || name.length == 0) {
                
                throw new Error("Please provide a name!");
            }

            const u = await this.userRipository.findOne({where:{email}});
            if (u) {
                
                throw new Error("This email is already exist!");
            }

            if (password !== confirmpassword) {
                
                throw new Error('Passwords are not the same!')
            }

            const hash_password = await bcrypt.hash(password, 10);

            const user = this.userRipository.create({
                name,
                email,
                password:hash_password
            });

            const createdUser = await this.userRipository.save(user);
            const payload = { username: email };
            const token = this.jwtService.sign(payload);
            const cookieOptions = {
                expires: new Date(
                  Date.now() + 90 * 24 * 60 * 60 * 1000
                ),
                httpOnly: true
            };
            res.cookie('jwt', token, cookieOptions);

            return { ...createdUser, token };
        } catch (err) {
            
            throw new InternalServerErrorException();
        }
    }

    signout(res:Response){
        res.clearCookie("jwt");
    }

    async updatePassword(user:User,updatePasswordDto:UpdatePasswordDto,res:Response){
        
        const {password,confirmpassword} = updatePasswordDto;

        if (password !== confirmpassword) {
            throw new Error('Passwords are not the same!')
        }

        const hash_password = await bcrypt.hash(password, 10);

        const u = this.userRipository.create({
            id: user.id,
            password:hash_password
        });

        const createdUser = await this.userRipository.save(u);
        const payload = { username: user.email };
        const token = this.jwtService.sign(payload);
        const cookieOptions = {
            expires: new Date(
              Date.now() + 90 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        };
        res.cookie('jwt', token, cookieOptions);

        return { ...createdUser, token };

    }
}
