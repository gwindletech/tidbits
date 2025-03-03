import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { TidbitService } from '../services/tidbit.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-tidbit-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule],
  templateUrl: './tidbit-list.component.html',
  styleUrl: './tidbit-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TidbitListComponent implements OnInit {
  tidbitService = inject(TidbitService);
  supabaseService = inject(SupabaseService);

  tidbits = this.tidbitService.tidbits;

  ngOnInit(): void {
    this.supabaseService.getTidbits().subscribe((tidbits) => {
      this.tidbitService.tidbits.set(tidbits);
    })
  }
}
