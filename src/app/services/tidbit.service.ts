import { inject, Injectable, signal } from '@angular/core';
import { Tidbit } from '../interfaces/tidbit.interface';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class TidbitService {

  tidbits = signal<Tidbit[]>([]);

  supabaseService = inject(SupabaseService);

}
