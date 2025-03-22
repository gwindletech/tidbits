import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { TidbitCreateComponent } from './tidbit-create/tidbit-create.component';
import { TidbitListComponent } from './tidbit-list/tidbit-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TidbitCreateComponent, TidbitListComponent, ToolbarComponent, CommonModule, RouterLink, RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  
  ngOnInit(): void {
    this.authService.supabaseService.client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.authService.currentUser.set({
          email: session?.user.email!,
          username:
            session?.user.identities?.at(0)?.identity_data?.['username'],
        });
      } else if ( event === 'SIGNED_OUT') {
        this.authService.currentUser.set(null)
      }
      
    })
  }

  logout(): void {
    this.authService.logout();
  }

}
