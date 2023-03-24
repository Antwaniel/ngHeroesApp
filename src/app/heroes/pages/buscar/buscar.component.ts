import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;


  constructor( private heroesService: HeroesService) { }

  ngOnInit(): void {
  }


  buscando(){
this.heroesService.getSugerencias(this.termino.trim() )
.subscribe( heroes => this.heroes = heroes)
  }


  opcionSeleccionada(
    event:MatAutocompleteSelectedEvent){
      // console.log(event);

// TODO: validar si es un string vacio
if (!event.option.value) {
  this.heroeSeleccionado= undefined;
  return
}
 const heroe:Heroe = event.option.value;

   console.log(heroe);
    this.termino= heroe.superhero;

    this.heroesService.getHeroePorID( heroe.id! )
    .subscribe( heroe => this.heroeSeleccionado= heroe);





  }

}
