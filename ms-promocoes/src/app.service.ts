import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IProduct, ISearch } from './search.interface';

export interface IResponse {
  mensagem: string;
  data: {
    cliente: string,
    perfis: number[]
  };
}

@Injectable()
export class AppService {

  constructor(@Inject('CLIENTES_SERVICE') private clientes: ClientProxy) { }

  async identificarCliente(cpf: string): Promise<IResponse> {
    return this.clientes.send({ profile: 'check' }, cpf).toPromise()
  }

  async listar(data: ISearch): Promise<IProduct[]> {
    console.log(`[MSPROMOCOES] pedindo informações do cliente para o msclientes`)

    const cliente = await this.identificarCliente(data.cpf)

    console.log(`[MSPROMOCOES][${data.cpf}] cliente identificado: ${cliente.data.cliente} com os perfis ${cliente.data.perfis}`)
    console.log(`[MSPROMOCOES][${data.cpf}] pesquisando produtos adicionados para os perfis do cliente`)
    const results = [
      {
        id: 1,
        preco: 12.98,
        produto: 'produto 1',
        sku: 'UAH1'
      },
      {
        id: 2,
        preco: 9.90,
        produto: 'produto 2',
        sku: 'UAH2'
      },
      {
        id: 3,
        preco: 8.76,
        produto: 'produto 3',
        sku: 'UAH3'
      },
      {
        id: 4,
        preco: 11.11,
        produto: 'produto 4',
        sku: 'UAH4'
      },
      {
        id: 5,
        preco: 2.34,
        produto: 'produto 5',
        sku: 'UAH5'
      }
    ]

    console.log(`[MSPROMOCOES][${data.cpf}] retornando o total de ${results.length} produto(s)`)
    return results
  }
}
