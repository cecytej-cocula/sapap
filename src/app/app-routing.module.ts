import { ForoComponent } from './Tabs/foro/foro.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FraseComponent } from './Tabs/frase/frase.component';
import { PaginaPrincipalComponent } from './inicio/pagina-principal/pagina-principal.component';
import { InfotransComponent } from './Tabs/SeccionInformacion/infotrans/infotrans.component';
import { LibrosComponent } from './Tabs/SeccionRecursos/libros/libros.component';
import { EntryFormComponent } from './Forms/entry-form/entry-form.component';
import { PreguntaComponent } from './Tabs/pregunta/pregunta.component';
import { RegistrarComponent } from './auth/registrar/registrar.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { NologinGuard } from './guards/nologin.guard';
import { AuthGuard } from './guards/auth.guard';
import { VerificarEmailComponent } from './auth/verificar-email/verificar-email.component';
import { EditarUserComponent } from './auth/editar-user/editar-user.component';
import { AddtrastornosComponent } from './Tabs/informacion/addtrastornos/addtrastornos.component';

import { ImagesComponent } from './Tabs/SeccionRecursos/images/images.component';
import { ImagenesComponent } from './Tabs/informacion/imagenes/imagenes.component';
import { CambiarPasswordComponent } from './auth/cambiar-password/cambiar-password.component';
import { AddimagesComponent } from './Tabs/recursos/addimages/addimages.component';
import { HomeChatComponent } from './Chats/home-chat/home-chat.component';
import { AgregarEntradaComponent } from './Tabs/agregar-entrada/agregar-entrada.component';
import { InfoPAPComponent } from './Tabs/SeccionInformacion/info-pap/info-pap.component';
import { InfoTecnicasComponent } from './Tabs/SeccionInformacion/info-tecnicas/info-tecnicas.component';
import { ContactosComponent } from './Tabs/contactos/contactos.component';
import { VideosComponent } from './Tabs/SeccionRecursos/videos/videos.component';
import { EliminarVideoComponent } from './Tabs/eliminar-video/eliminar-video.component';
import { AddAvisosComponent } from './Tabs/add-avisos/add-avisos.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NologinGuard] },
  { path: 'home-chat', component: HomeChatComponent },
  { path: 'addimages', component: AddimagesComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'imagenes', component: ImagenesComponent },
  { path: 'eliminarVideo', component: EliminarVideoComponent },
  { path: 'addtrastornos', component: AddtrastornosComponent },
  { path: 'registrarse', component: RegistrarComponent, canActivate: [NologinGuard] },
  { path: 'resetPassword', component: ResetPasswordComponent, canActivate: [NologinGuard] },
  { path: 'verificarEmail', component: VerificarEmailComponent },
  { path: 'pregunta', component: PreguntaComponent },
  { path: 'foro', component: ForoComponent, canActivate: [AuthGuard] },
  { path: 'entry-form', component: EntryFormComponent },
  { path: 'libros', component: LibrosComponent },
  { path: 'infotrans', component: InfotransComponent },
  { path: 'infopap', component: InfoPAPComponent },
  { path: 'infotecnicas', component: InfoTecnicasComponent },
  { path: 'editarPerfil', component: EditarUserComponent },
  { path: 'cambiarPassword', component: CambiarPasswordComponent },
  { path: 'pagina-principal', component: PaginaPrincipalComponent },
  { path: 'frase', component: FraseComponent },
  { path: 'crearEntrada', component: AgregarEntradaComponent },
  { path: 'contactos', component: ContactosComponent },
  { path: 'videos', component: VideosComponent },
  { path: 'avisos', component: AddAvisosComponent },
  { path: '', redirectTo: 'pagina-principal', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
