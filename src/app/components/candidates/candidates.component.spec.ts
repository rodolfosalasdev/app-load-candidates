import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatesComponent } from './candidates.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CandidatesService } from '../../_services/candidates.service';
import { of, throwError } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('CandidatesComponent', () => {
  let component: CandidatesComponent;
  let fixture: ComponentFixture<CandidatesComponent>;
  let httpMock: HttpTestingController;
  let candidatesService: CandidatesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatesComponent, HttpClientTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = TestBed.inject(HttpTestingController);
    candidatesService = TestBed.inject(CandidatesService);
  });
  afterEach(() => {
    candidatesService.clearCandidates();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form and call the candidate creation function if it is valid', () => {
    const formBuilder = new FormBuilder();
    const validForm: FormGroup = formBuilder.group({
      name: ['Rodolfo', Validators.required],
      surname: ['Salas', Validators.required],
      file: [new File([], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), Validators.required]
    });
  
    const createCandidatesSpy = jest.spyOn(component as any, 'createCandidates');
  
    component.formValidate(validForm);
  
    expect(createCandidatesSpy).toHaveBeenCalled();
  });

  it('should call next inside createCandidates and execute subsequent actions', () => {
    const createCandidateSpy = jest.spyOn(candidatesService, 'createCandidate')
      .mockReturnValue(of({
      name: '',
      surname: '',
      file: {
        seniority: '',
        years: 0,
        availability: false
      }
    }));
    const getCandidatesSpy = jest.spyOn(candidatesService, 'getCandidates');
  
    component['createCandidates']();
  
    expect(createCandidateSpy).toHaveBeenCalledWith(component['params']);
    expect(getCandidatesSpy).toHaveBeenCalled();
    expect(component['file']).toBeNull();
    expect(component['params'].file.availability).toBe(false);
  });
  
  it('should not call the candidate creation function if the form is invalid', () => {
    const formBuilder = new FormBuilder();
    const invalidForm: FormGroup = formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      file: [null, Validators.required]
    });

    const createCandidatesSpy = jest.spyOn(component as any, 'createCandidates');
    component.formValidate(invalidForm);

    expect(createCandidatesSpy).not.toHaveBeenCalled();
  });
  
  it('should handle errors when creating candidates', () => {
    jest.spyOn(candidatesService, 'createCandidate').mockReturnValue(throwError(() => new Error('Erro ao criar candidato')));

    const errorSpy = jest.spyOn(console, 'error');
    component['createCandidates']();

    expect(errorSpy).toHaveBeenCalledWith('Error creating candidate:', expect.any(Error));
  });

  it('should process the Excel file and extract the data correctly', () => {
    const file = new File([], 'test.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const readAsArrayBufferSpy = jest.spyOn(FileReader.prototype, 'readAsArrayBuffer').mockImplementation(function (this: FileReader) {
      const event = { target: { result: new ArrayBuffer(8) } } as ProgressEvent<FileReader>;
      this.onload!(event);
    });

    const extractExcelDataSpy = jest.spyOn(component as any, 'extractExcelData');
    component.processExcelFile(file);

    expect(readAsArrayBufferSpy).toHaveBeenCalledWith(file);
    expect(extractExcelDataSpy).toHaveBeenCalled();
  });

  it('should extract the correct data from the Excel file', () => {
    const excelData = [
      ['seniority', 'senior'],
      ['years', 5],
      ['availability', true]
    ];

    component['extractExcelData'](excelData);

    expect(component['params'].file.seniority).toBe('senior');
    expect(component['params'].file.years).toBe(5);
    expect(component['params'].file.availability).toBe(true);
  });
});
