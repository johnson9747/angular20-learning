import { Component, input } from '@angular/core';
import { Enquiries } from '../housinglocation';

@Component({
  selector: 'app-enquiry-details',
  imports: [],
  templateUrl: './enquiry-details.html',
  styleUrl: './enquiry-details.css'
})
export class EnquiryDetails {
enquiry = input.required<Enquiries>();
}
