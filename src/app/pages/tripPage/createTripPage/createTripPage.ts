import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, FormField, required, submit, validate } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { Viaje } from '../../../shared/interfaces/viaje.interface';
import { TripService } from '../../../core/services/tripService';
import { Destino } from '../../../shared/interfaces/destino.interface';

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
export class CreateTripPage {


  tripService = inject(TripService)

viajeModel = signal<viajeSimple>({
  fechaFinalizacion:"",
  fechaInicio:"",
  name:"",
  transporte:""
});

destinoModel = signal<Destino>({
  ciudad:'Buenos Aires',
  latitud:1,
  longitud:1,
  pais:'Argentina',
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
}


crearViaje():Omit<Viaje, 'id'> | null
{
  const usuarioId = this.tripService.obtenerIdUsuario()


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








}
