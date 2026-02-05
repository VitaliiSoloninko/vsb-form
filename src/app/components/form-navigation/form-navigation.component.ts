import { Component, input, output } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form-navigation',
  standalone: true,
  imports: [IonButton],
  templateUrl: './form-navigation.component.html',
  styleUrls: ['./form-navigation.component.scss'],
})
export class FormNavigationComponent {
  currentStep = input.required<number>();
  totalSteps = input.required<number>();

  previous = output<void>();
  next = output<void>();
  submit = output<void>();

  onPrevious() {
    this.previous.emit();
  }

  onNext() {
    this.next.emit();
  }

  onSubmit() {
    this.submit.emit();
  }
}
