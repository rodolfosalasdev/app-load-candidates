import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-candidates',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './form-candidates.component.html',
  styleUrl: './form-candidates.component.css' 
})

export class FormCandidatesComponent {

  public file!: File;
  private formBuilder = inject(FormBuilder);

  protected form = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    surname: [null, [Validators.required, Validators.minLength(3)]],
    file: [null, Validators.required]
  });

  private clearFormValues(): void {
    this.form.controls['name'].setValue(null);
    this.form.controls['surname'].setValue(null);
    this.form.controls['file'].setValue(null);
  }

  public onSubmit(formValues: any): void {
    const params = {
      form: formValues,
      file: this.file
    }
    console.log(params);
    this.clearFormValues();
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.file = input.files[0];
    }
  }

}
