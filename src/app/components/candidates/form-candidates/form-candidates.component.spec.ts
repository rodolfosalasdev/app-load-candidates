import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormCandidatesComponent } from './form-candidates.component';

describe('FormCandidatesComponent', () => {
  let component: FormCandidatesComponent;
  let fixture: ComponentFixture<FormCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCandidatesComponent, HttpClientTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty and invalid fields', () => {
    const form = component.candidateForm;
    expect(form.valid).toBeFalsy();

    const nameInput = form.get('name');
    const surnameInput = form.get('surname');
    const fileInput = form.get('file');

    expect(nameInput?.value).toBe('');
    expect(surnameInput?.value).toBe('');
    expect(fileInput?.value).toBe('');
    expect(nameInput?.valid).toBeFalsy();
    expect(surnameInput?.valid).toBeFalsy();
    expect(fileInput?.valid).toBeFalsy();
  });

  it('should validate the "name" field', () => {
    const nameInput = component.candidateForm.get('name');
    nameInput?.setValue('Ro');
    expect(nameInput?.valid).toBeFalsy();

    nameInput?.setValue('Rodolfo');
    expect(nameInput?.valid).toBeTruthy();
  });

  it('should validate the "surname"', () => {
    const surnameInput = component.candidateForm.get('surname');
    surnameInput?.setValue('Ro');
    expect(surnameInput?.valid).toBeFalsy();

    surnameInput?.setValue('Rodolfo');
    expect(surnameInput?.valid).toBeTruthy();
  });  

  it('should output the file selected in "fileOutput"', () => {
    jest.spyOn(component.fileOutput, 'emit');
    
    const file = new File([''], 'test-file.txt', { type: 'text/plain' });
    
    const event = { target: { files: [file] } } as unknown as Event;
    component.onFileSelected(event);

    expect(component.selectedFile).toBe(file);
    expect(component.fileOutput.emit).toHaveBeenCalledWith(file);
  });

  it('should output the completed form in "formOutput" and reset the form after submitting', () => {
    const formOutputSpy = jest.spyOn(component.formOutput, 'emit');

    component.candidateForm.setValue({
      name: 'Rodolfo',
      surname: 'Salas',
      file: null
    });

    component.onSubmit();

    expect(formOutputSpy).toHaveBeenCalledWith(component.candidateForm);

    expect(component.candidateForm.value).toEqual({
      name: null,
      surname: null,
      file: null
    });

    expect(component.selectedFile).toBeNull();
  });
});
