import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { from, Observable } from 'rxjs';
import { AuthResponse } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  supabaseService = inject(SupabaseService);

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

}
