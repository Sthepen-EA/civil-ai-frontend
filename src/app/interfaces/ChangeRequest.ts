import { ICostEstimate } from './CostEstimate';

export interface IChangeRequest {
  id: string;
  prediction_id: string;
  request_type: string;
  user_id: string;
  date: string;
  original_prediction_object: ICostEstimate;
  new_prediction_object: ICostEstimate;
  status: string;
}
