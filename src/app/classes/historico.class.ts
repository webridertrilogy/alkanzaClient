import { Marcador } from './marcador.class';
import { UUID } from 'angular2-uuid';

export class Historico {

    id: string;
    fecha: Date;
    radio: number;
    latitud: number;
    longitud: number;
    resultado: number;
    listMarcadores: Marcador[];

    constructor( lat: number, lng: number, rad: number, res: number ) {
        this.id = UUID.UUID();
        this.latitud = lat;
        this.longitud = lng;
        this.radio = rad;
        this.resultado = res;
    }

    setListMarcadores( listMarcadores: Marcador[] ) {
        this.listMarcadores = listMarcadores;
    }
}
