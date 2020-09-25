import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  constructor(private service: AppService) {}

 @Get('promocionados')
 async getProdutosPromocionadosCliente(@Query('cpf') cpf: string) {
  return this.service.getProdutosPromocionadosCliente(cpf)
 }

 @Get('compra')
 async registrarCompra() {
  return this.service.registrarCompra({
    cliente: 187261,
    chaveNFCE: 'A7SDH ASDIUA ASDA0 19288 8A098 10298 12098'
  })
 }

}
