import { map } from 'rxjs/operators';
import { Imagenes } from './../Modelos/TSS/url';
import { Observable } from 'rxjs';
import { imagenmodel } from './../Modelos/imagenmodel';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  idchat!: string;
  path!: string;
  nameNew!: string;
  lastNameNew!: string;
  email!: string;
  id: any;
  public urlList: Observable<Imagenes[]> | undefined;
  private imagenescollection: AngularFirestoreCollection<Imagenes> | undefined;

  constructor(private afauth: AngularFireAuth,
    private ruta: Router,
    private db: AngularFirestore) {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.get().then((doc) => {
          this.nameNew = doc.get("nombre");
          this.lastNameNew = doc.get("apellido");
        });
      }
    });

    this.getImagenes();
  }

  login(email: string, password: string) {
    this.email = email;
    this.afauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        const uid = res.user?.uid;
        localStorage.setItem("iduser", JSON.stringify(uid));
        this.db.collection('Usuarios').doc(uid).valueChanges()
        this.ruta.navigate(['/pagina-principal']);
      }).catch(err => alert('Los datos son incorrectos o no existe el usuario'));

  }

  registrar(name: string, lastName: string, email: string, password: string) {
    this.afauth.createUserWithEmailAndPassword(email, password).then(
      res => {
        const uid = res.user?.uid;
        this.db.collection('Chat').add({ iduser: uid }).then(docRef => {
          this.idchat = docRef.id;
        }).then(doc => {
          console.log('entra');
          this.db.collection('Usuarios').valueChanges().subscribe(values => {
            if (values.length == 1) {
              this.db.collection('Usuarios').doc(uid).set({
                nombre: name,
                apellido: lastName,
                correo: email,
                uid: uid,
                rol: 'psicologo',
                imagen: 'https://firebasestorage.googleapis.com/v0/b/sapap-6675a.appspot.com/o/usuario.jpg?alt=media&token=5bc28e13-da1d-48ea-bdcb-0854d34dc70d',
                idchat: this.idchat
              });
            } else {
              this.db.collection('Usuarios').doc(uid).set({
                nombre: name,
                apellido: lastName,
                correo: email,
                uid: uid,
                rol: 'alumno',
                imagen: 'https://firebasestorage.googleapis.com/v0/b/sapap-6675a.appspot.com/o/usuario.jpg?alt=media&token=5bc28e13-da1d-48ea-bdcb-0854d34dc70d',
                idchat: this.idchat
              });
            }
          });
        }).then((doc)=>{
          this.ruta.navigate(['/pagina-principal']).then((doc)=>{
            window.location.reload();
          });
        });
      }).catch(err => alert('Ocurrio un error ' + err));

  }

  restablecer(email: string) {
    this.afauth.sendPasswordResetEmail(email)
      .then(res => {
        alert('Se envio un correo electronico para restablecer la contraseña')
        this.ruta.navigate(['/login']);
      }).catch(err => alert('Ocurrio un error ' + err));
  }

  reenviar() {
    this.afauth.currentUser.then(r => r?.sendEmailVerification());
  }

  logout() {
    this.afauth.signOut();
  }

  editar(name: string, lastName: string) {
    if (name != this.nameNew) {
      this.afauth.authState.subscribe(user => {
        if (user) {
          this.db.collection('Usuarios').doc(user.uid).ref.update({ nombre: name });
        }
      });
    }
    if (lastName != this.lastNameNew) {
      this.afauth.authState.subscribe(user => {
        if (user) {
          this.db.collection('Usuarios').doc(user.uid).ref.update({ apellido: lastName });
        }
      });
    }
    alert('Los datos se han actualizado');
    window.location.reload();
  }

  image(img: string) {
    this.afauth.authState.subscribe(user => {
      if (user) {
        this.db.collection('Usuarios').doc(user.uid).ref.update({ imagen: img });
      }
    });
  }

  getemail() {
    let temp = this.email;
    return temp;
  }

  getImagenes() {
    return this.db.collection('Imagenes').doc('RZcmZXolmmH4CHdYXEKJ').valueChanges();
  }

  imagenes(url: any) {
    const i={
      url: url!=null?url:''
    }
    this.db.collection('Imagenes').doc('RZcmZXolmmH4CHdYXEKJ').update({
      Imagen: firebase.firestore.FieldValue.arrayUnion(i)
    });
  }

  cambiar(password: string) {
    this.afauth.currentUser.then(r => r?.updatePassword(password));
    alert('La contraseña se ha actualizado, inicia sesión de nuevo');
    this.afauth.signOut();
    this.ruta.navigate(['/login']);
  }

}