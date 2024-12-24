import { Component, Directive, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PixeltabelComponent } from './components/pixeltabel/pixeltabel.component';
import html2canvas from 'html2canvas';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { color } from 'html2canvas/dist/types/css/types/color';

@Directive({
  selector: "[click-stop-propagation]",
  standalone: true
})
export class ClickStopPropagationDirective
{
  @HostListener("click", ["$event"])
  public onClick(event: any): void
  {
    event.stopPropagation();
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PixeltabelComponent,
    NgClass,
    FormsModule,
    NgFor,
    NgStyle
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pxl-artisan';
  rows: number = 8;
  cols: number = 8;

  colors: string[] = ['#ff006f', '#6ad26a', '#8080e5']; // Initial colors
  selectedColorIndex: number  = 0; // Index of the selected color

  captureDivAsImage(): void {
    const divElement = document.getElementById('capture-area'); // ID of the div you want to capture
  
    if (divElement) {
      // Clone the div
      const clonedDiv = divElement.cloneNode(true) as HTMLElement;
  
      // Apply Polaroid-like styling using Tailwind classes
      const polaroidWrapper = document.createElement('div');
      polaroidWrapper.className = 'bg-white rounded-lg shadow-lg flex flex-col items-center';
  
      // Apply small padding to top and sides, larger padding to bottom
      polaroidWrapper.classList.add('p-4', 'pb-16'); // Small padding (p-4) and large bottom padding (pb-16)
  
      // Remove spacing, borders, and rounded corners, and upscale cell size
      clonedDiv.querySelectorAll('.flex').forEach((row) => {
        row.classList.remove('gap-1'); // Remove spacing between cells
      });
  
      clonedDiv.querySelectorAll('.border').forEach((cell) => {
        cell.classList.remove('border', 'border-gray-400', 'border-opacity-70', 'rounded-lg'); // Remove borders and rounded corners
        cell.classList.add('w-16', 'h-16', 'sm:w-24', 'sm:h-24'); // Upscale cell size for higher resolution
      });
  
      // Center the grid (representing the photo)
      clonedDiv.classList.add('flex', 'justify-center');
      clonedDiv.classList.remove('gap-1');
      polaroidWrapper.appendChild(clonedDiv);
  
      // Add a thin border above the logo
      const borderSeparator = document.createElement('div');
      borderSeparator.className = 'w-full border-t border-gray-300 mt-4'; // Thin top border with margin
      polaroidWrapper.appendChild(borderSeparator);
  
      // Add the "pxl.artisan " logo text

      const artisanHTML = `
      <div class="flex items-center justify-between space-x-2">
        <span>
          <img src="../assets/svg/love.svg" class="h-4 md:h-7 w-4 md:w-7 relative top-[0.8em]">
        </span>
        <span class="text-lg md:text-2xl font-semibold text-text relative top-[-0.2em]" id="logo-text">
          pxl<span class="relative top-[-0.1em] text-3xl">.</span>artisan
        </span>
      </div>

    `;

    // Create a container div and set the HTML
    const artisanContainer = document.createElement('div');
    artisanContainer.innerHTML = artisanHTML;

    // Append it to the parent container
    polaroidWrapper.appendChild(artisanContainer);

  
      // Add a timestamp below the "pxl.artisan" text
      const timestamp = document.createElement('div');
      timestamp.innerText = `Created On: ${new Date().toLocaleString()}`;
      timestamp.className = 'text-center mt-2 text-sm text-gray-700'; // Add spacing and style
      polaroidWrapper.appendChild(timestamp);
  
      // Temporarily add the cloned div to the DOM
      const wrapper = document.createElement('div');
      wrapper.className = 'flex justify-center items-center bg-gray-100'; // Fullscreen wrapper for alignment
      wrapper.appendChild(polaroidWrapper);
      document.body.appendChild(wrapper);
  
      // Use html2canvas to capture the styled wrapper
      html2canvas(polaroidWrapper, { scale: 2 }).then((canvas) => {
        // Convert canvas to data URL
        const imageData = canvas.toDataURL('image/png');
  
        // Create a download link
        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'my-pxl-art.png';
  
        // Trigger download
        link.click();
  
        // Clean up: Remove the temporary wrapper
        document.body.removeChild(wrapper);
      }).catch((error) => {
        console.error('Error capturing the div:', error);
      });
    } else {
      console.error('Div or logo element with specified ID not found!');
    }
  }
  
  
  
  
  onColorChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    const newColor = inputElement.value; // Get the updated color value
    this.colors[index] = newColor; // Update the color in the array
    console.log(`Updated color at index ${index}:`, newColor);
  }
  

  addColorSwatch(): void {
    this.colors.push('#1d9645'); // Add a default white color
  }

  updateSelectedColor(index: number): void {
    console.log("colors:",this.colors)
    this.selectedColorIndex = index; // Update the selected color index
    console.log("this.selectedColorIndex:",this.selectedColorIndex)
    console.log("color at index : ",this.colors[this.selectedColorIndex])
  }

  currentColor():string{
    return this.colors[this.selectedColorIndex]
  }
}
