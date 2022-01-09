import { infotras } from './../../Modelos/infotras';

import { Phrase } from './../../Modelos/Phrase';
import { libro } from './../../Modelos/libro';
import { NgForm } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FraseServiceService } from 'src/app/Servicios/frase-service.service';


@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {

  @Input() valor: any;
  aux: string = "";
  showMainContent: Boolean = false;
  sieslibro: Boolean = false;
  esfrase: Boolean = false;
  esinfo: Boolean = false;
  inputPlaceholder: string = "new value";
  areaPlaceholder: string = "new value";

  constructor(private servicefrase: FraseServiceService) {

  }

  ngOnInit(): void {
    this.activeFrom();
    this.aux = this.valor
  }

  ShowHideButton() {
    this.showMainContent = this.showMainContent = true;

  }



  activeFrom() {
    switch (this.valor) {
      case 'frase':
        console.log(this.valor);
        this.fraseMétodos();
        break;
      case 'libros':
        this.librosMetodos();
        break;
      case 'tras':
        this.trasMetodos();
    }

    // const entryForms = {
    //   frase: () => fraseMetodos();
    // };
    // const entry = entryForms[valor];
  }

  trasMetodos() {
    this.areaPlaceholder = "Ingresa el contenido";
    this.inputPlaceholder = "Ingresa el titulo";
    this.esinfo = this.esinfo = true;
  }
  librosMetodos() {
    this.areaPlaceholder = "Ingresa descripcion o referencias";
    this.inputPlaceholder = "Ingresa el nombre del libro";
    this.sieslibro = this.sieslibro = true;
  }

  submitAction(entryForm: NgForm) {
    //metodo
    //this.sieslibro = this.sieslibro = false;
    if (this.esfrase) {
      this.savePhrase(entryForm);
    }
    else if (this.esinfo) {
      this.saveinfotras(entryForm);
    }

    entryForm.reset();

  }
  saveinfotras(infoForm: NgForm) {
    if (infoForm.invalid) {
      return
    }
    else {
      const { input, textarea } = infoForm.value;
      if (input != "") {
        if (textarea != "") {
          const i: infotras = {
            titulo: input,
            descripcion: textarea,
            //date: new Date()
          }
          //this.servicefrase.sendtrastornoToFirebase(i);
        }
      }
    }
  }
  //frases metodos
  fraseMétodos() {
    this.areaPlaceholder = "Ingresa tu mejor frase del dia";
    this.inputPlaceholder = "Ingresa el autor";
    this.esfrase = this.esfrase = true;
  }


  savePhrase(entryForm: NgForm) {
    if (entryForm.invalid) {
      return
    }
    else {
      const { input, textarea } = entryForm.value;
      if (input != "") {
        if (textarea != "") {
          const f: Phrase = {
            content: input,
            type: "text",
            date: new Date(),
            autor: textarea
          }
          console.log(input);
          console.log(textarea);
          this.servicefrase.sendPhraseToFirebase(f);
        }
      }
    }
  }

  deletePhrase(item: any) {
    //this.collection.data.pop(item);
  }


  //informacion metodos 


}
