import { LoginService } from '../../services/login.service';
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginComponent {

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService) { }

  public loginSubmit(loginForm: NgForm): void{

    const {username} = loginForm.value;

    this.loginService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {
          this.router.navigateByUrl("/profile");
        },
        error: () =>{
          console.log("something went wrong");
        }
      })
  }

}
