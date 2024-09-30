import { Component } from '@angular/core';
import { FormCandidatesComponent } from './form-candidates/form-candidates.component';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [FormCandidatesComponent],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {

}
