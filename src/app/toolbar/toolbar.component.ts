import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  authService = inject(AuthService);
  
  logout(): void {
    this.authService.logout();
  }


}
