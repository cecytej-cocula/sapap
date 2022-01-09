import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss']
})
export class CambiarPasswordComponent implements OnInit {

  passwordNew!: string;

  constructor(private afauth: AngularFireAuth, private authSvc: AuthService, private db: AngularFirestore) { }

  ngOnInit(): void {
  }

  cambiar() {
    this.authSvc.cambiar(this.passwordNew);
  }
}
