import { Component } from '@angular/core';
import { IPokemon } from './interfaces/IPokemon.interface';
import { SantanderService } from './services/santander.service';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listPokemon: IPokemon[] = [];
  pokemonSubscription!: Subscription;

  constructor(private santanderService: SantanderService) {}

  ngOnInit() {
    this.getPokemonsData();
  }

  //#Solución 1
  getPokemonsData() {
    this.pokemonSubscription = this.santanderService.getPokemon()
    .subscribe((results : IPokemon[]) => {
      let listIds: string[] = results.map((result: any) => (result.url as string).substring(0,(result.url as string).length - 1).split('/').pop()!);
      listIds.forEach((id: string) => this.santanderService.getPokemonByIdPromise(id)
      .then(
        (pokemon: IPokemon) => {
          this.listPokemon.push(pokemon) 
          this.listPokemon.sort((a, b) => (+a.id! < +b.id! ? -1 : 1))
        }
      )
    );
    });
  }
  
  //#Solución 2
  // getPokemonsData() {
  //   this.pokemonSubscription = this.santanderService.getPokemon().pipe(
  //     switchMap((results: any) => 
  //         results.map((result: any) => 
  //             this.santanderService.getPokemonById(((result.url as string)
  //               .substring(0,(result.url as string).length - 1)
  //               .split('/')
  //               .pop()
  //             ) as string)
  //           )
  //         ),
  //     mergeMap((pokemonList$: any) => pokemonList$),
  //   )
  //   .subscribe(
  //       (pokemon: any) => {
  //         this.listPokemon.push(pokemon) 
  //         this.listPokemon.sort((a, b) => (+a.id! < +b.id! ? -1 : 1))
  //       }
  //   );
  // } 

  ngOnDestroy(): void {
    this.pokemonSubscription.unsubscribe();
  }

}
