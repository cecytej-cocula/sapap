import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { AgregarEntradaComponent } from '../agregar-entrada/agregar-entrada.component';
import { AgregarSugerenciaComponent } from '../agregar-sugerencia/agregar-sugerencia.component';
import { EditarEntradaComponent } from '../editar-entrada/editar-entrada.component';
import { EdittrastornosComponent } from '../informacion/edittrastornos/edittrastornos.component';

@Component({
  selector: 'app-foro',
  templateUrl: './foro.component.html',
  styleUrls: ['./foro.component.scss']
})
export class ForoComponent implements OnInit {

  public elem: any;
  public entradas: any = [];
  public item: any;
  showDivContent: Boolean = false;
  isPsicologo: Boolean = false;
  usuario: string;
  
  constructor(private servicefrase: FraseServiceService, private dialog: MatDialog, private afauth: AngularFireAuth,
    private db: AngularFirestore) { }

  ngOnInit(): void {
    this.servicefrase.getForos().subscribe(resp => {
      this.elem = resp;
      for (const entrada of this.elem) {//For para recorrer cada doc
        console.log(entrada.tema)
        if (entrada.tema!== undefined) {
          console.log('entra')
          this.entradas.push(entrada);
        }
      }
    },
      error => {
        console.error(error)
      }
    )
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          const rol = doc.get('rol');
          this.isPsicologo = rol === 'psicologo' ? true : false;
          this.usuario=doc.get('nombre')+ " " +doc.get('apellido');
        });
      }
    });
  }

  buscar(I: string) {
    this.showDivContent = this.showDivContent = false;
    this.showDivContent = this.showDivContent = true;

    this.item = I;
  }

  editar(titulo: string, contenido:string, imagen:string, date: Date){
    const dialogRef = this.dialog.open(EditarEntradaComponent, {
      height: '550px',
      width: '650px',
      data: { temaForo: titulo, contenidoForo: contenido, imgForo: imagen, fechaForo: date}
    });
  }

  saltoDeLinea(texto: string) {
    return texto.replace(/\n/g, '<br />');
  }
  
  agregar(){
    const dialogRef = this.dialog.open(AgregarEntradaComponent, {
      height: '550px',
      width: '900px',
    });
  }

  sugerencia(){
    const dialogRef = this.dialog.open(AgregarSugerenciaComponent, {
      height: '210px',
      width: '450px',
      data: { tipo:"Sugerencia"}
    });
  }

  fecha(f: any){
    let date = f.toDate();
    let anio = date.getFullYear();
    let mes = date.getMonth()+1;
    let dia = date.getDate();
    let hora = date.getHours();
    let min = date.getMinutes();
    return dia+"/"+mes+"/"+anio+" - "+hora+":"+min+"hrs.";
  }

  eliminarEntrada(titulo: string, contenido:string, imagen:string, date: Date){
    this.servicefrase.eliminarEntrada(titulo, contenido, imagen, date);
  }

  responder(tema: string){
    const dialogRef = this.dialog.open(AgregarSugerenciaComponent, {
      height: '350px',
      width: '450px',
      data: { tipo:"Respuesta", temaForo: tema, usuario: this.usuario}
    });
  }

  eliminarRespuesta(usuario: string, respuesta: string, date: Date, tema: string){
    this.servicefrase.eliminarRespuesta(usuario, respuesta, date, tema);
  }
}
