import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Servicios/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  userEmail!:string;
  
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  restablecer(){
    this.authSvc.restablecer(this.userEmail);
  }

}
