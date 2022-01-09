import { AuthService } from 'src/app/Servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AddtrastornosComponent } from '../../informacion/addtrastornos/addtrastornos.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {
  imagenes: any={};
  isPsicologo: Boolean = false;
  constructor(private service: AuthService, private db: AngularFirestore, private router: Router, private dialog: MatDialog,
    private afauth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.service.getImagenes().subscribe(resp => {
      this.imagenes = resp;
    });
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          const rol = doc.get('rol');
          this.isPsicologo = rol === 'psicologo' ? true : false;
        });
      }
    });
  }

  agregar(){
    const dialogRef = this.dialog.open(AddtrastornosComponent, {
      height: '300px',
      width: '300px',
      data: { tipo:"Imagen"}
    });
  }

  eliminar(){
    this.router.navigate(['/addimages']);
  }

}
