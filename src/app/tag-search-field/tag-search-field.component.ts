import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { SupabaseService } from '../services/supabase.service';
import { TidbitService } from '../services/tidbit.service';
import { effect } from '@angular/core';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-tag-search-field',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule],
  templateUrl: './tag-search-field.component.html',
  styleUrl: './tag-search-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSearchFieldComponent {

  supabaseService = inject(SupabaseService);
  tidbitService = inject(TidbitService);

  readonly addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  readonly tags = signal<Tag[]>([]);
  readonly tagsToSearch = computed<string[]>(() => this.tags().map(tag => tag.name));
  readonly announcer = inject(LiveAnnouncer);

  constructor() {
    // Automatically trigger searchTags when tagsToSearch updates
    effect(() => {
      this.searchTags();
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our tag
    if (value) {
      this.tags.update(tags => [...tags, { name: value }]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index < 0) {
        return tags;
      }

      tags.splice(index, 1);
      this.announcer.announce(`Removed ${tag.name}`);
      return [...tags];
    });
  }

  edit(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove tag if it no longer has a name
    if (!value) {
      this.remove(tag);
      return;
    }

    // Edit existing tag
    this.tags.update(tags => {
      const index = tags.indexOf(tag);
      if (index >= 0) {
        tags[index].name = value;
        return [...tags];
      }
      return tags;
    });
  }

  searchTags(): void {
    this.supabaseService.getFilteredTidbits(this.tagsToSearch()).subscribe((tidbits) => {
      this.tidbitService.tidbits.set(tidbits);
    });
  }
}
