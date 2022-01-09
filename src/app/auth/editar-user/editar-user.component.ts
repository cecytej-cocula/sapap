import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, BUCKET } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-editar-user',
  templateUrl: './editar-user.component.html',
  styleUrls: ['./editar-user.component.scss']
})
export class EditarUserComponent implements OnInit {

  name!: string;
  lastName!: string;
  image: any;

  constructor(private afauth: AngularFireAuth, private authSvc: AuthService, private db: AngularFirestore, private storage: AngularFireStorage) {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          this.name = doc.get("nombre");
          this.lastName = doc.get("apellido");
          this.image = doc.get("imagen");
        });
      }
    })
  }

  ngOnInit(): void {
  }

  editar() {
    this.authSvc.editar(this.name, this.lastName);
  }

  onUpload(e: any) {
    const file = e.target.files[0];

    const ref = this.storage.ref("images/" + file.name);

    // Subir el archivo
    const upload = ref.put(file).then(url => {
      url.ref.getDownloadURL().then(url => {
        this.authSvc.image(url);
      })
    })

  }
}
