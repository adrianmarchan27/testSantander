import { Component } from '@angular/core';
import { IPokemon } from './interfaces/IPokemon.interface';
import { SantanderService } from './services/santander.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  listPokemon: IPokemon[] = [];

  constructor(private santanderService: SantanderService) {}

  ngOnInit() {
    this.getPokemonsData();
  }


  getPokemonsData() {
    this.santanderService.getPokemon()
    .subscribe((results : IPokemon[]) => {
      let listIds: string[] = results.map((result: any) => (result.url as string).substring(0,(result.url as string).length - 1).split('/').pop()!);
      listIds.forEach((id: string) => this.santanderService.getPokemonById(id)
      .subscribe(
        (pokemon: IPokemon) => {
          this.listPokemon.push(pokemon) 
          this.listPokemon.sort((a, b) => (+a.id! < +b.id! ? -1 : 1))
        }
      )
    );
    });
  } 

}
