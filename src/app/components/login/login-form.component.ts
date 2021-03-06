import { LoginService } from '../../services/login.service';
import { Component, EventEmitter, Output} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  constructor(
    private readonly trainerService: TrainerService,
    private readonly loginService: LoginService) { }

    
  public loginSubmit(loginForm: NgForm): void{

    const {username} = loginForm.value;

    this.loginService.login(username)
      .subscribe({
        next: (trainer: Trainer) => {
          this.trainerService.trainer = trainer;
          this.login.emit();
        },
        error: () =>{
          console.log("something went wrong");
        }
      })
  }

}
