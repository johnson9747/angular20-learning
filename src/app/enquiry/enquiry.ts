import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../housing.service';
import { ActivatedRoute } from '@angular/router';
import { EnquiryNotificationService } from '../enquiry-notification.service';

@Component({
  selector: 'app-enquiry',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './enquiry.html',
  styleUrl: './enquiry.css'
})
export class Enquiry {
  housingService =inject(HousingService);
applyForm = new FormGroup({
  mobileNo: new FormControl(''),
  details: new FormControl('')
});

route = inject(ActivatedRoute);
enquiryNotificationService= inject(EnquiryNotificationService);
get locationId(): number {
  return Number(this.route.snapshot.params['id']);
}

submitApplication() {
  this.housingService.submitApplication(
    this.applyForm.value.mobileNo ?? '',
    this.applyForm.value.details ?? '',
    this.locationId
  ).subscribe({
    next: (response) => {
      alert('Application submitted successfully!');
      this.applyForm.reset();
      console.log(response);
      this.enquiryNotificationService.emit(Date.now().toString() + ',' + this.locationId.toString());
    },
    error: (e) => console.error(e)
  });
}
}
