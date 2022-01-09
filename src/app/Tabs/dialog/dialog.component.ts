import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/Modelos/DialogData';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  content!: string;
  title!: string;
  link!:string;
  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dataD: DialogData) {
    this.title = this.dataD.libro;
    this.content = this.dataD.descripcion;
    this.link=this.dataD.link;
  }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
