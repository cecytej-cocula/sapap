import { IcarruselItem } from '../../../Modelos/icarrusel.metadata';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {

  @Input() height = 500;
  @Input() isFullScreen = false;
  @Input() item: IcarruselItem[] = [];

  public finalHeight: string | number = 0;
  public currentPosition = 0;

  constructor() {
    this.finalHeight = this.isFullScreen ? '100vh' : `${this.height}px`;
  }

  ngOnInit(): void {
    this.item.map((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;

    let v = this.item.find(i => i.id === 0)?.marginLeft;
    if (v) {
      v = v - 100 * position;
    }
  }
  setNext() {
    let finalPorcent = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition <= this.item.length - 1) {
      finalPorcent = -100 * nextPosition;
    }
    else {
      nextPosition = 0;//regresar a la posicion 0
    }
    let v = this.item.find(i => i.id === 0)?.marginLeft;

    if (v) {
      v = finalPorcent;
    }
    this.currentPosition = nextPosition;
  }

  setBack() {
    let finalPercent = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercent = -100 * backPosition;
    }
    else {
      backPosition = this.item.length - 1;
      finalPercent = -100 * backPosition;
    }
    let v = this.item.find(i => i.id === 0)?.marginLeft;
    if (v) {
      v = finalPercent;
    }
    this.currentPosition = backPosition;
  }

}
