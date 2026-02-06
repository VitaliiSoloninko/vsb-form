import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
  templateUrl: './summary.page.html',
  styleUrls: ['./summary.page.scss'],
})
export class SummaryPage implements OnInit {
  formData: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.formData = navigation?.extras?.state?.['formData'];
  }

  ngOnInit() {
    if (!this.formData) {
      // If no form data, redirect back to home
      this.router.navigate(['/home']);
    }
  }

  backToForm() {
    this.router.navigate(['/home']);
  }

  downloadPDF() {
    console.log('PDF download will be implemented in Step 17');
    // PDF generation will be implemented in Step 17
  }
}
