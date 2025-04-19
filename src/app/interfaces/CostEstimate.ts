export interface ICostEstimate {
  id: string;
  input_list: IInputListItem;
  total_cost: number;
}

export interface IInputListItem {
  structureType: string;
  abutmentType: string;
  total_Width: number;
  number_of_Spans: number;
  total_Length: number;
  year: number;
}
