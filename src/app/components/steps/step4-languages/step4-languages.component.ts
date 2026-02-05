import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step4-languages',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step4-languages.component.html',
  styleUrls: ['./step4-languages.component.scss'],
})
export class Step4LanguagesComponent {
  formGroup = input.required<FormGroup>();
  // Form will be added later
}
