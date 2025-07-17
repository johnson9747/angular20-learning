import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocationInfo } from '../housinglocation';
import { Enquiry } from "../enquiry/enquiry";
import { EnquiryDetails } from "../enquiry-details/enquiry-details";
import { EnquiryNotificationService } from '../enquiry-notification.service';

@Component({
  selector: 'app-details',
  imports: [Enquiry, EnquiryDetails],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  enquiryNotificationService=inject(EnquiryNotificationService);
  housingLocation: WritableSignal<HousingLocationInfo | undefined> = signal(undefined);
  housingLocationId: number = -1;
  message=this.enquiryNotificationService.message;;
  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);
    this.loadHousingLocation();
    effect(() => {
      const value = this.message();
      if (value) {
        this.onEnquirySubmitted(value);
      }
    });
  }

  loadHousingLocation() {
    this.housingService.getHousingLocationById(this.housingLocationId).subscribe({
      next: (location) => {
        this.housingLocation.set(location);
      },
      error: (e) => console.error(e)
    });
  }

  // To update housingLocation after enquiry submission, emit an event from enquiry.ts and listen for it here.
  // Add an event handler for enquiry submission.
  onEnquirySubmitted(locationId: string) {   
    this.loadHousingLocation();

  
  }
}
