import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { SharedModule } from '../SharedModule';
import { Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface Ball {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocity: number;
}

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage implements OnInit {

private ballChange=new Subject<Ball>();

 ballChange$ = this.ballChange.asObservable();

  notifyBallChange(ball:Ball) {
  this.ballChange.next(ball);
  }

  gravity = 0;
  width = 0;
  height = 0;
  animationId?: number;
  ball: Ball | null = null; 

  ngOnInit(): void {
  if (typeof window !== 'undefined') {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.gravity = this.height / 1000;

    this.ballChange$.subscribe((res) => {
      this.ball = res;
    });
  }
  }

  onSceneClick(event: MouseEvent) {
    const x = event.clientX;
    const y = event.clientY;


    this.ball = {
      x,
      y,
      radius: 30,
      color: this.getRandomColor(),
      velocity: 0
    };

    this.animateBall();
  }

getBall(){
  return this.ball?.y
}


  animateBall() {
    if (!this.ball) return;

    const fall = () => {
      if (!this.ball) return;

      this.ball.velocity += this.gravity;
      this.ball.y += this.ball.velocity;
    

      if (this.ball.y + this.ball.radius >= this.height) {
        this.ball.y = this.height - this.ball.radius;
        this.notifyBallChange(this.ball)
         cancelAnimationFrame(this.animationId!);
      console.log('Animasyon durdu ✅');
      return;
      }
      this.notifyBallChange(this.ball)
      
    this.animationId = requestAnimationFrame(fall);
    };

  this.animationId =  requestAnimationFrame(fall);
  }

  getRandomColor(): string {
    const colors = ['#ff6b6b', '#6bc5ff', '#ffd93d', '#6be5b7', '#c26bff'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
