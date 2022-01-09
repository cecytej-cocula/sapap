
import { Component, OnInit, ViewChild } from '@angular/core';


import { FormsModule } from '@angular/forms';

import { EntryFormComponent } from 'src/app/Forms/entry-form/entry-form.component';

@Component({
  selector: 'app-frase',
  templateUrl: './frase.component.html',
  styleUrls: ['./frase.component.scss']
})
export class FraseComponent implements OnInit {

  //VARIABLES globales
  public remit = "frase";
  @ViewChild('area') foco: any;
  public phrase: any;
  public description: string = '';
  public listOfObjects = [
    {
      name: 'obj - 1',
      edited: false
    }
  ];
  showMainContent: Boolean = false;
  config: any;
  collection = {
    count: 60, data: []
  }



  constructor() {

  }

  ngOnInit(): void {
  }

  //guardar frase 


  ShowHideButton() {
    this.showMainContent = this.showMainContent = true;
  }

}
