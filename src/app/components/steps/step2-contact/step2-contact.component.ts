import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step2-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './step2-contact.component.html',
  styleUrls: ['./step2-contact.component.scss'],
})
export class Step2ContactComponent {
  formGroup = input.required<FormGroup>();
  // Reactive form fields will be added in Step 8
}
