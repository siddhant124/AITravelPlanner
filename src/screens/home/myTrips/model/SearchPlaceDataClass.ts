export interface FeatureCollection {
  type: string;
  features: Feature[];
  query: Query;
}

interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
  bbox: number[];
}

interface Properties {
  country: string;
  country_code: string;
  state: string;
  city?: string;
  suburb?: string;
  county?: string;
  district?: string;
  datasource: DataSource;
  state_code: string;
  lon: number;
  lat: number;
  population?: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: Timezone;
  plus_code: string;
  rank: Rank;
  place_id: string;
}

interface DataSource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}

interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
  abbreviation_STD: string;
  abbreviation_DST: string;
}

interface Rank {
  confidence: number;
  confidence_city_level: number;
  match_type: string;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Query {
  text: string;
  parsed: Parsed;
}

interface Parsed {
  city: string;
  expected_type: string;
}
