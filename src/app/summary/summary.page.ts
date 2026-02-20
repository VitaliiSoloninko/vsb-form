import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoService } from '@jsverse/transloco';
import { FormDataService } from '../services/form-data.service';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage {
  // Get form data from service
  formData = this.formDataService.allFormData;
  isFormComplete = this.formDataService.isFormComplete;

  // German translations for Summary page (always German)
  t = computed(() => ({
    title: this.translocoService.translate('SUMMARY.TITLE', {}, 'de'),
    personalInfo: this.translocoService.translate(
      'SUMMARY.PERSONAL_INFO',
      {},
      'de',
    ),
    contactInfo: this.translocoService.translate(
      'SUMMARY.CONTACT_INFO',
      {},
      'de',
    ),
    languageSkills: this.translocoService.translate(
      'SUMMARY.LANGUAGE_SKILLS',
      {},
      'de',
    ),
    educationInfo: this.translocoService.translate(
      'SUMMARY.EDUCATION_INFO',
      {},
      'de',
    ),
    school: this.translocoService.translate('SUMMARY.SCHOOL', {}, 'de'),
    higherEd: this.translocoService.translate('SUMMARY.HIGHER_ED', {}, 'de'),
    workExperience: this.translocoService.translate(
      'SUMMARY.WORK_EXPERIENCE',
      {},
      'de',
    ),
    empty: this.translocoService.translate('SUMMARY.EMPTY', {}, 'de'),
    firstName: this.translocoService.translate('STEP1.FIRST_NAME', {}, 'de'),
    lastName: this.translocoService.translate('STEP1.LAST_NAME', {}, 'de'),
    dateOfBirth: this.translocoService.translate(
      'STEP1.DATE_OF_BIRTH',
      {},
      'de',
    ),
    placeOfBirth: this.translocoService.translate(
      'STEP1.PLACE_OF_BIRTH',
      {},
      'de',
    ),
    nationality: this.translocoService.translate('STEP1.NATIONALITY', {}, 'de'),
    maritalStatus: this.translocoService.translate(
      'STEP1.MARITAL_STATUS.LABEL',
      {},
      'de',
    ),
    phone: this.translocoService.translate('STEP2.PHONE', {}, 'de'),
    email: this.translocoService.translate('STEP2.EMAIL', {}, 'de'),
    street: this.translocoService.translate('STEP2.STREET', {}, 'de'),
    houseNumber: this.translocoService.translate(
      'STEP2.HOUSE_NUMBER',
      {},
      'de',
    ),
    postalCode: this.translocoService.translate('STEP2.POSTAL_CODE', {}, 'de'),
    city: this.translocoService.translate('STEP2.CITY', {}, 'de'),
    german: this.translocoService.translate('STEP3.GERMAN', {}, 'de'),
    english: this.translocoService.translate('STEP3.ENGLISH', {}, 'de'),
    additionalLanguages: this.translocoService.translate(
      'STEP3.ADDITIONAL_LANGUAGES',
      {},
      'de',
    ),
    type: this.translocoService.translate('STEP4.TYPE', {}, 'de'),
    degree: this.translocoService.translate('STEP4.DEGREE', {}, 'de'),
    position: this.translocoService.translate('STEP5.POSITION', {}, 'de'),
    responsibilities: this.translocoService.translate(
      'STEP5.RESPONSIBILITIES',
      {},
      'de',
    ),
    btnBack: this.translocoService.translate('BUTTONS.BACK', {}, 'de'),
    btnCreatePDF: this.translocoService.translate(
      'BUTTONS.CREATE_PDF',
      {},
      'de',
    ),
    btnEdit: this.translocoService.translate('BUTTONS.EDIT', {}, 'de'),
  }));

  constructor(
    private router: Router,
    private formDataService: FormDataService,
    private pdfService: PdfService,
    private translocoService: TranslocoService,
  ) {}

  // Format date from "2024-01" to German month and year (always German)
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);

    // Always use German locale
    return date.toLocaleDateString('de-DE', { year: 'numeric', month: 'long' });
  }

  backToForm() {
    this.router.navigate(['/home']);
  }

  downloadPDF() {
    const data = this.formData();
    if (data) {
      // Always generate PDF in German
      this.pdfService.generatePDF(data, 'de').catch((err) => {
        console.error('Error generating PDF:', err);
      });
    }
  }

  clearForm() {
    // Always use German for confirmation message
    const confirmMessage =
      this.translocoService.translate('COMMON.CONFIRM_CLEAR', {}, 'de') ||
      'Sind Sie sicher, dass Sie alle Formulardaten löschen möchten?';
    if (confirm(confirmMessage)) {
      this.formDataService.clearFormData();
      this.router.navigate(['/home']);
    }
  }
}
