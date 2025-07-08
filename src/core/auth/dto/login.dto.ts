import { ApiProperty } from '@nestjs/swagger';
import { IsPassword, IsValidEmail } from 'src/core/decorators/dto-validation.decorator';

export class LoginDto {
  @ApiProperty()
  @IsValidEmail()
  email: string;

  @ApiProperty()
  @IsPassword()
  password: string;
}
