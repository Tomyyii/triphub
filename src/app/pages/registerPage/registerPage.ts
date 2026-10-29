import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { form, minLength, pattern, required, FormField, maxLength, submit, validate } from '@angular/forms/signals';
import { AuthService } from '../../core/services/authService';
import { firstValueFrom } from 'rxjs';

interface registerFormModel extends Usuario{
  confirmPassword: string;
}

@Component({
  selector: 'app-register-page',
  imports: [FormField, RouterLink],
  templateUrl: './registerPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class RegisterPage {

  private router = inject(Router);
  private authService= inject(AuthService)

  fechaActual = new Date().toISOString().split('T')[0];

  usuarioExiste = signal<boolean>(false)

  usuarioModel = signal<registerFormModel>({
    email:"",
    id:0,
    birthday:"",
    name:"",
    password:"",
    phoneNumber:"",
    surname:"",
    gender:"",
    confirmPassword:""
  })

  registerForm = form(this.usuarioModel, (path) =>{
    required(path.email,{message:'El email es requerido'});
    minLength(path.email,2,{message: 'El email debe tener por lo menos 2 caracteres'})

    required(path.name,{message:'El nombre es requerido'});

    required(path.surname,{message:'El apellido es requerido'});

    required(path.password,{message:'La contraseña es requerida'});
    minLength(path.password,7,{message:'La contraseña debe tener por lo menos 6 caracteres'});
    pattern(path.password, /.*[A-Z].*/,{
      message:'La contraseña debe contener al menos 1 mayuscula'
    })

    required(path.confirmPassword,{
      message:'Debe confirmar su contraseña'
    })

    required(path.birthday,{
      message:'La fecha de nacimiento es obligatoria'
    })

    required(path.gender,{
      message:'Debe seleccionar una opcion'
    })

    required(path.phoneNumber,{
      message:'El numero telefonico es obligatorio'
    })
    maxLength(path.phoneNumber,10,{
      message:'El numero es invalido'
    })


    validate(path.birthday, ({value}) =>{
      if(!value) return null;

      const today = new Date()

      today.setHours(0,0,0,0);
      const birthDate = new Date(value());
      birthDate.setHours(0,0,0,0);

      if(birthDate > today)
      {
        return{
          message: 'La fecha de nacimiento no puede ser mayor a hoy',
          kind:'error'
        };
      }

      return null;
    })



  })


  isFieldInvalid(fieldName: keyof registerFormModel):boolean{
    const fieldSignal = this.registerForm[fieldName];
    if(!fieldSignal()) return false;

    const field = fieldSignal();
    return field && field.touched() && field.errors().length > 0;
  }

  passwordMatch():boolean{
    return this.usuarioModel().password === this.usuarioModel().confirmPassword;
  }


  registrarUsuario()
  {
    const {id, confirmPassword, ...datosUsuario} = this.usuarioModel();

    this.authService.registrarUsuario(datosUsuario).subscribe({
      next: (usuarioCreado) =>{
        console.log('usuario Creado')
        console.log('ID generado:', usuarioCreado.id)
        this.router.navigate(['/login'])
      },
      error: (error) =>
      {
        console.error('Error al registrar el usuario', error)
      }
    })
  }


  // Nueva funcion de onSubmit utilizando el next y error

  onSubmit(event:Event)
  {
    event.preventDefault()
    this.usuarioExiste.set(false)

    submit(this.registerForm, async() =>
      {
        if(!this.passwordMatch())
          {
            console.log('Las contraseñas no coinciden')
            return;
          }

          this.authService.verificarUsuario(this.usuarioModel().email).subscribe({
            next:(existe) =>{
              if(existe)
              {
                this.usuarioExiste.set(true);
                return
              }
              this.registrarUsuario()
            },
            error: (error:Error)=>
            {
              console.log('Error al verificar el usuario',error)
            }
          })
      }
    )
  }


  // FUNCION DE MANERA ASINCRONA Y CON PROMESAS

  // async onSubmit(event: Event)
  // {
  //   event.preventDefault()
  //   this.usuarioExiste.set(false)

  //   submit(this.registerForm, async () =>
  //   {
  //     if(!this.passwordMatch())
  //     {
  //       console.log('Las contraseñas no coinciden')
  //       return
  //     }

  //     try
  //     {
  //       // El firstValueFrom de RxJS recibe un observable y lo convierte en una promesa
  //       const yaExiste = await firstValueFrom(this.authService.verificarUsuario(this.usuarioModel().email));
  //       if(yaExiste)
  //       {
  //         this.usuarioExiste.set(true);
  //         return;
  //       }

  //       this.registrarUsuario()
  //     }
  //     catch (error)
  //     {
  //       console.error('Error al verificar el usuario', error)
  //     }
  //   })


  // }



   onReset()
  {
    this.usuarioModel.set({
      email:"",
      id:0,
      birthday:"",
      name:"",
      password:"",
      phoneNumber:"",
      surname:"",
      gender:"",
      confirmPassword:""
    })

    this.registerForm().reset()
  }



}
