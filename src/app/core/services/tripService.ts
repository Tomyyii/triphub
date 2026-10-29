import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Viaje } from '../../shared/interfaces/viaje.interface';
import { Usuario } from '../../shared/interfaces/usuario.interface';

type nuevoViaje = Omit<Viaje,'id'>

@Injectable({
  providedIn: 'root',
})
export class TripService {

  private apiUrl = 'http://localhost:3000/Viajes'


  private http = inject(HttpClient);


  obtenerViajes()
  {
    return this.http.get<Viaje[]>(this.apiUrl);
  }


  obtenerIdUsuario(){

    const usuarioGuardado = localStorage.getItem('usuario');

    if(!usuarioGuardado)
    {
      return null;
    }

    const usuario: Usuario = JSON.parse(usuarioGuardado)

    return usuario.id
  }


  guardarViaje(viaje:nuevoViaje)
  {
    return this.http.post<Viaje>(this.apiUrl, viaje);
  }





}
