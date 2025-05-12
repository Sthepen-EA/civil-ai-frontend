import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CostEstimateService {
  http: HttpClient = inject(HttpClient);

  api_url = environment.api_url + 'estimation';

  costEstimationList = signal<any>([]);

  getCostEstimations() {
    return this.http.get(this.api_url);
  }

  getCostEstimationsbyUser(userId: string) {
    return this.http.get(this.api_url + '-by-user/' + userId);
  }

  createCostEstimation(inputList: any) {
    return this.http.post(this.api_url + '/predict', inputList);
  }

  saveCostEstimation(prediction: any) {
    return this.http.post(this.api_url + '/save', prediction);
  }

  getAndSetCostEstimationList() {
    this.getCostEstimations().subscribe((data) => {
      this.costEstimationList.set(data);
    });
  }
}
