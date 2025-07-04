import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-enquiry',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './enquiry.html',
  styleUrl: './enquiry.css'
})
export class Enquiry {
  housingService =inject(HousingService);
applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    query: new FormControl('')
  });
  
  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.query ?? ''
    );
  }
}
