import { Component } from '@angular/core';
import { TidbitCreateComponent } from './tidbit-create/tidbit-create.component';
import { TidbitListComponent } from './tidbit-list/tidbit-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TidbitCreateComponent, TidbitListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tidbits-two';
}
