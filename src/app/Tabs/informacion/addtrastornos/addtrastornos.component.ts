import { infotras } from './../../../Modelos/infotras';
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { informacion } from 'src/app/Modelos/informacion';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from 'src/app/Servicios/auth.service';

FraseServiceService
@Component({
  selector: 'app-addtrastornos',
  templateUrl: './addtrastornos.component.html',
  styleUrls: ['./addtrastornos.component.scss']
})
export class AddtrastornosComponent implements OnInit {
  public showMainContent: boolean = false;
  public rol: any;
  public remit: string;
  content!: string;
  titulo!: string;
  descripcion!: string;
  contact!: string;
  tel1!: string;
  tel2!: string;
  email!: string;
  nombre!: string;
  link!: string;
  tema!: string;
  url!: string;
  imgTitulo!: string;
  informacion: boolean = false;
  imagen: boolean = false;
  libro: boolean = false;
  contacto: boolean=false;
  video: boolean=false;
  vMovil=false;

  constructor(private servicefrase: FraseServiceService, public dialogRef: MatDialogRef<AddtrastornosComponent>,
    @Inject(MAT_DIALOG_DATA) public dataD: informacion, private storage: AngularFireStorage, private authSvc: AuthService) {
    this.remit = this.dataD.tipo;
    if (this.remit == "Trastorno" || this.remit == "Técnica" || this.remit == "PAP") {
      this.informacion = true;
    }else if(this.remit=="Libro"){
      this.libro=true;
    }else if(this.remit=="Contacto"){
      this.contacto=true;
    }else if(this.remit=="Video"){
      this.video=true;
    }
  }

  ngOnInit(): void {
    this.obtenerrol();
  }

  obtenerrol() {
    this.rol = localStorage.getItem("rol");
    console.log(this.rol);
  }
  ShowHideButton() {
    this.showMainContent = this.showMainContent = true;
  }

  onNoClick() {
    this.dialogRef.close();
  }
  
  agregarInformacion() {
    if(this.vMovil==true){
      this.servicefrase.sendtrastornoToVersionMovil(this.titulo, this.content);
    }
    if (this.remit == "Trastorno") {
      this.servicefrase.sendtrastornoToFirebase(this.titulo, this.content, this.vMovil);
    } else if (this.remit == "Técnica") {
      this.servicefrase.sendtecnicaToFirebase(this.titulo, this.content, this.vMovil);
    } else if (this.remit == "PAP") {
      this.servicefrase.sendPAPToFirebase(this.titulo, this.content, this.vMovil);
    } else if (this.remit == "Libro") {
      this.servicefrase.sendLibroToFirebase(this.nombre, this.link, this.descripcion);
    } else if(this.remit=="Contacto"){
      this.servicefrase.sendContactoToFirebase(this.contact, this.tel1, this.tel2, this.email);
    }else if(this.remit=="Video"){
      this.servicefrase.sendVideoToFirebase(this.tema, this.url);
    }

    this.titulo = "";
    this.content = "";
    this.nombre = "";
    this.link = "";
    this.descripcion = "";
    this.contact="";
    this.tel1="";
    this.tel2="";
    this.email="";
    this.tema="";
    this.url="";
    this.dialogRef.close();
  }
}
