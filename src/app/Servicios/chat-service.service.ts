import { Message } from 'src/app/Modelos/Mensajes';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app'

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  idchat!: string;
  resp: any;
  userRef: any;
  msgCifrado: any;
  aux: string;
  x: any;
  constructor(private db: AngularFirestore) { }

  getChatRooms(id: string) {
    return this.db.collection('Chat').doc(id).valueChanges();
  }

  getchat() {
    return this.db.collection('Chat').valueChanges();
  }

  getUsuariosEnLinea() {
    return this.db.collection('UsuariosEnLinea').doc('ufUbd6RNCOK55juBOgyH').valueChanges();
  }
  
  //Agregar mensaje
  sendMsgToFireBase(mensaje: string, userName: string, idchat: string, img: any){
    const m: Message = {
      contenido: mensaje,
      user: userName,
      date: new Date(),
      imagen: img
    };
    const doc = this.db.collection('Chat').doc(idchat);
    doc.ref.get().then((docData)=>{
      if(docData.exists){//Si ya existe un mensaje en el doc que solo lo actualice
        this.db.collection('Chat').doc(idchat).update({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Messages: firebase.firestore.FieldValue.arrayUnion(m)
        });
      }else{//Si no hay ningun mensaje en el doc que agregue el primero
        this.db.collection('Chat').doc(idchat).set({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          Messages: firebase.firestore.FieldValue.arrayUnion(m)
        });
      }
    });
  }

  enviarEstado(estado: boolean){
    this.db.collection('UsuariosEnLinea').doc('ufUbd6RNCOK55juBOgyH').set({
      Estado: estado
    });
  }
}
