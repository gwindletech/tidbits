import { Component, inject, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-testsupa',
  standalone: true,
  imports: [],
  templateUrl: './testsupa.component.html',
  styleUrl: './testsupa.component.scss'
})
export class TestsupaComponent {

  supabase = inject(SupabaseService);
  
  randomRow = signal('');

  getRandomRow() {
    this.supabase.getFirstRow().subscribe((row) => {
      this.randomRow.set(row.content);
    }
    );
  }


}
