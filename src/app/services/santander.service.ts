import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http' 
import { IPokemon } from '../interfaces/IPokemon.interface';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SantanderService {

  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemon(): Observable<IPokemon[]> {
    return this.http.get<IPokemon[]>(`${this.baseUrl}?limit=100&offset=0`)
      .pipe(
        map((response: any) => response.results),
      );
  } 

  getPokemonById(id: string) : Observable<IPokemon>{
    return this.http.get<IPokemon>(`${this.baseUrl}/${id}`).pipe(
      map((response: any) => ({id: id,name: response.name, url: response.sprites.other.dream_world.front_default}))
    )
  }
}
