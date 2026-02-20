import { Component, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
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
  ContactData,
  EducationData,
  LanguagesData,
  PersonalData,
  WorkExperience,
} from '../models/form-data.models';
import { FormDataService } from '../services/form-data.service';
import { TranslationService } from '../services/translation.service';

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
    TranslocoPipe,
  ],
})
export class HomePage {
  currentLanguage = signal('de');
  currentStep = signal(1);
  totalSteps = 5;

  // View children references to step components
  step1 = viewChild<Step1PersonalComponent>('step1');
  step2 = viewChild<Step2ContactComponent>('step2');
  step3 = viewChild<Step4LanguagesComponent>('step3');
  step4 = viewChild<Step3EducationComponent>('step4');
  step5 = viewChild<Step5WorkExperienceComponent>('step5');

  languages: Language[] = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'ua', name: 'Українська' },
  ];

  constructor(
    private router: Router,
    private formDataService: FormDataService,
    private translationService: TranslationService,
  ) {}

  changeLanguage(langCode: string) {
    this.currentLanguage.set(langCode);
    this.translationService.setActiveLang(langCode);
  }

  // Handle form data updates from child components
  onPersonalDataChange(data: PersonalData) {
    this.formDataService.updatePersonal(data);
  }

  onContactDataChange(data: ContactData) {
    this.formDataService.updateContact(data);
  }

  onLanguagesDataChange(data: LanguagesData) {
    this.formDataService.updateLanguages(data);
  }

  onEducationDataChange(data: EducationData) {
    this.formDataService.updateEducation(data);
  }

  onWorkExperienceChange(data: WorkExperience[]) {
    this.formDataService.updateWorkExperience(data);
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
    console.log('=== SUBMIT FORM STARTED ===');
    console.log('Current step:', this.currentStep());

    // Validate only required steps (1 and 2)
    const requiredStepsValid = this.validateRequiredSteps();
    console.log('Required steps valid:', requiredStepsValid);

    if (!requiredStepsValid) {
      console.log('❌ Required steps are invalid. Please check steps 1 and 2.');
      // Navigate to first invalid required step
      this.navigateToFirstInvalidStep();
      return;
    }

    // Collect all form data
    const formData = this.formDataService.allFormData();
    console.log('Form data from service:', formData);

    if (!formData) {
      console.log('❌ Form data is incomplete');
      return;
    }

    console.log('✅ Form Data valid, navigating to summary:', formData);

    // Navigate to summary page
    this.router.navigate(['/summary']);
  }

  private getCurrentStepComponent():
    | Step1PersonalComponent
    | Step2ContactComponent
    | Step4LanguagesComponent
    | Step3EducationComponent
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

  private validateRequiredSteps(): boolean {
    console.log('--- Validating required steps ---');

    // Check data from service instead of components
    const personalData = this.formDataService.personalData();
    const contactData = this.formDataService.contactData();

    console.log('Personal data from service:', personalData);
    console.log('Contact data from service:', contactData);

    // Check if required data exists and is not empty
    if (!personalData || !contactData) {
      console.log('❌ Required data missing');
      return false;
    }

    // Validate personal data
    const personalValid =
      !!personalData.firstName &&
      !!personalData.lastName &&
      !!personalData.dateOfBirth &&
      !!personalData.placeOfBirth &&
      !!personalData.nationality &&
      !!personalData.maritalStatus;

    // Validate contact data
    const contactValid =
      !!contactData.phone &&
      !!contactData.email &&
      !!contactData.street &&
      !!contactData.houseNumber &&
      !!contactData.postalCode &&
      !!contactData.city;

    console.log('Personal data valid:', personalValid);
    console.log('Contact data valid:', contactValid);

    if (!personalValid || !contactValid) {
      console.log('❌ Required data incomplete');
      return false;
    }

    return true;
  }

  private navigateToFirstInvalidStep() {
    // Navigate to first required step if data is missing
    const personalData = this.formDataService.personalData();
    const contactData = this.formDataService.contactData();

    if (
      !personalData ||
      !personalData.firstName ||
      !personalData.lastName ||
      !personalData.dateOfBirth ||
      !personalData.placeOfBirth ||
      !personalData.nationality ||
      !personalData.maritalStatus
    ) {
      this.currentStep.set(1);
    } else if (
      !contactData ||
      !contactData.phone ||
      !contactData.email ||
      !contactData.street ||
      !contactData.houseNumber ||
      !contactData.postalCode ||
      !contactData.city
    ) {
      this.currentStep.set(2);
    }
    this.scrollToTop();
  }

  private scrollToTop() {
    const content = document.querySelector('ion-content');
    content?.scrollToTop(300);
  }
}
