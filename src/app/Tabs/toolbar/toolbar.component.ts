import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { HomeChatComponent } from 'src/app/Chats/home-chat/home-chat.component';
import { AuthService } from 'src/app/Servicios/auth.service';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { AddtrastornosComponent } from '../informacion/addtrastornos/addtrastornos.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  userData: any;
  correo: any;
  idchat: any;
  rol: any;
  isPsicologo: boolean = false;
  isLoggedIn: boolean = false;
  lista: string[] = ["hola", "que", "tal", "estas"];
  image!: string;

  constructor(private afauth: AngularFireAuth, private authSvc: AuthService, private db: AngularFirestore,
    private serviceFrase: FraseServiceService, private dialog: MatDialog) {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          this.userData = doc.get("nombre") + " " + doc.get("apellido");
          this.rol = doc.get("rol");

          this.isPsicologo = this.rol == 'psicologo' ? true : false;
          //console.log(this.isPsicologo);
          this.serviceFrase.setrol(this.isPsicologo);
          this.correo = doc.get("correo");
          this.idchat = doc.get("idchat");
          localStorage.setItem("correo", JSON.stringify(this.correo));
          localStorage.setItem("idchat", JSON.stringify(this.idchat));
          localStorage.setItem("rol", JSON.stringify(this.rol));
          localStorage.setItem("nombreuser", JSON.stringify(this.userData));
          this.image = doc.get("imagen");
        });
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  ngOnInit(): void {
    this.serviceFrase.setrol(this.isPsicologo);
  }

  logout() {
    this.authSvc.logout();
  }

  openDialogChat() {
    this.dialog.open(HomeChatComponent,{
      height: '520px',
      width: '990px'
    });
  }

  agregar(type: string) {
    const dialogRef = this.dialog.open(AddtrastornosComponent, {
      height: '450px',
      width: '350px',
      data: { tipo: type }
    });
  }
}
