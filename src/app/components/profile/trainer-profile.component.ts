import { Pokemon } from './../../models/pokemon';
import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private readonly trainerService: TrainerService) { }

  username: string = "";
  pokemons: Pokemon[] = [];
  

  ngOnInit(): void {
    const trainer: Trainer = this.trainerService.trainer!;
    this.username = trainer.username;
    // trainer.pokemon.map((pokemon) => {
    //   this.pokemons.push(
    //     {{name: pokemon}}
    //   )
    // })
  }

}
