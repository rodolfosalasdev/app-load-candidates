import { Component, inject } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { CreateCandidateService } from "../../../_services/create-candidate.service";
import * as XLSX from "xlsx";
import { first, retry } from "rxjs";

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
  public params: any = {
    name: "",
    surname: "",
    file: {
      seniority: "",
      years: 0,
      availability: false,
    },
  };
  public selectedFile!: File;
  private formBuilder = inject(FormBuilder);
  private service = inject(CreateCandidateService);

  protected form = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3)]],
    surname: [null, [Validators.required, Validators.minLength(3)]],
    file: [null, Validators.required],
  });

  private clearFormValues(): void {
    this.form.controls["name"].setValue(null);
    this.form.controls["surname"].setValue(null);
    this.form.controls["file"].setValue(null);
  }

  public onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
    this.createPayloadToExcel();
  }

  public onSubmit(formValues: any): void {
    this.params.name = formValues?.name;
    this.params.surname = formValues?.surname;

    this.createCandidates();
  }

  private createCandidates() {
    this.service
      .createCandidate(this.params)
      .pipe(first(), retry(2))
      .subscribe({
        next: (response) => {
          console.log("POST: ", response);
          this.clearFormValues();
        },
        error: (error) => {
          console.error("Error fetching candidates: ", error);
        },
        complete: () => {
          console.log("POST request completed.");
        },
      });
  }

  private createPayloadToExcel() {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      excelData.forEach((item: any) => {
        if (item[1]) {
          if (typeof item[1] === "string") {
            this.params.file.seniority = item[1];
          }
          if (typeof item[1] === "number") {
            this.params.file.years = item[1];
          }
          if (typeof item[1] === "boolean") {
            this.params.file.availability = item[1];
          }
        }
      });
    };
    reader.readAsArrayBuffer(this.selectedFile);
  }
}
