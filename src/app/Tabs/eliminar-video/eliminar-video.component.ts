import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

@Component({
  selector: 'app-eliminar-video',
  templateUrl: './eliminar-video.component.html',
  styleUrls: ['./eliminar-video.component.scss']
})
export class EliminarVideoComponent implements OnInit {

  public elem: any;

  constructor(private servicefrase: FraseServiceService, 
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
  }

  eliminar(link: string, titulo: string, url: string){
    this.servicefrase.eliminarVideo(link, titulo, url);
  }

  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
