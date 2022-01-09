import { infotras } from '../../../Modelos/infotras';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { ToolbarComponent } from '../../toolbar/toolbar.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatDialog } from '@angular/material/dialog';
import { AddtrastornosComponent } from '../../informacion/addtrastornos/addtrastornos.component';
import { Router } from '@angular/router';
import { EdittrastornosComponent } from '../../informacion/edittrastornos/edittrastornos.component';

@Component({
  selector: 'app-infotrans',
  templateUrl: './infotrans.component.html',
  styleUrls: ['./infotrans.component.scss']
})
export class InfotransComponent implements OnInit {
  
  public elem: any;
  public item: any;
  showDivContent: Boolean = false;
  isPsicologo: Boolean = false;
  content!: string;
  titulo!: string;
  
  constructor(private servicefrase: FraseServiceService, private dialog: MatDialog, private afauth: AngularFireAuth,
    private db: AngularFirestore, private router: Router) {

  }

  ngOnInit(): void {
    this.servicefrase.getinfotrastorno().subscribe(resp => {
      this.elem = resp;
      console.log(this.elem)
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

  saltoDeLinea(texto: string) {
    return texto.replace(/\n/g, '<br />');
  }

  buscar(item: string) {
    this.showDivContent = this.showDivContent = false;
    this.item = null;

    this.showDivContent = this.showDivContent = true;
    this.item = item;
  }

  eliminarTrastorno(titulo: string, descripcion: string, vMovil:boolean){
    this.servicefrase.eliminarInfoVersionMovil(titulo, descripcion);
    this.servicefrase.eliminarTrastorno(titulo, descripcion, vMovil);
  }

  agregar(){
    const dialogRef = this.dialog.open(AddtrastornosComponent, {
      height: '450px',
      width: '650px',
      data: { tipo:"Trastorno"}
    });
  }

  editar(titulo: string, descripcion: string, vMovil:boolean){
    const dialogRef = this.dialog.open(EdittrastornosComponent, {
      height: '450px',
      width: '650px',
      data: { tipo:"Trastorno", infoTema: titulo, infoContenido: descripcion, vMovil:vMovil}
    });
  }

}
