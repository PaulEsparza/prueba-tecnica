import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../services/modal/modal.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LibraryService } from '../services/library/library.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  estatus: number = 0;
  calificacion: number = 0;
  title: string = "";
  cover: string = "";
  covers: string[] = [];
  @Output() saveData = new EventEmitter<any>();

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    private modalService: ModalService, @Inject(MAT_DIALOG_DATA) public data: any, private libraryService: LibraryService) {
    this.estatus = data.status;
    this.calificacion = data.score;
    this.title = data.title;
    //this.cover = data.cover;
    this.covers = data.covers;
    if (this.covers) {
      const coverUrl = `https://covers.openlibrary.org/b/id/${this.covers[0]}-S.jpg`;
      this.libraryService.getBookCover(coverUrl).subscribe((coverData) => {
        this.cover = URL.createObjectURL(coverData);
      });
    }
  }

  ngOnInit(): void { }

  closeModal() {
    this.dialogRef.close();
  }

  saveValues() {
    if (this.estatus < 0 || this.estatus > 100) {
      alert("El estatus de progreso debe estar entre los valores 0 y 100");
      return
    }
    if (this.calificacion < 0 || this.calificacion > 5) {
      alert("La calificación debe estar entre los valores 0 y 5");
      return
    }
    const data = {
      value1: this.estatus,
      value2: this.calificacion
    };

    this.modalService.sendData(data);
    this.dialogRef.close();
    //window.location.reload();
  }
}
