import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

@Component({
  selector: 'app-agregar-entrada',
  templateUrl: './agregar-entrada.component.html',
  styleUrls: ['./agregar-entrada.component.scss']
})
export class AgregarEntradaComponent implements OnInit {

  sugerencias: any = {};
  content!: string;
  titulo!: string;
  ref: any;
  file: any;
  imagenUrl: any;

  constructor(private ruta: Router, private afauth: AngularFireAuth,
    private servicio: FraseServiceService, private db: AngularFirestore, private storage: AngularFireStorage,
    public dialogRef: MatDialogRef<AgregarEntradaComponent>) { }

  ngOnInit(): void {
    this.servicio.getSugerencias().subscribe(ent => {
      this.sugerencias = ent;
    });
  }

  eliminarSugerencia(tema: string) {
    this.servicio.eliminarSugerencia(tema);
   }

  onNoClick() {
    this.dialogRef.close();
  }

  agregarEntrada() {
    if (this.ref != null) {
      const upload = this.ref.put(this.file).then((url: any) => {
        url.ref.getDownloadURL().then((url: any) => {
          this.servicio.agregarRegistroForo(this.titulo, this.content, url);
        })
      })
      this.dialogRef.close();
    } else {
      this.servicio.agregarRegistroForo(this.titulo, this.content, null);
      this.dialogRef.close();
    }
  }

  onUpload(e: any) {
    this.file = e.target.files[0];
    this.ref = this.storage.ref('foro/' + this.file.name);
  }
}
