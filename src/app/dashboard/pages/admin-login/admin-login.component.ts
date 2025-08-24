import { Component } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../serviceProduct/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {

  loginForm : FormGroup = new FormGroup({
    email : new FormControl(null , [Validators.required , Validators.email]),
    password : new FormControl('' , [Validators.required])
  })

  errorMessage : string | null = null ;

  get email(){
    return this.loginForm.get('email') as FormControl
  }

  get password(){
    return this.loginForm.get('password') as FormControl
  }

  constructor(
    private fb: FormBuilder ,
    private authService : AuthService ,
    private router : Router
  ){}

  onSubmit() : void {
    if(this.loginForm.invalid){
      this.errorMessage = 'veuillez remplir tous les champs correctement' ;
      return ;
    }

    this.errorMessage = null ;
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        console.log('connexion reussi ');
        this.router.navigate(['/dashboard/profile'])
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Une erreur est survenue lors de la connexion'
        console.error('Erreur de connexion' , err)
      }
    })
   }
}
