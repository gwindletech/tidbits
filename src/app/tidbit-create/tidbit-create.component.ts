import { ChangeDetectionStrategy, Component, inject, ViewChild } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { TidbitService } from '../services/tidbit.service';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-tidbit-create',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule, MatIconModule, ReactiveFormsModule],
  templateUrl: './tidbit-create.component.html',
  styleUrl: './tidbit-create.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TidbitCreateComponent {
  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  supabaseService = inject(SupabaseService);
  tidbitService = inject(TidbitService);

  tidbits = this.tidbitService.tidbits;

  tidbitForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tidbitForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      tags: ['']
    })
  }

  onSubmit() {
    this.supabaseService.addTidbit({ title: this.tidbitForm.value.title, content: this.tidbitForm.value.content, tags: this.tidbitForm.value.tags }).subscribe((tidbit) => {
      this.tidbitService.tidbits.set([...this.tidbits(), tidbit]);
      this.formGroupDirective.resetForm();
    });
  }
}
