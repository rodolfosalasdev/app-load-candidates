import { Component } from '@angular/core';
import { FormCandidatesComponent } from './form-candidates/form-candidates.component';
import { CandidatesListComponent } from './condidates-list/candidates-list.component';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [FormCandidatesComponent, CandidatesListComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {

}
