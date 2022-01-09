import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { DialogComponent } from '../dialog/dialog.component';
import { AddtrastornosComponent } from '../informacion/addtrastornos/addtrastornos.component';
import { EdittrastornosComponent } from '../informacion/edittrastornos/edittrastornos.component';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  isPsicologo: Boolean = false;
  elem: any=[];

  constructor(private servicefrase: FraseServiceService, private router: Router, private dialog: MatDialog, 
    private afauth: AngularFireAuth, private db: AngularFirestore) { }

  ngOnInit(): void {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          const rol = doc.get('rol');
          console.log(rol)
          this.isPsicologo = rol === 'psicologo' ? true : false;
        });
      }
    });
    console.log(this.isPsicologo)
    this.servicefrase.getContactos().subscribe(resp => {
      
      this.elem = resp;
      console.log(this.elem);
    });
  }


  eliminarContacto(contacto: string, tel1: string, tel2: string, correo: string){
    this.servicefrase.eliminarContacto(contacto, tel1, tel2, correo);
  }

  agregar(){
    const dialogRef = this.dialog.open(AddtrastornosComponent, {
      height: '450px',
      width: '350px',
      data: { tipo:"Contacto"}
    });
  }

  editar(contacto: string, tel1: string, tel2: string, correo: string){
    const dialogRef = this.dialog.open(EdittrastornosComponent, {
      height: '450px',
      width: '350px',
      data: { tipo:"Contacto", contactoNombre: contacto, contactoTelefono1: tel1, contactoTelefono2: tel2, contactoCorreo: correo}
    });
  }
}
