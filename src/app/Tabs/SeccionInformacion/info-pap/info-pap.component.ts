import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { AddtrastornosComponent } from '../../informacion/addtrastornos/addtrastornos.component';
import { EdittrastornosComponent } from '../../informacion/edittrastornos/edittrastornos.component';

@Component({
  selector: 'app-info-pap',
  templateUrl: './info-pap.component.html',
  styleUrls: ['./info-pap.component.scss']
})
export class InfoPAPComponent implements OnInit {
  
  public elem: any;
  public item: any;
  showDivContent: Boolean = false;
  isPsicologo: Boolean = false;

  constructor(private servicefrase: FraseServiceService, private afauth: AngularFireAuth,
    private db: AngularFirestore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.servicefrase.getinfoPap().subscribe(resp => {
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

  eliminarPAP(titulo: string, descripcion: string, vMovil:boolean){
    this.servicefrase.eliminarInfoVersionMovil(titulo, descripcion);
    this.servicefrase.eliminarPAP(titulo, descripcion, vMovil);
  }

  agregar(){
    const dialogRef = this.dialog.open(AddtrastornosComponent, {
      height: '450px',
      width: '650px',
      data: { tipo:"PAP"}
    });
  }

  editar(titulo: string, descripcion: string, vMovil:boolean){
    const dialogRef = this.dialog.open(EdittrastornosComponent, {
      height: '450px',
      width: '650px',
      data: { tipo:"PAP", infoTema: titulo, infoContenido: descripcion, vMovil: vMovil}
    });
  }
}
