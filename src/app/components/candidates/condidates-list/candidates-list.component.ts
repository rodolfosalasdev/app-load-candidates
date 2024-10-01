import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { ICandidatesListResponse } from '../../../_interfaces/candidates-liste-response.interface';
import { CreateCandidateService } from '../../../_services/create-candidate.service';

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [MatTableModule, CommonModule],
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent implements OnInit {
  private service = inject(CreateCandidateService);
  public candidates: ICandidatesListResponse[] = [];
  public displayedColumns: string[] = ['name', 'seniority', 'years', 'availability'];

  ngOnInit(): void {
    this.service.candidates$.subscribe(candidates => {
      this.candidates = candidates;
    });
  }
}
