import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonInput, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-step2-contact',
  standalone: true,
  imports: [ReactiveFormsModule, IonItem, IonLabel, IonInput],
  templateUrl: './step2-contact.component.html',
  styleUrls: ['./step2-contact.component.scss'],
})
export class Step2ContactComponent {
  formGroup = input.required<FormGroup>();
}
