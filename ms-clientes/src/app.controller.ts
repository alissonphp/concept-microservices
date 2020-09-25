import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService, IResponse } from './app.service';

@Controller()
export class AppController {

  constructor(private readonly appService: AppService) { }

  @MessagePattern({ profile: 'check' })
  async profileCheck(data: string): Promise<IResponse> {
    return this.appService.check(data);
  }

  @EventPattern('compra_registrada')
  async handleCompraRegistrada(data: Record<string, unknown>) {
    console.log(`[MSCLIENTES][${data.cliente}] evento de compra realizada capturado: ${data.chaveNFCE}`)
  }
}
