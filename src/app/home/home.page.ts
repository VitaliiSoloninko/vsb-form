import { Component, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
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
import {
  ApplicationFormData,
  ContactData,
  EducationData,
  LanguagesData,
  PersonalData,
  WorkExperience,
} from '../models/form-data.models';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
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
export class HomePage {
  currentLanguage = signal('de');
  currentStep = signal(1);
  totalSteps = 5;

  // View children references to step components
  step1 = viewChild<Step1PersonalComponent>('step1');
  step2 = viewChild<Step2ContactComponent>('step2');
  step3 = viewChild<Step3EducationComponent>('step3');
  step4 = viewChild<Step4LanguagesComponent>('step4');
  step5 = viewChild<Step5WorkExperienceComponent>('step5');

  // Form data signals
  personalData = signal<PersonalData | null>(null);
  contactData = signal<ContactData | null>(null);
  educationData = signal<EducationData | null>(null);
  languagesData = signal<LanguagesData | null>(null);
  workExperienceData = signal<WorkExperience[]>([]);

  languages: Language[] = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'ua', name: 'Українська' },
  ];

  constructor(private router: Router) {}

  changeLanguage(langCode: string) {
    this.currentLanguage.set(langCode);
    console.log('Language changed to:', langCode);
    // i18n will be implemented later
  }

  // Handle form data updates from child components
  onPersonalDataChange(data: PersonalData) {
    this.personalData.set(data);
  }

  onContactDataChange(data: ContactData) {
    this.contactData.set(data);
  }

  onEducationDataChange(data: EducationData) {
    this.educationData.set(data);
  }

  onLanguagesDataChange(data: LanguagesData) {
    this.languagesData.set(data);
  }

  onWorkExperienceChange(data: WorkExperience[]) {
    this.workExperienceData.set(data);
  }

  isCurrentStepValid(): boolean {
    const step = this.currentStep();
    switch (step) {
      case 1:
        return this.step1()?.isFormValid() ?? false;
      case 2:
        return this.step2()?.isFormValid() ?? false;
      case 3:
        return this.step3()?.isFormValid() ?? false;
      case 4:
        return this.step4()?.isFormValid() ?? false;
      case 5:
        return this.step5()?.isFormValid() ?? false;
      default:
        return true;
    }
  }

  nextStep() {
    const currentStepComponent = this.getCurrentStepComponent();

    if (currentStepComponent) {
      // Mark form as touched to show validation errors
      currentStepComponent.markAsTouched();

      // Check if current step is valid
      if (!currentStepComponent.isFormValid()) {
        console.log('Please fill in all required fields');
        return;
      }
    }

    if (this.currentStep() < this.totalSteps) {
      this.currentStep.update((step) => step + 1);
      this.scrollToTop();
    }
  }

  previousStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update((step) => step - 1);
      this.scrollToTop();
    }
  }

  submitForm() {
    // Validate all steps
    const allStepsValid = this.validateAllSteps();

    if (!allStepsValid) {
      console.log('Form is invalid. Please check all steps.');
      // Navigate to first invalid step
      this.navigateToFirstInvalidStep();
      return;
    }

    // Collect all form data
    const formData: ApplicationFormData = {
      personal: this.step1()?.getData()!,
      contact: this.step2()?.getData()!,
      education: this.step3()?.getData()!,
      languages: this.step4()?.getData()!,
      workExperience: this.step5()?.getData() ?? [],
    };

    console.log('Form Data:', formData);

    // Navigate to summary page
    this.router.navigate(['/summary'], {
      state: { formData },
    });
  }

  private getCurrentStepComponent():
    | Step1PersonalComponent
    | Step2ContactComponent
    | Step3EducationComponent
    | Step4LanguagesComponent
    | Step5WorkExperienceComponent
    | null {
    const step = this.currentStep();
    switch (step) {
      case 1:
        return this.step1() ?? null;
      case 2:
        return this.step2() ?? null;
      case 3:
        return this.step3() ?? null;
      case 4:
        return this.step4() ?? null;
      case 5:
        return this.step5() ?? null;
      default:
        return null;
    }
  }

  private validateAllSteps(): boolean {
    const steps = [
      this.step1(),
      this.step2(),
      this.step3(),
      this.step4(),
      this.step5(),
    ];

    // Mark all as touched
    steps.forEach((step) => step?.markAsTouched());

    // Check all are valid
    return steps.every((step) => step?.isFormValid() ?? true);
  }

  private navigateToFirstInvalidStep() {
    if (!this.step1()?.isFormValid()) {
      this.currentStep.set(1);
    } else if (!this.step2()?.isFormValid()) {
      this.currentStep.set(2);
    } else if (!this.step3()?.isFormValid()) {
      this.currentStep.set(3);
    } else if (!this.step4()?.isFormValid()) {
      this.currentStep.set(4);
    } else if (!this.step5()?.isFormValid()) {
      this.currentStep.set(5);
    }
    this.scrollToTop();
  }

  private scrollToTop() {
    const content = document.querySelector('ion-content');
    content?.scrollToTop(300);
  }
}
