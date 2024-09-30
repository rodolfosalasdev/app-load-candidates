import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { first, retry } from 'rxjs';
import * as XLSX from 'xlsx';

import { ICreateCandidate } from '../../../_interfaces/create-candidate.interface';
import { CreateCandidateService } from '../../../_services/create-candidate.service';

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
  private service = inject(CreateCandidateService);

  // Usar um form reactive para melhor controle de validação
  protected form = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    surname: [null, [Validators.required, Validators.minLength(3)]],
    file: [null, Validators.required],
  });

  private params: ICreateCandidate = {
    name: '',
    surname: '',
    file: {
      seniority: '',
      years: 0,
      availability: false,
    },
  };
  
  public selectedFile!: File;

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.processExcelFile(this.selectedFile);
    }
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.params.name = this.form.get('name')?.value || '';
      this.params.surname = this.form.get('surname')?.value || '';
      
      this.createCandidates();
    } else {
      console.error('Form is invalid');
    }
  }

  private createCandidates(): void {
    this.service
      .createCandidate(this.params)
      .pipe(first(), retry(2)) // Melhor controle de operações assíncronas
      .subscribe({
        next: (response) => {
          console.log('Candidate created successfully:', response);
          this.resetForm();
        },
        error: (error) => {
          console.error('Error creating candidate:', error);
        },
      });
  }

  private processExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      this.extractExcelData(excelData);
    };
    reader.readAsArrayBuffer(file);
  }

  private extractExcelData(excelData: any[]): void {
    excelData.forEach((row: any) => {
      if (row[1]) {
        const value = row[1];
        if (typeof value === 'string') this.params.file.seniority = value;
        if (typeof value === 'number') this.params.file.years = value;
        if (typeof value === 'boolean') this.params.file.availability = value;
      }
    });
  }

  private resetForm(): void {
    this.form.reset();
  }
}
