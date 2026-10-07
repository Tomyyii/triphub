import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../shared/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)

  private apiURL = 'http://localhost:3000/Usuarios'

  login(email:string, password:string){
    return this.http.get<Usuario[]>(`${this.apiURL}?email=${email}&password=${password}`);
  }

  logout():void
  {
    localStorage.removeItem('usuario')
  }

  guardarUsuario(usuario:Usuario[])
  {
    localStorage.setItem('usuario',JSON.stringify(usuario[0]));
  }

  isLoggedIn():boolean{
    return localStorage.getItem('usuario') !== null;
  }



}
