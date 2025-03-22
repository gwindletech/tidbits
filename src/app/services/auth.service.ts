import { inject, Injectable, signal } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable } from 'rxjs';
import { AuthResponse } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  supabaseService = inject(SupabaseService);

  currentUser = signal<{ email: string, username: string} | null>(null);

  register(email: string, username: string, password: string): Observable<AuthResponse> {
    const promise = this.supabaseService.client.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });
    return from(promise);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const promise = this.supabaseService.client.auth.signInWithPassword({
      email,
      password,
    });
    return from(promise);
  }

  logout(): void {
    this.supabaseService.client.auth.signOut();
  }

}
