import { Pokemon } from './../../models/pokemon';
import { Component, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';
import { TrainerService } from 'src/app/services/trainer.service';
import { CatchPokemonService } from 'src/app/services/catch-pokemon.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private readonly catchPokemonService: CatchPokemonService,
    private readonly trainerService: TrainerService) { }

  username: string = "";
  pokemons: Pokemon[] = [];
  

  ngOnInit(): void {
    const trainer: Trainer = this.trainerService.trainer!;
    this.username = trainer.username;
    this.pokemons = trainer.pokemon;
  }

  setFree(pokemon: Pokemon){
    pokemon.isCaught = false;
    this.catchPokemonService.updateCaughtCollection(pokemon.id).
    subscribe({
      next: (trainer: Trainer) => {
        pokemon.isCaught = this.trainerService.inCaughtCollection(pokemon.id);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    });
  }
}