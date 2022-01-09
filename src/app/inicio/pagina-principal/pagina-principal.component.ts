import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.scss']
})
export class PaginaPrincipalComponent implements OnInit {
  imagenes: any={};
  constructor(private route: Router, private storage: AngularFireStorage, private servicefrase: FraseServiceService) { }

  ngOnInit(): void {
    this.servicefrase.getAvisos().subscribe(resp => {
      this.imagenes = resp;
    })
  }

  chat() {
    this.route.navigate(['/home-chat']);
  }

}
