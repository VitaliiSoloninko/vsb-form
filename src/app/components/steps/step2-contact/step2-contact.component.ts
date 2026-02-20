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
import { IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { ContactData } from '../../../models/form-data.models';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-step2-contact',
  standalone: true,
  imports: [ReactiveFormsModule, IonItem, IonLabel, IonInput, TranslocoPipe],
  templateUrl: './step2-contact.component.html',
  styleUrls: ['./step2-contact.component.scss'],
})
export class Step2ContactComponent implements OnInit {
  private fb = new FormBuilder();

  // Signals for outputs
  formValid = output<boolean>();
  formData = output<ContactData>();
  formTouched = signal(false);

  // Form group
  formGroup!: FormGroup;

  // Computed signal for form validity
  isValid = computed(() => this.formGroup?.valid ?? false);

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

  private loadSavedData() {
    const savedData = this.formDataService.contactData();
    if (savedData) {
      this.formGroup.patchValue(savedData);
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[+]?[0-9\s-]+$/),
          Validators.minLength(7),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      street: ['', [Validators.required, Validators.minLength(2)]],
      houseNumber: ['', Validators.required],
      postalCode: [
        '',
        [Validators.required, Validators.pattern(/^[0-9]{4,6}$/)],
      ],
      city: ['', [Validators.required, Validators.minLength(2)]],
    });
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
  getData(): ContactData {
    return this.formGroup.value;
  }

  // Method to set form data (for editing)
  setData(data: Partial<ContactData>) {
    this.formGroup.patchValue(data);
  }

  // Check if form is valid
  isFormValid(): boolean {
    return this.formGroup.valid;
  }
}
