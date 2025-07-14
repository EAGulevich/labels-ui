import { Results } from "@shared/types";

export interface DataType {
  key: string;
  round: number;
  roundHistory: Results[number];
}
