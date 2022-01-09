import { Component, Inject, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { informacion } from 'src/app/Modelos/informacion';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';

@Component({
  selector: 'app-editar-entrada',
  templateUrl: './editar-entrada.component.html',
  styleUrls: ['./editar-entrada.component.scss']
})
export class EditarEntradaComponent implements OnInit {

  titulo!: string;//Variable para el libro nuevo
  tituloAnterior!: string;//Variable para el libro nuevo
  contenido!: string;//Variable para el libro nuevo
  contenidoAnterior!: string;//Variable para el libro anterior
  imagen!: string;//Variable para el libro anterior
  imagenAnterior!: string;//Variable para el libro anterior
  fecha!: Date;//Variable para el libro anterior
  ref: any;
  file: any;
  imagenUrl: any;

  constructor(private servicefrase: FraseServiceService, public dialogRef: MatDialogRef<EditarEntradaComponent>,
    @Inject(MAT_DIALOG_DATA) public dataD: informacion, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.titulo = this.dataD.temaForo;
    this.tituloAnterior = this.dataD.temaForo;
    this.contenido = this.dataD.contenidoForo;
    this.contenidoAnterior = this.dataD.contenidoForo;
    this.imagen=this.dataD.imgForo;
    this.imagenAnterior=this.dataD.imgForo;
    this.fecha=this.dataD.fechaForo;
  }

  editarEntrada(){
    console.log(this.titulo)
    if (this.ref != null) {
      const upload = this.ref.put(this.file).then((url: any) => {
        url.ref.getDownloadURL().then((url: any) => {
          this.servicefrase.editarRegistroForo(this.titulo, this.contenido, url);
        })
      })
      this.dialogRef.close();
    }else{
      this.servicefrase.editarRegistroForo(this.titulo, this.contenido, this.imagen);
      this.dialogRef.close();
    }
  }

  eliminarImagen(){
    this.imagen="";
  }

  onUpload(e: any) {
    this.file = e.target.files[0];
    this.ref = this.storage.ref('foro/' + this.file.name);
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
