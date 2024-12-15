import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PixeltabelComponent } from './components/pixeltabel/pixeltabel.component';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PixeltabelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pxl-artisan';
  rows:number=8;
  cols:number=8;


  captureDivAsImage(): void {
    const divElement = document.getElementById('capture-area'); // ID of the div you want to capture

    if (divElement) {
      html2canvas(divElement).then((canvas) => {
        // Convert canvas to data URL
        const imageData = canvas.toDataURL('image/png');

        // Create a download link
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'captured-image.png';

        // Trigger download
        link.click();
      }).catch((error) => {
        console.error('Error capturing the div:', error);
      });
    } else {
      console.error('Div with specified ID not found!');
    }
  }

}
