
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgForm, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from '@angular/material/input';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatDialogModule } from "@angular/material/dialog";
//components
import { LoginComponent } from './auth/login/login.component';
import { ToolbarComponent } from './Tabs/toolbar/toolbar.component';
import { PreguntaComponent } from './Tabs/pregunta/pregunta.component';
import { FraseComponent } from './Tabs/frase/frase.component';
import { PaginaPrincipalComponent } from './inicio/pagina-principal/pagina-principal.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { VerificarEmailComponent } from './auth/verificar-email/verificar-email.component';
import { EditarUserComponent } from './auth/editar-user/editar-user.component';
import { AddtrastornosComponent } from './Tabs/informacion/addtrastornos/addtrastornos.component';

import { ImagenesComponent } from './Tabs/informacion/imagenes/imagenes.component';
import { InfotransComponent } from './Tabs/SeccionInformacion/infotrans/infotrans.component';
import { LibrosComponent } from './Tabs/SeccionRecursos/libros/libros.component';
import { EntryFormComponent } from './Forms/entry-form/entry-form.component';
import { ForoComponent } from './Tabs/foro/foro.component';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
//firebase
import 'firebase/app';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
//environment
import { firebaseConf } from "../environments/environment";
import { ImagesComponent } from './Tabs/SeccionRecursos/images/images.component';
import { CambiarPasswordComponent } from './auth/cambiar-password/cambiar-password.component';
import { AddimagesComponent } from './Tabs/recursos/addimages/addimages.component';

import { HomeChatComponent } from './Chats/home-chat/home-chat.component';
import { DialogComponent } from './Tabs/dialog/dialog.component';
import { AgregarEntradaComponent } from './Tabs/agregar-entrada/agregar-entrada.component';
import { InfoPAPComponent } from './Tabs/SeccionInformacion/info-pap/info-pap.component';
import { InfoTecnicasComponent } from './Tabs/SeccionInformacion/info-tecnicas/info-tecnicas.component';
import { VideosComponent } from './Tabs/SeccionRecursos/videos/videos.component';
import { AgregarSugerenciaComponent } from './Tabs/agregar-sugerencia/agregar-sugerencia.component';
import { ContactosComponent } from './Tabs/contactos/contactos.component';
import { EdittrastornosComponent } from './Tabs/informacion/edittrastornos/edittrastornos.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { EliminarVideoComponent } from './Tabs/eliminar-video/eliminar-video.component';
import { AddAvisosComponent } from './Tabs/add-avisos/add-avisos.component';
import { EditarEntradaComponent } from './Tabs/editar-entrada/editar-entrada.component';


@NgModule({
  declarations: [
    AppComponent,
    FraseComponent,
    LoginComponent,
    PreguntaComponent,
    PaginaPrincipalComponent,
    ToolbarComponent,
    InfotransComponent,
    LibrosComponent,
    EntryFormComponent,
    ForoComponent,
    RegistrarComponent,
    ResetPasswordComponent,
    VerificarEmailComponent,
    EditarUserComponent,
    AddtrastornosComponent,
    ImagenesComponent,
    ImagesComponent,
    CambiarPasswordComponent,
    AddimagesComponent,
    HomeChatComponent,
    DialogComponent,
    AgregarEntradaComponent,
    InfoPAPComponent,
    InfoTecnicasComponent,
    VideosComponent,
    AgregarSugerenciaComponent,
    ContactosComponent,
    EdittrastornosComponent,
    EliminarVideoComponent,
    AddAvisosComponent,
    EditarEntradaComponent
  ],
  imports: [
    MatInputModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConf),
    AngularFireAuthModule, AngularFirestoreModule,
    NgImageSliderModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
