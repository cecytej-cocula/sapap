import { libro } from './../Modelos/libro';
import { infotras } from './../Modelos/infotras';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Phrase } from './../Modelos/Phrase';

import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'
import { Foros } from '../Modelos/Foros';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { contacto } from '../Modelos/contacto';
@Injectable({
  providedIn: 'root'
})
export class FraseServiceService {
  public rol: any;
  public url: any[] = [];
  public correo: any;
  public desc: any;
  url2: any;
  constructor(private db: AngularFirestore, private ruta: Router) { }

  //Métodos para obtener datos
  getinfotrastorno() {
    return this.db.collection('Trastorno').doc('uIXCYAQwVykeG7ZrGMQF').valueChanges();
  }

  getinfoPap() {
    return this.db.collection('Trastorno').doc('2r8NvgNli87OfKLOtUJQ').valueChanges();
  }

  getinfoTecnicas() {
    return this.db.collection('Trastorno').doc('R4hq5Y81DVEJy8PanYMK').valueChanges();
  }

  getForos() {
    return this.db.collection('Foro').valueChanges();
  }

  getLibros() {
    return this.db.collection('Libros').doc('CjHpetmDrecL7KudQQuO').valueChanges();
  }

  getContactos() {
    return this.db.collection('Contactos').doc('Z2zwsHLjGKD3MsCHP75o').valueChanges();
  }

  getVideos() {
    return this.db.collection('Videos').doc('fWBQeZmokFaHHlI1MbWM').valueChanges();
  }

  getCorreo() {
    let temp = this.correo;
    this.clearData();
    return temp;
  }

  geturl() {
    let temp = this.url;
    this.clearData();
    return temp;
  }

  getdesc() {
    let temp = this.desc;
    this.clearData();
    return temp;
  }

  getSugerencias() {
    return this.db.collection('Sugerencia').doc('BXuKAiF7pL19KAspLUre').valueChanges();
  }

  setCorreo(correo: string) {
    this.correo = correo;
  }
  setrol(bol: any) {
    this.rol = bol;
    //console.log(bol)
  }
  setdesc(desc: string) {
    this.desc = desc;
  }
  seturl(imageurl: any[]) {
    this.url = imageurl;
  }

  clearData() {
    this.rol = false;
    this.desc = false;
    this.correo = false;
    this.url = [];
  }
  getAvisos() {
    return this.db.collection('Avisos').doc('m8hCYoPg6wJH9HFBxa1P').valueChanges();
  }
  //Métodos para agregar datos
  sendPhraseToFirebase(F: Phrase) {
    this.db.collection('Frases').doc('2GLbn6U2AyA3rzReD0SB').update({
      Phrases: firebase.firestore.FieldValue.arrayUnion(F),
    });
  }

  sendContactoToFirebase(contact: string, tel1: string, tel2: string, email: string) {
    const c: contacto = {
      contacto: contact!=null?contact:'',
      telefono1: tel1!=null?tel1:'',
      telefono2: tel2!=null?tel2:'',
      correo: email!=null?email:''
    }
    this.db.collection('Contactos').doc('Z2zwsHLjGKD3MsCHP75o').update({
      Contacto: firebase.firestore.FieldValue.arrayUnion(c),
    });
  }

  sendtrastornoToFirebase(titulo: string, descripcion: string, vMovil: boolean) {
    const i= {
      titulo: titulo,
      descripcion: descripcion,
      versionMovil: vMovil
    }
    this.db.collection('Trastorno').doc('uIXCYAQwVykeG7ZrGMQF').update({
      Information: firebase.firestore.FieldValue.arrayUnion(i)
    });
  }

  sendtrastornoToVersionMovil(titulo: string, descripcion: string) {
    const i: infotras = {
      titulo: titulo,
      descripcion: descripcion
    }
    this.db.collection('InformacionMovil').doc('3Oz3NRgiMdjv9kE68Pf6').update({
      Information: firebase.firestore.FieldValue.arrayUnion(i)
    });
  }

  sendPAPToFirebase(titulo: string, descripcion: string, vMovil: boolean) {
    const i= {
      titulo: titulo,
      descripcion: descripcion,
      versionMovil: vMovil
    }
    this.db.collection('Trastorno').doc('2r8NvgNli87OfKLOtUJQ').update({
      Information: firebase.firestore.FieldValue.arrayUnion(i)
    });
  }

  sendVideoToFirebase(tema: string, url: string){
    if(url!=null){
      const indice=url.indexOf('&');
      const url1=url.substring(0, indice);
      this.url2=url1.replace('watch?v=','embed/');
    }

    const v= {
      titulo: tema!=null ? tema : "",
      url: this.url2!=null ? this.url2 : "",
      link: url!=null ? url: ""
    }
    this.db.collection('Videos').doc('fWBQeZmokFaHHlI1MbWM').update({
      Video: firebase.firestore.FieldValue.arrayUnion(v)
    });
  }

  sendtecnicaToFirebase(titulo: string, descripcion: string, vMovil: boolean) {
    const i = {
      titulo: titulo,
      descripcion: descripcion,
      versionMovil: vMovil
    }
    this.db.collection('Trastorno').doc('R4hq5Y81DVEJy8PanYMK').update({
      Information: firebase.firestore.FieldValue.arrayUnion(i)
    });
  }

  sendLibroToFirebase(titulo: string, link: string, descripcion: string) {
    const l: libro = {
      titulo: titulo != null ? titulo : '',
      autor: link != null ? link : '',
      descripcion: descripcion != null ? descripcion : ''
    };
    this.db.collection('Libros').doc('CjHpetmDrecL7KudQQuO').update({
      Librosdesalud: firebase.firestore.FieldValue.arrayUnion(l)
    });
  }

