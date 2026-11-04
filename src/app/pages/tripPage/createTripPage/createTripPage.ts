import { ChangeDetectionStrategy, Component, inject, signal, AfterViewInit, OnDestroy } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { Viaje } from '../../../shared/interfaces/viaje.interface';
import { TripService } from '../../../core/services/tripService';
import { Destino } from '../../../shared/interfaces/destino.interface';

import * as L from 'leaflet';
import { CountryService } from '../../../core/services/countryService';
import { MyCountry } from '../../../shared/interfaces/country.interface';
import { City } from '../../../shared/interfaces/cityResponse.interface';
import { OpenMeteoService } from '../../../core/services/openMeteoService';

interface viajeSimple {
  name:string,
  fechaInicio: string,
  fechaFinalizacion: string;
  transporte: string
}

@Component({
  selector: 'app-create-trip-page',
  imports: [FormField, RouterLink],
  templateUrl: './createTripPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTripPage implements AfterViewInit, OnDestroy{


  router = inject(Router)


  busquedaCiudad = signal('');
  busquedaPais = signal('');


  tripService = inject(TripService)

viajeModel = signal<viajeSimple>({
  fechaFinalizacion:"",
  fechaInicio:"",
  name:"",
  transporte:""
});

destinoModel = signal<Destino>({
  ciudad:'',
  latitud:0,
  longitud:0,
  pais:'',
  id:1
})


viajeForm = form(this.viajeModel, (path) =>{
  required(path.name,{message:"El nombre es requerido"});

  required(path.fechaFinalizacion,{message:"La fecha de finalizacion es requerida"})

  required(path.fechaInicio,{message:"La fecha de inicio es requerida"})

  required(path.transporte,{message: 'El transporte es requerido'})

  validate(path.fechaFinalizacion, ({value}) =>{
    if(!value) return null;

    const fechaIn = new Date(this.viajeModel().fechaInicio)
    const fechaFin = new Date(value());

    if(fechaIn > fechaFin)
    {
      return{
        message:'La fecha de finalizacion no puede ser menor a la fecha de inicio',
        kind: 'error'
      }
    }
    return null;
  })
})


isFieldInvalid(fieldname: keyof viajeSimple):boolean{
  const fieldSignal = this.viajeForm[fieldname];
  if(!fieldSignal()) return false;

  const field = fieldSignal();
  return field && field.touched() && field.errors().length > 0;
}



onSubmit(event: SubmitEvent)
{
  event.preventDefault();

  submit(this.viajeForm, async () =>{

    const viajeAPost = this.crearViaje();
    if(!viajeAPost)
    {
      return;
    }
    this.tripService.guardarViaje(viajeAPost).subscribe({
      next:(resp) =>{
        console.log("El viaje se creo con exito")
      },
      error:(error) =>{
        console.error('Error al postear el viaje', console.error)
      }
    })

  } )
  this.router.navigate(['/dashboard/trip'])

}


crearViaje():Omit<Viaje, 'id'> | null
{
  const usuarioId = this.tripService.obtenerIdUsuario()

  this.destinoModel.set({
    ciudad:this.ciudadSeleccionada()?.name!,
    latitud:this.ciudadSeleccionada()?.latitude!,
    longitud:this.ciudadSeleccionada()?.longitude!,
    pais:this.paisSeleccionado()?.name!,
    id:this.ciudadSeleccionada()?.id
  })


  if(!usuarioId)
  {
    return null;
  }

    return{
        name:this.viajeModel().name,
        usuarioId:usuarioId,
        transporte:this.viajeModel().transporte,
        fechaFinalizacion:this.viajeModel().fechaFinalizacion,
        fechaInicio:this.viajeModel().fechaInicio,
        estado:'activo',
        destino: this.destinoModel()
      }
}




// Logica de leaflet

private map?: L.Map;

ngAfterViewInit(): void {
  this.map = L.map('map').setView([-41.1335, -71.3103], 13);

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(this.map);

  L.marker([-41.1335, -71.3103])
  .addTo(this.map)
  .bindPopup('San Carlos de Bariloche')
  .openPopup();
}

ngOnDestroy(): void {
  this.map?.remove();
}


// Logica de buscar un pais

  private countryService = inject(CountryService);

  paises = signal<MyCountry[]>([]);

  paisSeleccionado = signal<MyCountry | null>(null);

  buscarPais(query: string)
  {
    if(query.length < 2)
    {
      this.paises.set([])
      return;
    }

    this.countryService.searchByCountry(query).subscribe({
      next:(resp) =>{
        this.paises.set(resp);
      },
      error: (error) =>{
        console.error(error)
        this.paises.set([]);
      }
    })
  }


  seleccionarPais(pais: MyCountry)
  {
    this.paisSeleccionado.set(pais);
    this.paises.set([]);

    this.colocarMarcadorPais();
    this.busquedaPais.set(pais.name)
  }


  colocarMarcadorPais()
  {
    const nombrePais = signal(this.paisSeleccionado()?.name)
    const latitud = signal(this.paisSeleccionado()?.coordinates.lat)
    const longitud = signal(this.paisSeleccionado()?.coordinates.lng)

    if(!longitud || !latitud || !this.map)
    {
      return;
    }

    this.map.setView([latitud()!,longitud()!], 4);
    L.marker([latitud()!,longitud()!])
    .addTo(this.map)
    .bindPopup(nombrePais()!);
  }


  // LOGICA DE SELECCIONAR CIUDADES

  ciudades = signal<City[]>([]);

  private cityService = inject(OpenMeteoService);

  ciudadSeleccionada = signal<City | null>(null);



  buscarCiudades(query:string)
  {
    const pais = this.paisSeleccionado();

    if(!pais || query.length < 2 )
    {
      this.ciudades.set([])
      return;
    }

    this.cityService.obtenerCiudades(query,pais.alpha_2).subscribe({
      next: (resp) =>{
        this.ciudades.set(resp?.results ?? []);
        console.log('Ciudad', resp)
      },
      error: (error) =>{
        console.error('Error al obtener las ciudades del pais seleccionado', error);
        this.ciudades.set([]);
      }

    })

  }


  seleccionarCiudad(ciudad: City)
  {
    this.ciudadSeleccionada.set(ciudad);
    this.ciudades.set([])

    this.colocarMarcadorCiudad()
    this.busquedaCiudad.set(ciudad.name)
  }


  colocarMarcadorCiudad()
  {
    const nombreCiudad = signal(this.ciudadSeleccionada()?.name)
    const latitud = signal(this.ciudadSeleccionada()?.latitude);
    const longitud = signal(this.ciudadSeleccionada()?.longitude);

    if(!longitud || !latitud ||  !this.map)
    {
      return;
    }
    this.map?.setView([latitud()!,longitud()!], 13)


    L.marker([latitud()!,longitud()!])
    .addTo(this.map)
    .bindPopup(nombreCiudad()!)
  }
}


