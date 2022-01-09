import { Component, OnInit, SecurityContext } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { AddtrastornosComponent } from '../../informacion/addtrastornos/addtrastornos.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  isPsicologo: Boolean = false;
  public elem: any;
  public elementos: any;
  url: SafeResourceUrl;

  constructor(private servicefrase: FraseServiceService, private router: Router, private dialog: MatDialog, 
    private afauth: AngularFireAuth, private db: AngularFirestore, public sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.servicefrase.getVideos().subscribe(resp => {
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

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  agregar(){
    const dialogRef = this.dialog.open(AddtrastornosComponent, {
      height: '300px',
      width: '400px',
      data: { tipo:"Video"}
    });
  }

  eliminar(){
    this.router.navigate(['/eliminarVideo']);
  }
}
