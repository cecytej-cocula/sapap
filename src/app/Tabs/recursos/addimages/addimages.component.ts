import { imagenmodel } from './../../../Modelos/imagenmodel';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

AuthService
@Component({
  selector: 'app-addimages',
  templateUrl: './addimages.component.html',
  styleUrls: ['./addimages.component.scss']
})
export class AddimagesComponent implements OnInit {

  imagenes: any={};
  
  constructor(private storage: AngularFireStorage, private authSvc: AuthService, private servicefrase: FraseServiceService) { }

  ngOnInit(): void {
    this.authSvc.getImagenes().subscribe(resp => {
      this.imagenes = resp;
    })
  }

  onUpload(e: any) {
    const file = e.target.files[0];
    const ref = this.storage.ref("imagenes/" + file.name);
    // Subir el archivo
    const upload = ref.put(file).then(url => {
      url.ref.getDownloadURL().then(url => {
        this.authSvc.imagenes(url);
      })
    })
  }

  eliminar(url: string){
    this.servicefrase.eliminarImagen(url)
  }

}
