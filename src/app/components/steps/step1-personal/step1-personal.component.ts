import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step1-personal',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step1-personal.component.html',
  styleUrls: ['./step1-personal.component.scss'],
})
export class Step1PersonalComponent {
  formGroup = input.required<FormGroup>();
  // Reactive form fields will be added in Step 7
}
