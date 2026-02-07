import { computed, effect, Injectable, signal } from '@angular/core';
import {
  ApplicationFormData,
  ContactData,
  EducationData,
  LanguagesData,
  PersonalData,
  WorkExperience,
} from '../models/form-data.models';

const STORAGE_KEY = 'vsb-form-data';

@Injectable({
  providedIn: 'root',
})
export class FormDataService {
  // Signals for each form step
  personalData = signal<PersonalData | null>(null);
  contactData = signal<ContactData | null>(null);
  educationData = signal<EducationData | null>(null);
  languagesData = signal<LanguagesData | null>(null);
  workExperienceData = signal<WorkExperience[]>([]);

  // Computed signal for complete form data
  allFormData = computed<ApplicationFormData | null>(() => {
    const personal = this.personalData();
    const contact = this.contactData();
    const education = this.educationData();
    const languages = this.languagesData();
    const workExperience = this.workExperienceData();

    // Only return data if at least personal and contact are filled
    if (!personal || !contact) {
      return null;
    }

    return {
      personal,
      contact,
      education: education ?? this.getEmptyEducation(),
      languages: languages ?? this.getEmptyLanguages(),
      workExperience,
    };
  });

  // Computed signal to check if form is complete
  isFormComplete = computed(() => {
    return (
      this.personalData() !== null &&
      this.contactData() !== null &&
      this.educationData() !== null &&
      this.languagesData() !== null
    );
  });

  constructor() {
    // Load data from localStorage on initialization
    this.loadFromStorage();

    // Auto-save to localStorage whenever data changes
    effect(() => {
      const data = this.allFormData();
      if (data) {
        this.saveToStorage(data);
      }
    });
  }

  // Update methods for each step
  updatePersonal(data: PersonalData): void {
    this.personalData.set(data);
  }

  updateContact(data: ContactData): void {
    this.contactData.set(data);
  }

  updateEducation(data: EducationData): void {
    this.educationData.set(data);
  }

  updateLanguages(data: LanguagesData): void {
    this.languagesData.set(data);
  }

  updateWorkExperience(data: WorkExperience[]): void {
    this.workExperienceData.set(data);
  }

  // Clear all form data
  clearFormData(): void {
    this.personalData.set(null);
    this.contactData.set(null);
    this.educationData.set(null);
    this.languagesData.set(null);
    this.workExperienceData.set([]);
    this.clearStorage();
  }

  // LocalStorage methods
  private saveToStorage(data: ApplicationFormData): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save form data to localStorage:', error);
    }
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: ApplicationFormData = JSON.parse(stored);
        this.personalData.set(data.personal);
        this.contactData.set(data.contact);
        this.educationData.set(data.education);
        this.languagesData.set(data.languages);
        this.workExperienceData.set(data.workExperience || []);
      }
    } catch (error) {
      console.error('Failed to load form data from localStorage:', error);
    }
  }

  private clearStorage(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }

  // Helper methods to get empty objects
  private getEmptyEducation(): EducationData {
    return {
      schoolType: '',
      schoolCompletionMonth: '',
      schoolCompletionYear: '',
      higherEducation: '',
      higherEducationCompletionMonth: '',
      higherEducationCompletionYear: '',
    };
  }

  private getEmptyLanguages(): LanguagesData {
    return {
      germanLevel: '',
      englishLevel: '',
      additionalLanguages: '',
    };
  }
}
