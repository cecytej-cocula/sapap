import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  verificarCorreo() {
    this.authSvc.login(this.email, this.password);
  }
}
