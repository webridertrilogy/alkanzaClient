import { Component, OnInit } from '@angular/core';
import { DesbalancesService } from '../../services/desbalances.service';
import { Historico } from '../../classes/historico.class';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  historicos: Historico[];

  constructor( public desbalanceService: DesbalancesService,
               private router: Router  ) {
    this.desbalanceService.getHistoricos()
    .subscribe( ( data: Historico[] ) => {
      this.historicos = data;
      console.log(this.historicos);
    } );
   }

  ngOnInit() {
  }

  consultarHistorico( id: string ) {
    this.router.navigate( ['mapa', id] );
  }

}
