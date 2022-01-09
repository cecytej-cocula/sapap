import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/Servicios/auth.service';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/Modelos/User';
@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.scss']
})
export class VerificarEmailComponent implements OnInit {
  userData: any;

  constructor(private authSvc: AuthService, private router: Router, private afauth: AngularFireAuth) { 
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.userData = user.email;
      }
    })
  }

  ngOnInit(): void {}

  reenviar(){
    this.authSvc.reenviar();
  }
  
}