  agregarRegistroForo(tema: string, contenido: any, url1: any) {
    var tema1=tema.replace(' ','');
    this.db.collection('Foro').doc(tema1).set({
      tema: tema!= null ? tema : '',
      contenido: contenido!= null ? contenido : '',
      imagen: url1!= null ? url1 : '',
      date: new Date()
    });
  }

  editarRegistroForo(tema: string, contenido: any, url1: any) {
    var tema1=tema.replace(' ','');
    this.db.collection('Foro').doc(tema1).ref.update({
      tema: tema!= null ? tema : '',
      contenido: contenido!= null ? contenido : '',
      imagen: url1!= null ? url1 : '',
      date: new Date()
    }).then((doc)=>{
      window.location.reload();
    });
  }

  addRespuesta(tema: string, r: string, user: string){
    const res = {
      usuario: user != null ? user : '',
      respuesta: r!= null ? r : '',
      date: new Date()
    };
    this.db.collection('Foro').doc(tema).update({
      Respuestas: firebase.firestore.FieldValue.arrayUnion(res)
    }).then((doc)=>{
      window.location.reload();
    });
  }
  addAviso(url: any) {
    const i={
      url: url!=null?url:''
    }
    this.db.collection('Avisos').doc('m8hCYoPg6wJH9HFBxa1P').update({
      Aviso: firebase.firestore.FieldValue.arrayUnion(i)
    });
  }

  addSugerencia(s: string) {
    const sug = {
      tema: s
    };
    this.db.collection('Sugerencia').doc('BXuKAiF7pL19KAspLUre').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Sugerencias: firebase.firestore.FieldValue.arrayUnion(sug),
    });
  }

  //Métodos para eliminar datos
  eliminarTrastorno(titulo: string, descripcion: string, vMovil: boolean) {
    const t = {
      titulo: titulo,
      descripcion: descripcion,
      versionMovil: vMovil
    };
    this.db.collection('Trastorno').doc('uIXCYAQwVykeG7ZrGMQF').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Information: firebase.firestore.FieldValue.arrayRemove(t)
    });
  }

  eliminarInfoVersionMovil(titulo: string, descripcion: string) {
    const i = {
      titulo: titulo,
      descripcion: descripcion
    }
    this.db.collection('InformacionMovil').doc('3Oz3NRgiMdjv9kE68Pf6').update({
      Information: firebase.firestore.FieldValue.arrayRemove(i)
    });
  }

  eliminarTecnica(titulo: string, descripcion: string, vMovil: boolean) {
    const t = {
      titulo: titulo,
      descripcion: descripcion,
      versionMovil: vMovil
    };
    this.db.collection('Trastorno').doc('R4hq5Y81DVEJy8PanYMK').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Information: firebase.firestore.FieldValue.arrayRemove(t)
    });
  }

  eliminarLibro(titulo: string, descripcion: string, autor: string) {
    const t = {
      titulo: titulo,
      descripcion: descripcion,
      autor: autor
    };
    this.db.collection('Libros').doc('CjHpetmDrecL7KudQQuO').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Librosdesalud: firebase.firestore.FieldValue.arrayRemove(t)
    });
  }

  eliminarVideo(link: string, titulo: string, url: string) {
    const v = {
      link: link,
      titulo: titulo,
      url: url
    };
    this.db.collection('Videos').doc('fWBQeZmokFaHHlI1MbWM').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Video: firebase.firestore.FieldValue.arrayRemove(v)
    });
  }

  eliminarImagen(url: string) {
    const i = {
      url: url
    };
    this.db.collection('Imagenes').doc('RZcmZXolmmH4CHdYXEKJ').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Imagen: firebase.firestore.FieldValue.arrayRemove(i)
    });
  }

  eliminarAviso(url: string) {
    const i = {
      url: url
    };
    this.db.collection('Avisos').doc('m8hCYoPg6wJH9HFBxa1P').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Aviso: firebase.firestore.FieldValue.arrayRemove(i)
    });
  }

  eliminarContacto(contacto: string, tel1: string, tel2: string, correo: string) {
    const c = {
      contacto: contacto,
      telefono1: tel1,
      telefono2: tel2,
      correo: correo
    }
    this.db.collection('Contactos').doc('Z2zwsHLjGKD3MsCHP75o').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Contacto: firebase.firestore.FieldValue.arrayRemove(c)
    });
  }

  eliminarPAP(titulo: string, descripcion: string, vMovil: boolean) {
    const t = {
      titulo: titulo,
      descripcion: descripcion,
      versionMovil: vMovil
    };
    this.db.collection('Trastorno').doc('2r8NvgNli87OfKLOtUJQ').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Information: firebase.firestore.FieldValue.arrayRemove(t)
    });
  }

  eliminarSugerencia(titulo: string) {
    const sug = {
      tema: titulo
    };
    this.db.collection('Sugerencia').doc('BXuKAiF7pL19KAspLUre').update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Sugerencias: firebase.firestore.FieldValue.arrayRemove(sug)
    });
  }

  eliminarRespuesta(usuario: string, respuesta: string, fecha: Date, tema: string) {
    var tema1=tema.replace(' ','');
    const res = {
      usuario: usuario,
      respuesta: respuesta,
      date: fecha
    };
    this.db.collection('Foro').doc(tema1).update({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Respuestas: firebase.firestore.FieldValue.arrayRemove(res)
    }).then((doc)=>{
      window.location.reload();
    });
  }

  eliminarEntrada(titulo: string, contenido: any, url1: any, date: Date) {
    var tema1=titulo.replace(' ','');
    this.db.collection('Foro').valueChanges().subscribe(async values => {
      await this.db.collection('Foro').doc(tema1).ref.delete();
    });
  }

  getUsers(){
    return this.db.collection('Usuarios').valueChanges();
  }
  
}
