import { MailerService } from '@nestjs-modules/mailer';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueProgress,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { CreateUserDTO } from 'src/creat-user/create-user-dto';

@Processor('sendMail-queue')
class SendMailConsumer {
  constructor(private mailService: MailerService) {}

  @Process('sendMail-job')
  async sendMailJob(job: Job<CreateUserDTO>) {
    const { data } = job;

    await this.mailService.sendMail({
      to: data.email,
      from: 'Estudo de NestJS com Equipe codedrops',
      subject: 'Seja Bem vindo(a)',
      text: `Ola ${data.name} seu cadastro foi realizado com sucesso. Seja Bem vindo(a)!`,
    });
  }
  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(`Òn Completed ${job.name}`);
  }
  @OnQueueProgress()
  onQueueProgress(job: Job) {
    console.log(`On Progress ${job.name}`);
  }
  @OnQueueActive()
  onQueueActive(job: Job) {
    console.log(`On Active ${job.name}`);
  }
}

export { SendMailConsumer };
