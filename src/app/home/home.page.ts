import { Component } from '@angular/core';
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
  currentLanguage = 'de';
  currentStep = 1;
  totalSteps = 5;

  languages: Language[] = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ar', name: 'العربية' },
    { code: 'ua', name: 'Українська' },
  ];

  constructor() {}

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
    console.log('Form submitted - PDF generation will be in Step 17');
    // PDF generation will be implemented in Step 17
  }

  private scrollToTop() {
    // Scroll content to top when changing steps
    const content = document.querySelector('ion-content');
    content?.scrollToTop(300);
  }
}
