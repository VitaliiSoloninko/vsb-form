import {
  Component,
  computed,
  effect,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { WorkExperience } from '../../../models/form-data.models';

@Component({
  selector: 'app-step5-work-experience',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step5-work-experience.component.html',
  styleUrls: ['./step5-work-experience.component.scss'],
})
export class Step5WorkExperienceComponent implements OnInit {
  private fb = new FormBuilder();

  formValid = output<boolean>();
  formData = output<WorkExperience[]>();
  formTouched = signal(false);

  formGroup!: FormGroup;
  isValid = computed(() => this.formGroup?.valid ?? false);

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
    // Placeholder for now - will implement dynamic work experience later
    this.formGroup = this.fb.group({});
  }

  private setupFormListeners() {
    this.formGroup.valueChanges.subscribe(() => {
      this.formValid.emit(this.formGroup.valid);
      this.formData.emit([]);
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

  getData(): WorkExperience[] {
    return [];
  }

  setData(data: WorkExperience[]) {
    // Will implement later
  }

  isFormValid(): boolean {
    return this.formGroup.valid;
  }
}
