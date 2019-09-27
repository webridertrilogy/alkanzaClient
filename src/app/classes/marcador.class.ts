import { UUID } from 'angular2-uuid';

export class Marcador {

    id: string;
    latitud: number;
    longitud: number;
    nombre: string;
    distancia: number;
    descripcion: string;
    esCentroMedico: boolean;


    constructor( lat: number, lng: number ) {
        this.id = UUID.UUID();
        this.latitud = lat;
        this.longitud = lng;
        this.distancia = 0;
        this.nombre = 'Sin Nombre';
        this.esCentroMedico = true;
        this.descripcion = 'Sin Descripcion';
    }

    setNombre( nombre: string ) {
        this.nombre = nombre;
    }

    setDescripcion( descripcion: string ) {
        this.descripcion = descripcion;
    }

    setEsCentroMedico( esCentroMedico: boolean ) {
        this.esCentroMedico = esCentroMedico;
    }

    setDistanciaOrigen( distancia: number ) {
        this.distancia = distancia;
    }
}
