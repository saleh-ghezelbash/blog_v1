import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: "secret",
      signOptions: { expiresIn: '2d' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
