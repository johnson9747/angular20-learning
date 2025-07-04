import { Component, inject, signal, WritableSignal } from '@angular/core';
import { HousingLocationInfo } from '../housinglocation';
import { HousingLocation } from '../housing-location/housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  imports: [HousingLocation],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  housingLocationList: WritableSignal<HousingLocationInfo[]> = signal([]);
  filteredLocationList: WritableSignal<HousingLocationInfo[]> = signal([]);
  housingService: HousingService = inject(HousingService)
  constructor() {
    this.housingService.getAllHousingLocations().subscribe({
      next: (locations) => {
        this.housingLocationList.set(locations);
        this.filteredLocationList.set(locations);
      },
      error: (e) => console.error(e)
    });
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList.set(this.housingLocationList());
      return;
    }
    this.filteredLocationList.set(this.housingLocationList().filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    ));
  }
}
