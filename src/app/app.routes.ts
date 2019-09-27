import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapaComponent } from './components/mapa/mapa.component';
import { HistoricoComponent } from './components/historico/historico.component';

const routes: Routes = [
    { path: 'mapa', component: MapaComponent },
    { path: 'historico', component: HistoricoComponent },
    { path: 'mapa/:id', component: MapaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'mapa' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
