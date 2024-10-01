import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: "app-form-candidates",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: "./form-candidates.component.html",
  styleUrl: "./form-candidates.component.css",
})
export class FormCandidatesComponent {
  private formBuilder = inject(FormBuilder);

  formOutput = output<FormGroup>();
  fileOutput = output<any>();

  protected form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    surname: ['', [Validators.required, Validators.minLength(3)]],
    file: ['', Validators.required],
  });
  
  public selectedFile!: any;

  public onFileSelected(event: Event): void {
    
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.fileOutput.emit(this.selectedFile);
    }
  }

  public onSubmit(): void {
    this.formOutput.emit(this.form);
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset();
  }

  public get candidateForm() {
    return this.form;
  }
}
