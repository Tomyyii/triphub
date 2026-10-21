import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/authService';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { form, FormField, minLength, required, submit } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

interface UsuarioSimple{
  email:string,
  password:string
}

@Component({
  selector: 'app-login-page',
  imports: [FormField, JsonPipe, RouterLink],
  templateUrl: './loginPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {

  private router = inject(Router)

  loginError = signal("");

  usuarioModel = signal<UsuarioSimple>({
  email: "",
  password: "",
  });

  loginForm = form(this.usuarioModel, (path) =>{
    required(path.email,{message: 'El email es requerido'});
    minLength(path.email, 2, {message: 'El email tiene que tener por lo menos 2 caracteres'});

    required(path.password,{message: 'La contraseña es necesaria'});
    minLength(path.password, 2, {message:'La contraseña debe tener mas de 2 caracteres'});
  })


  // Funcion para determinar si un campo es valido o no, creamos una señal computada para crear una condicion la cual dice que si el field tiene errores devolvera un valor booleano en true

  isFieldInvalid(fieldName: keyof UsuarioSimple):boolean{
    const fieldSignal = this.loginForm[fieldName];
    if(!fieldSignal()) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }



  onSubmit(event: Event)
  {
    event.preventDefault();

    submit(this.loginForm, async () =>{
      this.serviceAuth.login(this.usuarioModel().email,this.usuarioModel().password).subscribe({
        next: (usuario)=>{
          if(usuario.length === 0){
            this.loginError.set("Credenciales incorrectas, ingreselas nuevamente");
            this.onReset();
            return;
          }
            this.serviceAuth.guardarUsuario(usuario)
            this.router.navigate(['/dashboard']);
        }
      })


    })

  }

  onReset()
  {
    this.usuarioModel.set({
      email:'',
      password:'',
    })

    this.loginForm().reset()
  }

  serviceAuth = inject(AuthService);

  // buscarUsuario(email:string,password:string)
  // {
  //   this.serviceAuth.login("tomas.dallier@gmail.com","1234pas").subscribe({
  //     next: (usuario) =>{
  //       console.log(usuario)
  //     },
  //     error: (error) =>{
  //       console.error(error)
  //     }
  //   })
  // }




}
