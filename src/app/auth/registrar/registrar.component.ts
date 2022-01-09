import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  name!:string;
  lastName!:string;
  email!:string;
  password!:string;
  
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){
    this.authSvc.registrar(this.name, this.lastName, this.email, this.password)
  }
}
