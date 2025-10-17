import { Component, OnInit } from '@angular/core';
import { Ball } from '../model/Ball';
import { SharedModule } from '../SharedModule';

@Component({
  selector: 'app-homepage',
  imports: [SharedModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit {

  gravity: number = 0;
  width: number = 0;
  height: number = 0;

  balls: Ball[] =[]

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.gravity = this.height / 3000; 

    console.log('Sayfa genişliği:', this.width);
    console.log('Sayfa yüksekliği:', this.height);
    console.log('Gravity:', this.gravity);
  }

  onSceneClick(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;

    const newBall: Ball = {
      x,
      y,
      radius: 50,
      color: this.getRandomColor(),
      velocity: 0
    };

    this.balls.push(newBall);
    this.animateBall(newBall);
  }

  animateBall(ball: Ball) {
    const fall = () => {
      ball.velocity += this.gravity;     
      ball.y += ball.velocity;           

      
      if (ball.y + ball.radius >= this.height) {
        ball.y = this.height - ball.radius;
        ball.velocity *= -0.7; 
      }
      this.balls.push(ball)
      requestAnimationFrame(fall);
    };

    requestAnimationFrame(fall);
  }

  getRandomColor(): string {
    const colors = ['#ff6b6b', '#6bc5ff', '#ffd93d', '#6be5b7', '#c26bff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
