export interface ChartDataPoint {
  date: string;
  [company: string]: number | string | null;
}
