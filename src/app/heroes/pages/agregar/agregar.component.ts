import { Component, OnInit } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar:MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    //  console.log(this.router.url.includes('editar'));
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroePorID(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      // Actualizar
      this.heroesService
        .actualizarHeroe(this.heroe)
        .subscribe( heroe =>
        this.mostrarSnackBar('Updated')
        );
    } else {
      // Inserta heroe
      this.heroesService
        .agregarHeroe(this.heroe)
        .subscribe(
          heroe =>{
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackBar('Created');

          });
    }
  }


  borrar(){
    const dialog =
    this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed()
    .subscribe(
        (res) => {
         if (res) {
           this.heroesService.borrarHeroe(this.heroe.id!)
           .subscribe(
             res => {
                 this.router.navigate(['/heroes']);
             }
           )

         }
        }

    )



  }

  mostrarSnackBar(mensaje:string):void{
      this.snackBar.open( mensaje, 'Ok', {
          duration: 2500
      })
  }
}
