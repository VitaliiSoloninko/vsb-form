import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { FormDataService } from '../services/form-data.service';

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

  constructor(
    private router: Router,
    private formDataService: FormDataService,
  ) {}

  backToForm() {
    this.router.navigate(['/home']);
  }

  downloadPDF() {
    console.log('PDF download will be implemented later');
    // PDF generation will be implemented later
  }

  clearForm() {
    if (confirm('Вы уверены, что хотите очистить все данные формы?')) {
      this.formDataService.clearFormData();
      this.router.navigate(['/home']);
    }
  }
}
