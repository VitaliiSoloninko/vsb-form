import {
  Component,
  computed,
  effect,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { PersonalData } from '../../../models/form-data.models';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-step1-personal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
  ],
  templateUrl: './step1-personal.component.html',
  styleUrls: ['./step1-personal.component.scss'],
})
export class Step1PersonalComponent implements OnInit {
  private fb = new FormBuilder();

  // Signals for outputs
  formValid = output<boolean>();
  formData = output<PersonalData>();
  formTouched = signal(false);

  // Form group
  formGroup!: FormGroup;

  // Computed signal for form validity
  isValid = computed(() => this.formGroup?.valid ?? false);

  maritalStatuses = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
  ];

  constructor(private formDataService: FormDataService) {
    // Effect to emit form validity changes
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

  private initializeForm() {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      placeOfBirth: ['', [Validators.required, Validators.minLength(2)]],
      nationality: ['', [Validators.required, Validators.minLength(2)]],
      maritalStatus: ['', Validators.required],
    });
  }

  private loadSavedData() {
    const savedData = this.formDataService.personalData();
    if (savedData) {
      this.formGroup.patchValue(savedData);
    }
  }

  private setupFormListeners() {
    // Listen to form value changes
    this.formGroup.valueChanges.subscribe(() => {
      this.formValid.emit(this.formGroup.valid);
      this.formData.emit(this.formGroup.value);
    });

    // Listen to form status changes
    this.formGroup.statusChanges.subscribe(() => {
      this.formValid.emit(this.formGroup.valid);
    });
  }

  // Method to mark all fields as touched (called from parent)
  markAsTouched() {
    Object.keys(this.formGroup.controls).forEach((key) => {
      this.formGroup.get(key)?.markAsTouched();
    });
    this.formTouched.set(true);
  }

  // Method to get form data
  getData(): PersonalData {
    return this.formGroup.value;
  }

  // Method to set form data (for editing)
  setData(data: Partial<PersonalData>) {
    this.formGroup.patchValue(data);
  }

  // Check if form is valid
  isFormValid(): boolean {
    return this.formGroup.valid;
  }
}
