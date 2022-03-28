import { LoginService } from './../../services/login.service';
import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private readonly loginService: LoginService) { }

  public loginSubmit(loginForm: NgForm): void{

    const {username} = loginForm.value;

    this.loginService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {

        },
        error: () =>{

        }
      })
  }

}
