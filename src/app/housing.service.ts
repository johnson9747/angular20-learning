import { Injectable, inject } from '@angular/core';
import { HousingLocationInfo } from './housinglocation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment' 


@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}Housing/locations`;

  getAllHousingLocations(): Observable<HousingLocationInfo[]> {
    return this.http.get<HousingLocationInfo[]>(this.url);
  }

  getHousingLocationById(id: number): Observable<HousingLocationInfo | undefined> {
    return this.http.get<HousingLocationInfo>(`${this.url}/${id}`);
  }

  submitApplication(mobileNo: string,details:string,locationId:number): Observable<Object> {
    debugger;
    const body = {
      locationId,
      mobileNo,
      details
    };
    return this.http.post(
      `${environment.apiUrl}Housing/enquiry`,
      body,
      {
      headers: {
        'accept': 'text/plain',
        'Content-Type': 'application/json'
      }
      }
    );
  }
}
