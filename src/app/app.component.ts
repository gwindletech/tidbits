import { Component } from '@angular/core';
import { TestsupaComponent } from './testsupa/testsupa.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TestsupaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tidbits-two';
}
