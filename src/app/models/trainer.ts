import { Pokemon } from './pokemon';
export interface Trainer{
    id: number;
    username: string;
    pokemon: Pokemon[];
}