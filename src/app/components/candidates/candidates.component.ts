import { Component, inject } from '@angular/core';
import { FormCandidatesComponent } from './form-candidates/form-candidates.component';
import { CandidatesListComponent } from './condidates-list/candidates-list.component';
import { FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { ICreateCandidate } from '../../_interfaces/create-candidate.interface';
import { CreateCandidateService } from '../../_services/create-candidate.service';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [FormCandidatesComponent, CandidatesListComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {
  private service = inject(CreateCandidateService);
  private file!: any
  private params: ICreateCandidate = {
    name: '',
    surname: '',
    file: {
      seniority: '',
      years: 0,
      availability: false,
    },
  };

  public formValidate(form: FormGroup) {
    if (form.valid) {
      this.params.name = form.get('name')?.value || '';
      this.params.surname = form.get('surname')?.value || '';
      this.createCandidates();
    } else {
      console.error('Form is invalid');
    }
  }

  private createCandidates(): void {
    this.service.createCandidate(this.params).subscribe({
      next: () => {
        this.service.getCandidates();
        this.file = null;
        this.params.file.availability = false;
      },
      error: (error) => {
        console.error('Error creating candidate:', error);
      },
    });
  }

  public processExcelFile(file: File): void {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      this.extractExcelData(excelData);
    };
    reader.readAsArrayBuffer(this.file);
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

}
