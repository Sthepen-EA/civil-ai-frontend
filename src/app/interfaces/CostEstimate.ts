export interface ICostEstimate {
  id: string;
  user_id: string;
  input_list: IInputListItem;
  total_Cost: number;
  project_id: string;
  abutmentTypeES: string;
  structureTypeES: string;
}

export interface IInputListItem {
  structureType: string;
  abutmentType: string;
  total_Width: number;
  number_of_Spans: number;
  total_Length: number;
  year: number;
}
