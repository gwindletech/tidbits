import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { from, map, Observable } from 'rxjs';
import { Tidbit } from '../types/tidbit.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Initialize Supabase client using environment variables
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey);
  }

  addTidbit(tidbit: Tidbit): Observable<Tidbit> {
    console.log(tidbit);
    const promise = this.supabase.from('tidbits').insert(tidbit).select('*').single();
    return from(promise).pipe(map((response) => response.data));
  }
}