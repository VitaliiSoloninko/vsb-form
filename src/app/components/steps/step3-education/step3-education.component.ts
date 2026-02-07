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
  IonDatetime,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { EducationData } from '../../../models/form-data.models';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-step3-education',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonModal,
  ],
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

  constructor(private formDataService: FormDataService) {
    effect(() => {
      if (this.formGroup) {
        this.formValid.emit(this.formGroup.valid);
      }
    });
  }

  ngOnInit() {
    this.initializeForm();
    this.loadSavedData();
    this.setupFormListeners();
  }

  private loadSavedData() {
    const savedData = this.formDataService.educationData();
    if (savedData) {
      this.formGroup.patchValue(savedData);
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      schoolType: [''],
      schoolStart: [''],
      schoolEnd: [''],
      higherEducation: [''],
      higherEducationStart: [''],
      higherEducationEnd: [''],
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

  // Format date for display
  formatDate(dateString: string): string {
    if (!dateString) return 'Select date';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }

  // Confirm date selection from modal
  confirmDate(field: string, event: any) {
    const value = event.detail.value;
    this.formGroup.patchValue({ [field]: value });
  }
}
