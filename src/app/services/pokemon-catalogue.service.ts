import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../models/pokemon';


const {apiPokemons} = environment;


@Injectable({
  providedIn: 'root'
})

export class PokemonCatalogueService {

  private _limit = 20;
  private _pokemons: Pokemon[] = [];
  private _pokemonsWithId: Pokemon[] = [];
  private _error: string = '';
  private _isLoading: boolean = false;

  get pokemons(): Pokemon[]{
    return this._pokemonsWithId;
  }

  get isLoading(): boolean{
    return this._isLoading;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void{
    this._isLoading = true;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("limit", this._limit);

    this.http.get<Pokemon[]>(apiPokemons, {params: queryParams}).
    pipe(
      map((response: any) => response.results),
      finalize(() => this._isLoading = false)
    ).
    subscribe({
      next: (pokemons: Pokemon[]) =>{
        this._pokemons = pokemons;
        this._findPokemonsByName();
        console.log(this._pokemonsWithId);
      },
      error:(error: HttpErrorResponse) => {
        this._error = error.message;
      }
    }
    )
  }

  private _findPokemonsByName(): void{
    this._pokemonsWithId = [];
    this._pokemons.forEach((pokemon) => {
      this.http.get<Pokemon>(`${apiPokemons}/${pokemon.name}`).
      subscribe({
        next: (response: Pokemon) => {
          return (
            this._pokemonsWithId.push({
            ...pokemon,
            id: response.id,
            url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${response.id}.png`
          }))
        }
      })
    })
  }

  public pokemonById(id: number): Pokemon | undefined {
    return this._pokemonsWithId.find((pokemon: Pokemon) => pokemon.id === id )
  }
}
