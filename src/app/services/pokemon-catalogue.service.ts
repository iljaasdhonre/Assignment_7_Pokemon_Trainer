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
  private _error: string = '';
  private _isLoading: boolean = false;

  get pokemons(): Pokemon[]{
    return this._pokemons;
  }

  get isLoading(): boolean{
    return this._isLoading;
  }

  constructor(private readonly http: HttpClient) { }

  public findAllPokemons(): void{
    this._isLoading = true;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("limit", this._limit);

    this.http.get<any>(apiPokemons, {params: queryParams}).
    pipe(
      map((response: any) => response.results),
      finalize(() => this._isLoading = false)
    ).
    subscribe({
      next: (pokemons: Pokemon[]) =>{
        console.log(pokemons);
        this._pokemons = pokemons;
      },
      error:(error: HttpErrorResponse) => {
        this._error = error.message;
      }
    }
    )
  }
}
