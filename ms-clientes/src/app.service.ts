import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

export interface IProduct {
  id: number;
  produto: string;
  sku: string | number;
  preco: number;
}

export interface IResponse {
  mensagem: string;
  data: Object;
}

@Injectable()
export class AppService {

  constructor(@Inject('PROMOCOES_SERVICE') private client: ClientProxy) { }

  async check(cpf: string): Promise<IResponse> {
    try {

      console.log(`[MSCLIENTES][${cpf}] consultando informações do perfil do cliente`)
      console.log(`[MSCLIENTES][${cpf}] nome: Alisson Gomes, perfis: 1,7,8`)
      console.log(`[MSCLIENTES][${cpf}] perfil do cliente apto a receber as promoções`)

      return {
        mensagem: 'cliente com produtos adicionados em promoção',
        data: {
          cliente: 'Alisson Gomes',
          perfis: [1,2,3,7,8]
        }
      }

    } catch (err) {
      console.error(err)
    }
  }
}
