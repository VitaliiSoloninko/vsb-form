import {
  Component,
  computed,
  effect,
  OnInit,
  output,
  signal,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonDatetime,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTextarea,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons';
import { WorkExperience } from '../../../models/form-data.models';
import { FormDataService } from '../../../services/form-data.service';

@Component({
  selector: 'app-step5-work-experience',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    IonDatetime,
    IonModal,
  ],
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

  constructor(private formDataService: FormDataService) {
    addIcons({ addOutline, trashOutline });

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
    const savedData = this.formDataService.workExperienceData();
    if (savedData && savedData.length > 0) {
      this.setData(savedData);
    }
  }

  private initializeForm() {
    this.formGroup = this.fb.group({
      workExperiences: this.fb.array([]),
    });

    // Add one empty work experience by default
    this.addWorkExperience();
  }

  get workExperiences(): FormArray {
    return this.formGroup.get('workExperiences') as FormArray;
  }

  createWorkExperienceGroup(): FormGroup {
    return this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      position: ['', Validators.required],
      responsibilities: ['', Validators.required],
    });
  }

  addWorkExperience() {
    this.workExperiences.push(this.createWorkExperienceGroup());
  }

  removeWorkExperience(index: number) {
    if (this.workExperiences.length > 1) {
      this.workExperiences.removeAt(index);
    }
  }

  private setupFormListeners() {
    this.formGroup.valueChanges.subscribe(() => {
      this.formValid.emit(this.formGroup.valid);
      this.formData.emit(this.getData());
    });

    this.formGroup.statusChanges.subscribe(() => {
      this.formValid.emit(this.formGroup.valid);
    });
  }

  markAsTouched() {
    this.workExperiences.controls.forEach((control) => {
      Object.keys((control as FormGroup).controls).forEach((key) => {
        control.get(key)?.markAsTouched();
      });
    });
    this.formTouched.set(true);
  }

  getData(): WorkExperience[] {
    return this.workExperiences.value;
  }

  setData(data: WorkExperience[]) {
    // Clear existing work experiences
    while (this.workExperiences.length > 0) {
      this.workExperiences.removeAt(0);
    }

    // Add work experiences from data
    if (data && data.length > 0) {
      data.forEach((experience) => {
        const group = this.createWorkExperienceGroup();
        group.patchValue(experience);
        this.workExperiences.push(group);
      });
    } else {
      // Add one empty work experience if no data
      this.addWorkExperience();
    }
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
  confirmDate(index: number, field: string, event: any) {
    const value = event.detail.value;
    const group = this.workExperiences.at(index) as FormGroup;
    group.patchValue({ [field]: value });
  }
}
