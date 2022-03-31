import { PokemonCatalogueService } from './../../services/pokemon-catalogue.service';
import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  get pokemons(): Pokemon[]{
    return this.pokemonService.pokemons;
  }

  get isLoading(): boolean{
    return this.pokemonService.isLoading;
  }

  constructor(private readonly pokemonService: PokemonCatalogueService) { }

  ngOnInit(): void {
    this.pokemonService.findAllPokemons();
  }
}
