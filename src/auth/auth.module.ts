import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';

@Module({
  imports: [],
  providers: [Bcrypt], // Será utilizada em outras classes.
  controllers: [],
  exports: [Bcrypt], // Será utilizada em outros recursos para acessar. 
})
export class AuthModule { }