import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { from, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Initialize Supabase client using environment variables
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  getFirstRow(): Observable<any> {
    const promise = this.supabase.from('tidbits').select('*').match({ id: 1 }).single();
    return from(promise).pipe(map((response) => response.data));
  }

}