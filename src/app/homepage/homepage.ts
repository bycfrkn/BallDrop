import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {
onSceneClick(event: MouseEvent) {
  const element = event.target as HTMLElement;
  console.log("Tıklandığı yer:", event.clientX, event.clientY);
}

}
