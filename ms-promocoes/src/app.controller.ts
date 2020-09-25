import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IProduct, ISearch } from './search.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @MessagePattern({ promocoes: 'adicionadas' })
  async listarProdutosPromocionados(data: ISearch): Promise<IProduct[]> {
    return this.appService.listar(data);
  }

  @EventPattern('compra_registrada')
  async handleCompraRegistrada(data: Record<string, unknown>) {
    console.log(`[MSPROMOCOES][${data.cliente}] evento de compra realizada capturado: ${data.chaveNFCE}`)
  }

}
