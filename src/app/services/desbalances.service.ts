import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Historico } from '../classes/historico.class';

@Injectable({
  providedIn: 'root'
})
export class DesbalancesService {

  private urlDesbalancesAPI = 'http://localhost:44386/api';

  constructor( private httpClient: HttpClient ) {
    console.log('servicio inicializado');
   }

  getHistoricos() {
    return this.httpClient.get(`${ this.urlDesbalancesAPI }/Historico`);
  }

  getHistorico( id: string ) {
    return this.httpClient.get(`${ this.urlDesbalancesAPI }/Historico/${ id }`);
  }

  postHistorico( historico: Historico ) {
    return this.httpClient.post(`${ this.urlDesbalancesAPI }/Historico`, historico);
  }
}
