import { Component } from '@angular/core';
import { TidbitCreateComponent } from './tidbit-create/tidbit-create.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TidbitCreateComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tidbits-two';
}
