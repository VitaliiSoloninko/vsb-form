import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step3-education',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step3-education.component.html',
  styleUrls: ['./step3-education.component.scss'],
})
export class Step3EducationComponent {
  formGroup = input.required<FormGroup>();
  // Form will be added later
}
