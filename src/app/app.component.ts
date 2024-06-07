import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HierarchyComponent } from './Components/hierarchy/hierarchy.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HierarchyComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
