import { HttpClient } from '@angular/common/http';
import { StorageKeys } from './../enums/storage-keys.enum';
import { StorageUtil } from './../utils/storage.util';
import { Injectable } from '@angular/core';
import { Trainer } from '../models/trainer';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;

  get trainer(): Trainer | undefined {
    return this._trainer;
  }

  set trainer(trainer: Trainer | undefined){
    StorageUtil.localStorageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer;
  }

  constructor(private readonly http: HttpClient) {
      this._trainer = StorageUtil.localStorageRead<Trainer>(StorageKeys.Trainer);
    }

  public inCaughtCollection(pokemonId: number){
    if(this._trainer){
      return Boolean(this._trainer?.pokemon.find((pokemon: Pokemon)=> pokemon.id === pokemonId))
    }

    return false;
  }

  public addToCaughtCollection(pokemon: Pokemon){
    if(this._trainer){
      this._trainer.pokemon.push(pokemon);
    }
  }

  public removeFromCaughtCollection(pokemonId: number){
    if(this._trainer){
      this._trainer.pokemon = this._trainer.pokemon.
      filter((pokemon: Pokemon) => pokemon.id !== pokemonId);
    }
  }
  
  deleteStorage(){
    StorageUtil.localStorageDelete(StorageKeys.Trainer);
    this._trainer = undefined;
  }
}
