import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { AvailabilityPipe } from '../../../_pipes/availability-pipe.pipe';
import { CreateCandidateService } from '../../../_services/create-candidate.service';

@Component({
  selector: 'app-candidates-list',
  standalone: true,
  imports: [MatTableModule, CommonModule, AvailabilityPipe],
  templateUrl: './candidates-list.component.html',
  styleUrl: './candidates-list.component.css'
})
export class CandidatesListComponent implements OnInit {
  private service = inject(CreateCandidateService);
  public displayedColumns: string[] = ['name', 'seniority', 'years', 'availability'];
  public candidates = this.service.candidatesSignal;

  ngOnInit(): void {
    this.service.getCandidates();
  }
}
