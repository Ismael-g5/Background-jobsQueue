import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './create-user-dto';
import { SendMailProducerService } from 'src/jobs/send-Mail-producer-service';

@Controller('creat-user')
export class CreateUserController {
  constructor(private sendMailService: SendMailProducerService) {}

  @Post('/')
  async createUser(@Body() createUser: CreateUserDTO) {
    this.sendMailService.sendMail(createUser);
    return createUser;
  }
}
