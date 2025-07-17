import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnquiryNotificationService {

  private messageSignal = signal<string | null>(null);

  // Setter
  emit(message: string) {
    this.messageSignal.set(message);
  }

  // Getter
  get message() {
    return this.messageSignal;
  }

}
