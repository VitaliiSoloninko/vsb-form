import { Component, input, output, viewChild } from '@angular/core';
import { IonButton, IonDatetime, IonModal } from '@ionic/angular/standalone';

@Component({
  selector: 'app-date-picker-modal',
  standalone: true,
  imports: [IonModal, IonDatetime, IonButton],
  templateUrl: './date-picker-modal.component.html',
  styleUrls: ['./date-picker-modal.component.scss'],
})
export class DatePickerModalComponent {
  triggerId = input.required<string>();
  value = input<string>('');
  dateChange = output<string>();

  modal = viewChild<IonModal>('modal');

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    this.dateChange.emit(selectedDate);
  }

  confirmDate() {
    this.modal()?.dismiss();
  }
}
