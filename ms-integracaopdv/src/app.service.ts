import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export interface ICompra {
  cliente: number;
  chaveNFCE: string; 
}

@Injectable()
export class AppService {
  constructor(
    @Inject('CLIENTES_SERVICE') private clientes: ClientProxy,
    @Inject('PROMOCOES_SERVICE') private promocoes: ClientProxy,
  ) { }

  async getProdutosPromocionadosCliente(cpf: string) {
    console.log(`[MSINTEGRACAOPDV][${cpf}] pedindo os produtos promociados do cliente para o mspromocoes`)
    return this.promocoes.send({ promocoes: 'adicionadas' }, { cpf })
  }

  async registrarCompra(data: ICompra): Promise<string> {
    console.log(`[MSINTEGRACAOPDV][${data.cliente}] informando para os serviços que a compra do cliente foi concluída no pdv`)
    
    this.clientes.emit<void>('compra_registrada', data);
    this.promocoes.emit<void>('compra_registrada', data);

    //mas vamo ter que emitir o evento/mesagem pra todos os serviços individualmente?
    //eis ai a questão: planejamento de comunicação... o que vai ser propagado, o que precisa ser "tentado", etc..
    return "compra registrada com sucesso";
  }
}
