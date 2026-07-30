import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  mouseX = 0;
mouseY = 0;

logoTransform = '';
cardLeftTransform = '';
cardRightTransform = '';


mouseMove(event: MouseEvent){

  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;


  this.logoTransform = `
    rotateY(${x * 25}deg)
    rotateX(${y * -25}deg)
    translate(${x * 20}px, ${y * 20}px)
  `;


  this.cardLeftTransform = `
    translate(${x * 50}px, ${y * 40}px)
    rotate(${x * 5}deg)
  `;


  this.cardRightTransform = `
    translate(${x * -50}px, ${y * -40}px)
    rotate(${x * -5}deg)
  `;

}



resetMouse(){

  this.logoTransform = '';

  this.cardLeftTransform = '';

  this.cardRightTransform = '';

}
}
