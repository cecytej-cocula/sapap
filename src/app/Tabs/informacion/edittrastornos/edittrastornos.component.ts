import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { informacion } from 'src/app/Modelos/informacion';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

@Component({
  selector: 'app-edittrastornos',
  templateUrl: './edittrastornos.component.html',
  styleUrls: ['./edittrastornos.component.scss']
})
export class EdittrastornosComponent implements OnInit {

  public remit: string;
  content!: string;//Variable para la información nueva
  titulo!: string;//Variable para la información nueva
  contentAnterior!: string;//Variable para la información anterior
  tituloAnterior!: string;//Variable para la información anterior
  contact!: string;//Variable para el contacto nuevo
  tel1!: string;//Variable para el contacto nuevo
  tel2!: string;//Variable para el contacto nuevo
  email!: string;//Variable para el contacto nuevo
  contactAnterior!: string;//Variable para el contacto anterior
  tel1Anterior!: string;//Variable para el contacto anterior
  tel2Anterior!: string;//Variable para el contacto anterior
  emailAnterior!: string;//Variable para el contacto anterior
  nombre!: string;//Variable para el libro nuevo
  link!: string;//Variable para el libro nuevo
  descripcion!: string;//Variable para el libro nuevo
  nombreAnterior!: string;//Variable para el libro anterior
  linkAnterior!: string;//Variable para el libro anterior
  descripcionAnterior!: string;//Variable para el libro anterior
  informacion: boolean = false;
  libro: boolean = false;
  contacto: boolean=false;
  video: boolean=false;
  vMovil=false;
  vMovilAnterior=false;
  constructor(private servicefrase: FraseServiceService, public dialogRef: MatDialogRef<EdittrastornosComponent>,
    @Inject(MAT_DIALOG_DATA) public dataD: informacion) { }

  ngOnInit(): void {
    this.remit = this.dataD.tipo;
    console.log(this.dataD);
    if (this.remit == "Trastorno" || this.remit == "Técnica" || this.remit == "PAP") {
      this.informacion = true;
      this.content=this.dataD.infoContenido;
      this.titulo=this.dataD.infoTema;
      this.contentAnterior=this.dataD.infoContenido;
      this.tituloAnterior=this.dataD.infoTema;
      this.vMovil=this.dataD.vMovil;
      this.vMovilAnterior=this.dataD.vMovil;
    }else if(this.remit=="Libro"){
      this.libro=true;
      this.nombre=this.dataD.libroTitulo;
      this.link=this.dataD.libroLink;
      this.descripcion=this.dataD.libroDescripcion;
      this.nombreAnterior=this.dataD.libroTitulo;
      this.linkAnterior=this.dataD.libroLink;
      this.descripcionAnterior=this.dataD.libroDescripcion;
    }else if(this.remit=="Contacto"){
      this.contacto=true;
      this.contact=this.dataD.contactoNombre;
      this.tel1=this.dataD.contactoTelefono1;
      this.tel2=this.dataD.contactoTelefono2;
      this.email=this.dataD.contactoCorreo;
      this.contactAnterior=this.dataD.contactoNombre;
      this.tel1Anterior=this.dataD.contactoTelefono1;
      this.tel2Anterior=this.dataD.contactoTelefono2;
      this.emailAnterior=this.dataD.contactoCorreo;
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  editarInformacion() {
    if(this.vMovil==true && (this.remit == "Trastorno" || this.remit == "Técnica" || this.remit == "PAP")){
      this.servicefrase.eliminarInfoVersionMovil(this.tituloAnterior, this.contentAnterior);
      this.servicefrase.sendtrastornoToVersionMovil(this.titulo, this.content)
    }else if(this.vMovil==false && (this.remit == "Trastorno" || this.remit == "Técnica" || this.remit == "PAP")){
      this.servicefrase.eliminarInfoVersionMovil(this.tituloAnterior, this.contentAnterior);
    }

    if (this.remit == "Trastorno") {
      this.servicefrase.eliminarTrastorno(this.tituloAnterior, this.contentAnterior, this.vMovilAnterior);//Primero se elimina la info anterior
      this.servicefrase.sendtrastornoToFirebase(this.titulo, this.content, this.vMovil);//Se agrega un nuevo registro con la info nueva
    } else if (this.remit == "Técnica") {
      this.servicefrase.eliminarTecnica(this.tituloAnterior, this.contentAnterior, this.vMovilAnterior);
      this.servicefrase.sendtecnicaToFirebase(this.titulo, this.content, this.vMovil);
    } else if (this.remit == "PAP") {
      this.servicefrase.eliminarPAP(this.tituloAnterior, this.contentAnterior, this.vMovilAnterior);
      this.servicefrase.sendPAPToFirebase(this.titulo, this.content, this.vMovil);
    } else if (this.remit == "Libro") {
      console.log(this.nombreAnterior)
      console.log(this.descripcionAnterior)
      console.log(this.linkAnterior)
      this.servicefrase.eliminarLibro(this.nombreAnterior, this.descripcionAnterior, this.linkAnterior)
      this.servicefrase.sendLibroToFirebase(this.nombre, this.link, this.descripcion);
    } else if(this.remit=="Contacto"){
      this.servicefrase.eliminarContacto(this.contactAnterior, this.tel1Anterior, this.tel2Anterior, this.emailAnterior);
      this.servicefrase.sendContactoToFirebase(this.contact, this.tel1, this.tel2, this.email);
    }
    this.dialogRef.close();
  }
}
