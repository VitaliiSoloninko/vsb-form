import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step5-work-experience',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step5-work-experience.component.html',
  styleUrls: ['./step5-work-experience.component.scss'],
})
export class Step5WorkExperienceComponent {
  formGroup = input.required<FormGroup>();
  // Form will be added later
}
