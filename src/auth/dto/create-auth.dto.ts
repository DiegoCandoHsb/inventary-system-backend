import { PickType } from '@nestjs/mapped-types';
import { HsbuserDto } from 'src/hsbusers/dto/create-hsbuser.dto';

export class SignUpCredentialsDto extends HsbuserDto {}

export class LoginCredentialsDto extends PickType(SignUpCredentialsDto, [
  'email',
  'password',
]) {}
