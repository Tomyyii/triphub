import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { form, minLength, required } from '@angular/forms/signals';

@Component({
  selector: 'app-register-page',
  imports: [],
  templateUrl: './registerPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage {

  private router = inject(Router);

  Genders = signal<string[]>(["Male","Female","Other"])

  usuarioModel = signal<Usuario>({
    email:"",
    id:0,
    birthday:"",
    name:"",
    password:"",
    phoneNumber:"",
    surname:"",
    gender:""
  })

  registerForm = form(this.usuarioModel, (path) =>{
    required(path.email,{message:'El email es requerido'});
    minLength(path.email,2,{message: 'El email debe tener por lo menos 2 caracteres'})

    required(path.name,{message:'El nombre es requerido'});

    required(path.surname,{message:'El apellido es requerido'});

    required(path.password,{message:'La contraseña es requerida'});
    minLength(path.password,6,{message:'La contraseña debe tener por lo menos 6 caracteres'});

  })


}
