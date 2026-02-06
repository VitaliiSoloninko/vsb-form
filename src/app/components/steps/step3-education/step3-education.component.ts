import {
  Component,
  computed,
  effect,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { EducationData } from '../../../models/form-data.models';

@Component({
  selector: 'app-step3-education',
  standalone: true,
  imports: [ReactiveFormsModule, IonItem, IonLabel, IonSelect, IonSelectOption],
  templateUrl: './step3-education.component.html',
  styleUrls: ['./step3-education.component.scss'],
})
export class Step3EducationComponent implements OnInit {
  private fb = new FormBuilder();

  formValid = output<boolean>();
  formData = output<EducationData>();
  formTouched = signal(false);

  formGroup!: FormGroup;
  isValid = computed(() => this.formGroup?.valid ?? false);

  schoolTypes = [
    { value: '9classes', label: '9 Classes' },
    { value: '10classes', label: '10 Classes' },
    { value: 'gymnasium', label: 'Gymnasium' },
  ];

  higherEducationTypes = [
    { value: '', label: 'None' },
    { value: 'bachelor', label: 'Bachelor' },
    { value: 'master', label: 'Master' },
  ];

  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  years = Array.from({ length: 50 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  });

  constructor() {
    effect(() => {
      if (this.formGroup) {
        this.formValid.emit(this.formGroup.valid);
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.setupFormListeners();
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      schoolType: [''],
      schoolCompletionMonth: [''],
      schoolCompletionYear: [''],
      higherEducation: [''],
      higherEducationCompletionMonth: [''],
      higherEducationCompletionYear: [''],
    });
  }

  private setupFormListeners() {
    this.formGroup.valueChanges.subscribe(() => {
      this.formValid.emit(this.formGroup.valid);
      this.formData.emit(this.formGroup.value);
    });

    this.formGroup.statusChanges.subscribe(() => {
      this.formValid.emit(this.formGroup.valid);
    });
  }

  markAsTouched() {
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsTouched();
    });
    this.formTouched.set(true);
  }

  getData(): EducationData {
    return this.formGroup.value;
  }

  setData(data: Partial<EducationData>) {
    this.formGroup.patchValue(data);
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }
}
