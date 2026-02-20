import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TranslocoPipe } from '@jsverse/transloco';
import { FormDataService } from '../services/form-data.service';
import { PdfService } from '../services/pdf.service';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    TranslocoPipe,
  ],
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage {
  // Get form data from service
  formData = this.formDataService.allFormData;
  isFormComplete = this.formDataService.isFormComplete;

  constructor(
    private router: Router,
    private formDataService: FormDataService,
    private pdfService: PdfService,
    private translationService: TranslationService,
  ) {}

  // Format date from "2024-01" to "January 2024"
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  }

  backToForm() {
    this.router.navigate(['/home']);
  }

  downloadPDF() {
    const data = this.formData();
    if (data) {
      // Get current language from translation service
      const currentLang = this.translationService.activeLang();
      this.pdfService.generatePDF(data, currentLang).catch((err) => {
        console.error('Error generating PDF:', err);
      });
    }
  }

  clearForm() {
    if (confirm('Вы уверены, что хотите очистить все данные формы?')) {
      this.formDataService.clearFormData();
      this.router.navigate(['/home']);
    }
  }
}
