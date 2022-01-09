import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { informacion } from 'src/app/Modelos/informacion';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

@Component({
  selector: 'app-agregar-sugerencia',
  templateUrl: './agregar-sugerencia.component.html',
  styleUrls: ['./agregar-sugerencia.component.scss']
})
export class AgregarSugerenciaComponent implements OnInit {

  sugerencia: boolean=false;
  respuesta: boolean=false;
  sug!: string;
  res!: string;
  public remit: string;
  tema: string;
  usuario: string;

  constructor(public dialogRef: MatDialogRef<AgregarSugerenciaComponent>, private servicio: FraseServiceService,
    @Inject(MAT_DIALOG_DATA) public dataD: informacion, private router: Router) {
      this.remit = this.dataD.tipo;
    if (this.remit == "Sugerencia") {
      this.sugerencia = true;
    }else if(this.remit=="Respuesta"){
      this.respuesta=true;
      this.tema=this.dataD.temaForo;
      this.usuario=this.dataD.usuario;
    }
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

  enviarSugerencia() {
    if (this.remit == "Sugerencia") {
      this.servicio.addSugerencia(this.sug);
    }else if(this.remit=="Respuesta"){
      this.servicio.addRespuesta(this.tema.replace(' ',''), this.res, this.usuario);
    }
    this.dialogRef.close();
    
  }
}
