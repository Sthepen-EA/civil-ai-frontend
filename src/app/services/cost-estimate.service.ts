import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CostEstimateService {
  http: HttpClient = inject(HttpClient);

  api_url = environment.api_url + 'estimation';

  getCostEstimations() {
    return this.http.get(this.api_url);
  }

  getCostEstimationsbyUser(userId: string) {
    return this.http.get(this.api_url + '-by-user/' + userId);
  }

  createCostEstimation(inputList: any) {
    return this.http.post(this.api_url + '/predict', inputList);
  }
}
