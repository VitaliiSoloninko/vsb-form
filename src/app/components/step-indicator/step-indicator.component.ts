import { Component, input } from '@angular/core';

@Component({
  selector: 'app-step-indicator',
  standalone: true,
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.scss'],
})
export class StepIndicatorComponent {
  currentStep = input.required<number>();
  totalSteps = input.required<number>();

  get steps(): number[] {
    return Array.from({ length: this.totalSteps() }, (_, i) => i + 1);
  }
}
