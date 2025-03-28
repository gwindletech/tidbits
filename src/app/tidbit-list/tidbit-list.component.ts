import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { TidbitService } from '../services/tidbit.service';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { TagSearchFieldComponent } from '../tag-search-field/tag-search-field.component';

@Component({
  selector: 'app-tidbit-list',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatChipsModule, MatButtonModule, MatDividerModule, MatIconModule, TagSearchFieldComponent],
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

  deleteTidbit(id: number) {
    this.tidbitService.deleteTidbit(id);
  }
}
