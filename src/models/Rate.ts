/**
 * Represents the currency rate.
 */
export interface Rate {
  currency: string;
  code: string;
  mid: number;
  trend?: number | null;
}
