import { Trainer } from 'src/app/models/trainer';
import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  get trainer(): Trainer | undefined{
    return this.trainerService.trainer;
  }

  logOut(){
    this.trainerService.deleteStorage();
  }

  constructor(private readonly trainerService: TrainerService) { }

}
