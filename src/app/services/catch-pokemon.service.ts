import { Observable, finalize, tap, throwError } from 'rxjs';
import { Trainer } from './../models/trainer';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { Injectable } from '@angular/core';
import { TrainerService } from './trainer.service';
import { Pokemon } from '../models/pokemon';

const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class CatchPokemonService {

  private _isLoading: boolean = false;

  get loading(): boolean{
    return this._isLoading;
  }

  constructor(
    private readonly http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly trainerService: TrainerService
  ) { }

  

  public updateCaughtCollection(pokemonId: number): Observable<Trainer>{

    if(!this.trainerService.trainer){
      throw new Error("Trainer doesn't exist");
    }

      const trainer: Trainer = this.trainerService.trainer;
      const pokemon: Pokemon | undefined = this.pokemonService.pokemonById(pokemonId);

      if(!pokemon){
        throw new Error("No pokemon with id: " + pokemonId);
      }

      if(this.trainerService.inCaughtCollection(pokemonId)){
        this.trainerService.removeFromCaughtCollection(pokemonId);
      }else{
        this.trainerService.addToCaughtCollection(pokemon)
      }

      this._isLoading = true;

      const headers = new HttpHeaders({
        'content-type': 'application/json',
        'x-api-key': apiKey
      })

      return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
        pokemon: [...trainer.pokemon]
      }, { headers }).
      pipe(
        tap((updatedTrainer : Trainer) => {
          this.trainerService.trainer = updatedTrainer;
        }),
        finalize(() => {
          this._isLoading = false;
        })
      )
  }


}
