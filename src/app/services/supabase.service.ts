import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { from, map, Observable } from 'rxjs';
import { Tidbit } from '../interfaces/tidbit.interface';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;
  supabaseUrl: string = process.env['SUPABASE_URL'];
  supabaseKey: string = process.env['SUPABASE_KEY'];

  constructor() {
    // Initialize Supabase client using environment variables
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  get client() {
    return this.supabase;
  }

  addTidbit(tidbit: Tidbit): Observable<Tidbit> {
    console.log(tidbit);
    const promise = this.supabase.from('tidbits').insert(tidbit).select('*').single();
    return from(promise).pipe(map((response) => response.data));
  }

  getTidbits(): Observable<Tidbit[]> {
    const promise = this.supabase.from('tidbits').select('*');
    return from(promise).pipe(map((response) => response.data!));
  }

  deleteTidbit(id: number): Observable<Tidbit> {
    const promise = this.supabase.from('tidbits').delete().eq('id', id).select('*').single();
    return from(promise).pipe(map((response) => response.data));
  }

  getFilteredTidbits(tags: string[]): Observable<Tidbit[]> {
    const promise = this.supabase.from('tidbits').select('*').contains('tags', tags);
    return from(promise).pipe(map((response) => response.data!));
  }

}
