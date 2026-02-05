import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {
  Language,
  LanguageSwitcherComponent,
} from '../components/language-switcher/language-switcher.component';
import { StepIndicatorComponent } from '../components/step-indicator/step-indicator.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButton,
    StepIndicatorComponent,
    LanguageSwitcherComponent,
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
}
