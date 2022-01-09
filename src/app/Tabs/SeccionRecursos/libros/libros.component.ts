import { Component, OnInit, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EntryFormComponent } from 'src/app/Forms/entry-form/entry-form.component';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { DialogComponent } from '../../dialog/dialog.component';
import { AddtrastornosComponent } from '../../informacion/addtrastornos/addtrastornos.component';
import { EdittrastornosComponent } from '../../informacion/edittrastornos/edittrastornos.component';
DialogComponent

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})

export class LibrosComponent implements OnInit {
  public elem: any;
  public remit = "libros";
  public rol: boolean = false;
  showMainContent: Boolean = false;
  isPsicologo: Boolean = false;
  public item: any;
  showDivContent: Boolean = false;

  constructor(private servicefrase: FraseServiceService, private router: Router, private dialog: MatDialog, 
    private afauth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.servicefrase.getLibros().subscribe(resp => {
      this.elem = resp;
    },
      error => {
        console.error(error)
      }
    );
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          const rol = doc.get('rol');
          this.isPsicologo = rol === 'psicologo' ? true : false;
        });
      }
    });
  }
 
  buscar(item: string) {
    this.showDivContent = this.showDivContent = false;
    this.item = null;

    this.showDivContent = this.showDivContent = true;
    this.item = item;
  }

  saltoDeLinea(texto: string) {
    return texto.replace(/\n/g, '<br />');
  }

  eliminarLibro(titulo: string, descripcion: string, link: string){
    console.log()
    this.servicefrase.eliminarLibro(titulo, descripcion, link);
  }

  agregar(){
    const dialogRef = this.dialog.open(AddtrastornosComponent, {
      height: '500px',
      width: '450px',
      data: { tipo:"Libro"}
    });
  }

  editar(titulo: string, descripcion: string, link: string){
    const dialogRef = this.dialog.open(EdittrastornosComponent, {
      height: '500px',
      width: '450px',
      data: { tipo:"Libro", libroTitulo: titulo, libroDescripcion: descripcion, libroLink: link}
    });
  }
}
