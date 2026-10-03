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

  devolverUsuarios()
  {
    return this.http.get<Usuario[]>(`${this.apiURL}`)
  }
}
