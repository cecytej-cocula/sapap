import { AfterViewChecked, ChangeDetectorRef, Component, ContentChild, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Message } from 'src/app/Modelos/Mensajes';
import { AuthService } from 'src/app/Servicios/auth.service';
import { ChatServiceService } from 'src/app/Servicios/chat-service.service';
import * as CryptoJS from 'crypto-js'
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NgContentAst } from '@angular/compiler';
import { MatCardContent } from '@angular/material/card';

AuthService
@Component({
  selector: 'app-home-chat',
  templateUrl: './home-chat.component.html',
  styleUrls: ['./home-chat.component.scss']
})
export class HomeChatComponent implements OnInit {
  @ViewChild('scrollElement') content: ElementRef;//Para que tome el foco
  scrolltop: number = 0;
  chatrooms: any = {};
  public msg: string = "";
  chat: any;
  user: any;
  rol: any;
  date!: any;
  isrol: boolean = true;
  msgCifrado: string;
  salas: any = [];
  isPsicologo = false;
  usuarios: any = {};
  psicologoEnLinea = false;
  nombre: string;
  imagen: any;
  imagen1: any;
  chats: any = [];
  chatsDelDia: any = [];
  estudiantes: any = [];
  fotosDePerfil: any = [];
  idChats: any = [];
  idchat: string;
  ultimo: number;
  userData: any;
  id: string;
  miMensaje: any = [];
  imagen2: any = [];
  ejemplo: any = [];
  idChatEstudiante: string;
  estado: boolean;
  users: any = [];

  constructor(private chatService: ChatServiceService, private authS: AuthService,
    private fraseService: FraseServiceService, private cdref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<HomeChatComponent>, private afauth: AngularFireAuth, private db: AngularFirestore) {
  }

  ngOnInit(): void {
    this.chatService.getUsuariosEnLinea().subscribe(ent => {//Obtener todos los usuarios que estan conectados
      this.usuarios = ent;
      if (this.usuarios.Estado === true) {//Comparar los ids para encontrar el que corresponda al psicologo
        this.psicologoEnLinea = true;
        this.estado = true;
      } else {
        this.estado = false;
      }
    });

    this.afauth.authState.subscribe(user => {//Obtener el usuario conectado
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          const rol = doc.get('rol');
          this.idchat = doc.get('idchat');
          this.user = doc.get('nombre') + ' ' + doc.get('apellido');//Obtener nombre
          this.imagen2 = doc.get('imagen');
          this.isPsicologo = rol === 'psicologo' ? true : false;
          if (this.isPsicologo === false) {//Es alumno
            this.fraseService.getUsers().subscribe(ent => {//Obtener todas los doc de la coleccion usuarios
              this.users = ent;
              for (const user1 of this.users) {//For para recorrer cada doc
                if (user1.rol === 'psicologo') {
                  this.nombre = user1.nombre + ' ' + user1.apellido;//Obtener el nombre del psicologo
                  this.imagen = user1.imagen;//Obtener la foto de perfil del psicologo
                }
              }
            });
          } else {//Es psicologo
            const fechaDeHoy = new Date().toLocaleDateString();//Obtener fecha actual (dia-mes-año)
            this.chatService.getchat().subscribe(ent => {//Obtener todas los doc de la coleccion chat
              this.chats = ent;
              for (const chat of this.chats) {//For para recorrer cada doc
                if (chat.Messages != null) {
                  this.ultimo = chat.Messages.length;//Obtener el total del mensajes en el doc
                  if (this.fecha(chat.Messages[this.ultimo - 1].date) > fechaDeHoy + ' - 00:00hrs.') {//Comparar la fecha del ultimo con la fecha de hoy
                    if (chat.iduser) {
                      this.estudiantes = [];
                      this.fotosDePerfil = [];
                      this.idChats = [];
                      this.db.collection('Usuarios').doc(chat.iduser).ref.get().then((doc1) => {//Obtener los datos de cada alumno
                        this.estudiantes.push(doc1.get('nombre') + ' ' + doc1.get('apellido'));//Arreglo para guardar los nombres
                        this.fotosDePerfil.push(doc1.get('imagen'));//Arreglo para guardar las fotos
                        this.idChats.push(doc1.get('idchat'));//Arreglo para guardar los idchats
                      });
                    }
                  }
                }
              }
            });
          }
        });
      }
    });
  }

  enviarEstado() {
    this.estado=!this.estado;
    this.chatService.enviarEstado(this.estado);
  }

  irAlFinal() {
    this.content.nativeElement.scrollTop = this.content.nativeElement.scrollHeight;
  }

  sendMessage(id: any) {
    if (this.msg !== '') {
      this.afauth.authState.subscribe(user => {
        if (user) {//Obtener datos del usuario actual
          this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
            this.userData = doc.get('nombre') + ' ' + doc.get('apellido');
            this.imagen1 = doc.get('imagen');
            if (this.isPsicologo === true) {
              this.idchat = id;//Si es psicologo no tiene idchat por lo tanto se toma la que viene como parametro
            } else {
              this.idchat = doc.get('idchat');//Si es alumno se toma el idchat registrado
            }
            const cryptoInfo = CryptoJS.AES.encrypt(JSON.stringify(this.msg), 'saludmental').toString();//Cifrar mensaje
            this.chatService.sendMsgToFireBase(cryptoInfo, this.userData, this.idchat, this.imagen1);//Enviar datos al servicio
            this.msg = '';//Limpiar la variable msg
            this.onupdatechat(this.idchat);
          });
        }
      });
    }

  }

  fecha(f: any) {//Obtener la fecha
    const date = f.toDate();
    const anio = date.getFullYear();
    const mes = date.getMonth() + 1;
    const dia = date.getDate();
    const hora = date.getHours();
    const min = date.getMinutes();
    return dia + '/' + mes + '/' + anio + ' - ' + hora + ':' + min + 'hrs.';
  }

  onupdatechat(id: any) {
    this.idChatEstudiante = id;
    if (id == null || id == undefined) {
      id = this.idchat;
    }
    this.chatService.getChatRooms(id).subscribe(r => {//Obtener todos los mensajes del doc enviando el idchat
      this.imagen2 = [];
      this.miMensaje = [];//Limpiar array
      this.chatrooms = r;
      for (const msg of this.chatrooms.Messages) {//For para recorrer los mensajes del doc
        this.imagen2.push(msg.imagen);
        //Saber si el mensaje que se esta leyendo fue enviado por el usuario actual
        if (msg.user === this.user) {//Ej: estoy conectada a la cuenta de Gaby y el mensaje fue escrito por Gaby se guarda true
          this.miMensaje.push(true);
        } else {//Si el mensaje fue escrito por la psicologa se guarda false
          this.miMensaje.push(false);
        }
      }
    });
  }

  desencriptar(m: string) {//Descifrar el mensaje
    const info2 = CryptoJS.AES.decrypt(m.toString(), 'saludmental').toString(CryptoJS.enc.Utf8);
    const info1 = info2.replace('\\n', '');
    return info1.substring(1, info1.length - 1);//Cortar la cadena para que no aparezca el mensaje con ""
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
