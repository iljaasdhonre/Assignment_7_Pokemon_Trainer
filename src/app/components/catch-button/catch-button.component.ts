import { TrainerService } from './../../services/trainer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CatchPokemonService } from './../../services/catch-pokemon.service';
import { Pokemon } from 'src/app/models/pokemon';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer';

@Component({
  selector: 'app-catch-button',
  templateUrl: './catch-button.component.html',
  styleUrls: ['./catch-button.component.css']
})
export class CatchButtonComponent implements OnInit {

  public isCaught: boolean = false;
  @Input() pokemon!: Pokemon;

  get loading(): boolean{
    return this.catchPokemonService.loading;
  }

  ngOnInit(): void {
      this.isCaught = this.trainerService.inCaughtCollection(this.pokemon.id);
  }

  constructor(
    private readonly trainerService: TrainerService,
    private readonly catchPokemonService: CatchPokemonService) { }

  catchPokemon(){
    this.pokemon.isCaught = true;
    this.catchPokemonService.updateCaughtCollection(this.pokemon.id).
    subscribe({
      next: (trainer: Trainer) => {
        this.isCaught = this.trainerService.inCaughtCollection(this.pokemon.id);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    });
  }

}
