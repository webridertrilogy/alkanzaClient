import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';
import { DesbalancesService } from '../../services/desbalances.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Historico } from '../../classes/historico.class';
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  radio = 1000;
  resultado = 0;
  lat = 4.6688332;
  lng = -74.0505207;
  consulta = false;
  loading = false;
  calculado = false;
  marcadores: Marcador[] = [];

  @ViewChild('radio', { static: true }) radioValor: ElementRef;
  @ViewChild('resultado', { static: true }) resultadoValor: ElementRef;

  constructor( private snackBar: MatSnackBar,
               public dialog: MatDialog,
               private router: Router,
               private activatedRoute: ActivatedRoute,
               public desbalanceService: DesbalancesService) {
    this.activatedRoute.params.subscribe( params => {
      if (params.id) {
        this.getHistorico( params.id );
      }
    } );
  }

  ngOnInit() {
    this.setCurrentLocation();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
 
  }

  limpiarPantalla() {
    console.log('sdfasdfa');
    this.router.navigateByUrl( '/mapa' );
  }

  getHistorico( id: string ) {

    this.desbalanceService.getHistorico( id )
        .subscribe( ( historico: Historico ) => {
          console.log(historico);
          this.radio = historico.radio;
          this.resultado = historico.resultado;
          this.lat = historico.latitud;
          this.lng = historico.longitud;
          this.marcadores = historico.listMarcadores;
          this.consulta = true;
          this.radioValor.nativeElement.value = historico.radio;
          this.resultadoValor.nativeElement.value = historico.resultado;
          this.radioValor.nativeElement.disabled = true;
        } );
  }

  private buscar() {
    console.log('buscar');
    const map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: this.lat, lng: this.lng},
      zoom: 15,
      mapTypeId: 'roadmap'
    });

    const request = {
      location: map.getCenter(),
      radius: this.radio,
      query: 'Centros Medicos'
    };

    const service = new google.maps.places.PlacesService(map);
    service.textSearch(request, this.callback.bind(this));
  }

  private callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      results.forEach(element => {
        if (!element.geometry) {
          return;
        }
        const marc: Marcador = new Marcador(element.geometry.location.lat(), element.geometry.location.lng());
        marc.setNombre(element.name);
        marc.setDescripcion(element.formatted_address);
        this.marcadores.push(marc);
      });
      const center = new google.maps.LatLng(this.lat, this.lng);
      this.marcadores = this.marcadores.filter(m => {
        const markerLoc = new google.maps.LatLng(m.latitud, m.longitud);
        const distance =  Math.round( google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) );
        m.setDistanciaOrigen( distance );
        if (distance < this.radioValor.nativeElement.value) {
          return m;
        }
      });
      console.log(this.marcadores);
    }
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const marc: Marcador = new Marcador(this.lat, this.lng);
        marc.setNombre('Punto Referencia');
        marc.setDescripcion('PR');
        marc.setEsCentroMedico(false);
        this.marcadores.push(marc);
      });
    }
  }

  realizarCalculo() {
    let longitud = this.marcadores.length === 0 ? 0 : this.marcadores.length - 1;
    let conjuntoD = Array.from({length: this.marcadores.length}, () => Math.floor(Math.random() * longitud));
    let conjuntoBTemp = Array.from({length: this.marcadores.length}, () => Math.floor(Math.random() * longitud));
    let conjuntoB = [];

    conjuntoBTemp.filter( m => {
      if (conjuntoD.indexOf(m) < 0 && conjuntoB.indexOf(m) < 0 ) {
        conjuntoB.push(m);
      }
    });

    console.log(conjuntoD);
    console.log(conjuntoBTemp);
    console.log(conjuntoB);

    let minimoDesbalance = 0;

    conjuntoD.forEach( i => {
      conjuntoB.forEach( j => {
        console.log(this.marcadores[i].distancia + '-' + this.marcadores[j].distancia);
        minimoDesbalance += Math.abs( this.marcadores[i].distancia - this.marcadores[j].distancia );
      });
    });

    this.resultadoValor.nativeElement.value = minimoDesbalance;
    this.calculado = true;
    this.radioValor.nativeElement.disabled = true;
  }

  guardarCalculo() {
    let historico: Historico;
    this.loading = true;
    this.consulta = true;
    this.calculado = false;
    historico = new Historico(this.lat, this.lng, this.radioValor.nativeElement.value, this.resultadoValor.nativeElement.value);
    historico.setListMarcadores( this.marcadores );

    this.desbalanceService.postHistorico( historico )
        .subscribe( ( data ) => {
          console.log(data);
          this.loading = false;
          this.router.navigateByUrl( '/historico' );
        } );
  }

  agregarMarcador( evento ) {
    const coords: { lat: number, lng: number } = evento.coords;

    this.lat = coords.lat;
    this.lng = coords.lng;
    const marcador: Marcador = new Marcador( coords.lat , coords.lng );
    this.marcadores = [];
    marcador.setNombre('Punto Referencia');
    marcador.setDescripcion('PR');
    marcador.setEsCentroMedico(false);
    this.marcadores.push( marcador );
    console.log(this.marcadores);

    this.buscar();
    // this.guardarStorage();
    this.snackBar.open('Marcador Agregado', 'Cerrar', { duration: 500 });
  }

  onMouseOver(infoWindow, gm) {
    console.log('entre');

    // if (gm.lastOpen != null) {
    //     gm.lastOpen.close();
    // }

    // gm.lastOpen = infoWindow;

    infoWindow.open();
  }

  onMouseOut(infoWindow, gm) {
    infoWindow.close();
  }

  guardarStorage() {

    localStorage.setItem('marcadores', JSON.stringify( this.marcadores ) );

  }

  borrarMarcador( index: number ) {

    this.marcadores.splice( index, 1 );
    // this.guardarStorage();
    this.snackBar.open('Marcador Borrado', 'Cerrar', { duration: 3000 });
  }

  editarMarcador( marcador: Marcador ) {

    const dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.nombre, descripcion: marcador.descripcion}
    });

    dialogRef.afterClosed().subscribe(result => {

      if ( !result ) {
        return;
      }

      marcador.nombre = result.nombre;
      marcador.descripcion = result.descripcion;
      // this.guardarStorage();
      this.snackBar.open('Marcador Actualizado', 'Cerrar', { duration: 3000 });
    });

  }
}
