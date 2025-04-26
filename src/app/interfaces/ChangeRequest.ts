import { ICostEstimate } from './CostEstimate';

export interface IChangeRequest {
  _id: string;
  prediction_id: string;
  request_type: string;
  user_id: string;
  date: string;
  original_prediction_object: any;
  new_prediction_object: any;
  status: string;
}
