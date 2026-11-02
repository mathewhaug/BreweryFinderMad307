export type BreweryType =
  | 'micro' | 'nano' | 'regional' | 'brewpub' | 'large'
  | 'planning' | 'bar' | 'contract' | 'proprietor' | 'closed';

export interface Brewery {
  id: string;                 // UUID from the API
  name: string;
  brewery_type: BreweryType;
  city: string;
  state_province: string;
  country: string;
  street?: string | null;
  postal_code?: string | null;
  phone?: string | null;
  website_url?: string | null;
}
