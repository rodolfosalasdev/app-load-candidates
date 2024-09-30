import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCandidatesComponent } from './form-candidates.component';

describe('FormCandidatesComponent', () => {
  let component: FormCandidatesComponent;
  let fixture: ComponentFixture<FormCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCandidatesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
