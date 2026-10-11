import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { map, Observable } from 'rxjs';

type NuevoUsuario = Omit<Usuario, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient)

  private apiURL = 'http://localhost:3000/Usuarios'

  login(email:string, password:string){
    return this.http.get<Usuario[]>(`${this.apiURL}?email=${email}&password=${password}`);
  }

  obtenerUsuarioPorEmail(email:string)
  {
    return this.http.get<Usuario[]>(`${this.apiURL}?email=${email}`);
  }

  // Devuelve un observable de tipo boolean cuando verifica que el usuario existe, si existe retorna true y si no existe retorna false
  verificarUsuario(email:string): Observable<boolean>{
    return this.obtenerUsuarioPorEmail(email).pipe(
      map(usuarios => usuarios.length > 0)
    )

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


  registrarUsuario(usuario: NuevoUsuario)
  {
    return this.http.post<Usuario>(this.apiURL,usuario);
  }

}
