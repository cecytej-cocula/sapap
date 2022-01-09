import { AuthService } from 'src/app/Servicios/auth.service';

import { OnInit } from '@angular/core';
export class images implements OnInit {
    public image: any[] = [];
    constructor(private authservce: AuthService) { }

    ngOnInit() {
        this.authservce.getImagenes().subscribe(resp => {
            if (resp) {
                resp.forEach((element: any) => {
                    this.image.push = element.get("url");
                });
            }
        })
    }




}
