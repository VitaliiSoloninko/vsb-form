import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  Language,
  LanguageSwitcherComponent,
} from '../components/language-switcher/language-switcher.component';
import { StepIndicatorComponent } from '../components/step-indicator/step-indicator.component';
import { Step1PersonalComponent } from '../components/steps/step1-personal/step1-personal.component';
import { Step2ContactComponent } from '../components/steps/step2-contact/step2-contact.component';
import { Step3EducationComponent } from '../components/steps/step3-education/step3-education.component';
import { Step4LanguagesComponent } from '../components/steps/step4-languages/step4-languages.component';
import { Step5WorkExperienceComponent } from '../components/steps/step5-work-experience/step5-work-experience.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonFooter,
    IonButton,
    StepIndicatorComponent,
    LanguageSwitcherComponent,
    Step1PersonalComponent,
    Step2ContactComponent,
    Step3EducationComponent,
    Step4LanguagesComponent,
    Step5WorkExperienceComponent,
  ],
})
export class HomePage implements OnInit {
  currentLanguage = 'de';
  currentStep = 1;
  totalSteps = 5;

  applicationForm!: FormGroup;

  languages: Language[] = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'ua', name: 'Українська' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    this.applicationForm = this.fb.group({
      // Step 1: Personal Information
      personal: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
        placeOfBirth: ['', Validators.required],
        nationality: ['', Validators.required],
        maritalStatus: ['', Validators.required],
      }),

      // Step 2: Contact & Address
      contact: this.fb.group({
        phone: [
          '',
          [Validators.required, Validators.pattern(/^[+]?[0-9\s-]+$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        postalCode: ['', Validators.required],
        city: ['', Validators.required],
      }),

      // Step 3: Education
      education: this.fb.group({
        schoolType: ['', Validators.required],
        schoolCompletionMonth: [''],
        schoolCompletionYear: [''],
        higherEducation: [''],
        higherEducationCompletionMonth: [''],
        higherEducationCompletionYear: [''],
      }),

      // Step 4: Languages
      languages: this.fb.group({
        germanLevel: ['', Validators.required],
        englishLevel: ['', Validators.required],
        additionalLanguages: [''],
      }),

      // Step 5: Work Experience
      workExperience: this.fb.array([]),
    });
  }

  get personalForm(): FormGroup {
    return this.applicationForm.get('personal') as FormGroup;
  }

  get contactForm(): FormGroup {
    return this.applicationForm.get('contact') as FormGroup;
  }

  get educationForm(): FormGroup {
    return this.applicationForm.get('education') as FormGroup;
  }

  get languagesForm(): FormGroup {
    return this.applicationForm.get('languages') as FormGroup;
  }

  changeLanguage(langCode: string) {
    this.currentLanguage = langCode;
    console.log('Language changed to:', langCode);
    // i18n will be implemented in Step 16
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.scrollToTop();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.scrollToTop();
    }
  }

  submitForm() {
    if (this.applicationForm.valid) {
      console.log('Form Data:', this.applicationForm.value);
      // PDF generation will be implemented in Step 17
    } else {
      console.log('Form is invalid');
      this.markFormGroupTouched(this.applicationForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private scrollToTop() {
    // Scroll content to top when changing steps
    const content = document.querySelector('ion-content');
    content?.scrollToTop(300);
  }
}
