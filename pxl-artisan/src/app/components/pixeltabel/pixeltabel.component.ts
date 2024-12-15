import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pixeltabel',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pixeltabel.component.html',
  styleUrl: './pixeltabel.component.css'
})
export class PixeltabelComponent {
  @Input() rowCount: number = 5; // Default row count
  @Input() columnCount: number = 5; // Default column count
  rows: number[] = [];
  columns: number[] = [];

  ngOnInit(): void {
    this.rows = Array.from({ length: this.rowCount }, (_, i) => i);
    this.columns = Array.from({ length: this.columnCount }, (_, i) => i);
  }

  addColor(idxRow: number, idxCol: number): void {
    const hexColor="#FF5733"
    const cellID = this.getCellID(idxRow, idxCol);
    const cell = document.getElementById(cellID);
  
    if (cell) {
      console.log("setting cellId with FFF",cellID)
      cell.style.backgroundColor = hexColor; // Sets or updates the background color
    } else {
      console.error(`Cell with ID ${cellID} not found`);
    }
  }
  

  getCellID(idxRow:number,idxCol:number):string{
   return "_"+idxRow+"_"+idxCol+"_";
  }
}
