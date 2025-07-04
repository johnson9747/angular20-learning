import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocationInfo } from '../housinglocation';
import { Enquiry } from "../enquiry/enquiry";

@Component({
  selector: 'app-details',
  imports: [Enquiry],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
route: ActivatedRoute = inject(ActivatedRoute);
 housingService = inject(HousingService);
  housingLocation: WritableSignal<HousingLocationInfo | undefined> = signal(undefined);
housingLocationId: number=-1;
constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).subscribe({
      next: (location) => {
        this.housingLocation.set(location);
      },
      error: (e) => console.error(e)
    });
  }
}
