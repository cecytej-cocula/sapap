import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

@Component({
  selector: 'app-add-avisos',
  templateUrl: './add-avisos.component.html',
  styleUrls: ['./add-avisos.component.scss']
})
export class AddAvisosComponent implements OnInit {
  imagenes: any={};
  constructor(private storage: AngularFireStorage, private authSvc: AuthService, private servicefrase: FraseServiceService) { }

  ngOnInit(): void {
    this.servicefrase.getAvisos().subscribe(resp => {
      this.imagenes = resp;
    })
  }

  onUpload(e: any) {
    const file = e.target.files[0];
    const ref = this.storage.ref("avisos/" + file.name);
    // Subir el archivo
    const upload = ref.put(file).then(url => {
      url.ref.getDownloadURL().then(url => {
        this.servicefrase.addAviso(url);
      })
    })
  }

  eliminar(url: string){
    this.servicefrase.eliminarAviso(url)
  }
}
