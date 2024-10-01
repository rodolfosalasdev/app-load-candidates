import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesListComponent } from './candidates-list.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('CondidatesListComponent', () => {
  let component: CandidatesListComponent;
  let fixture: ComponentFixture<CandidatesListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesListComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
