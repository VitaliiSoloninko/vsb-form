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
  IonTextarea,
} from '@ionic/angular/standalone';
import { LanguagesData } from '../../../models/form-data.models';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-step4-languages',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
  ],
  templateUrl: './step4-languages.component.html',
  styleUrls: ['./step4-languages.component.scss'],
})
export class Step4LanguagesComponent implements OnInit {
  private fb = new FormBuilder();

  formValid = output<boolean>();
  formData = output<LanguagesData>();
  formTouched = signal(false);

  formGroup!: FormGroup;
  isValid = computed(() => this.formGroup?.valid ?? false);

  languageLevels = [
    { value: '', label: 'Not specified' },
    { value: 'A1', label: 'A1 - Beginner' },
    { value: 'A2', label: 'A2 - Elementary' },
    { value: 'B1', label: 'B1 - Intermediate' },
    { value: 'B2', label: 'B2 - Upper Intermediate' },
    { value: 'C1', label: 'C1 - Advanced' },
    { value: 'C2', label: 'C2 - Proficient' },
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
    const savedData = this.formDataService.languagesData();
    if (savedData) {
      this.formGroup.patchValue(savedData);
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      germanLevel: [''],
      englishLevel: [''],
      additionalLanguages: [''],
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

  getData(): LanguagesData {
    return this.formGroup.value;
  }

  setData(data: Partial<LanguagesData>) {
    this.formGroup.patchValue(data);
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }
}
