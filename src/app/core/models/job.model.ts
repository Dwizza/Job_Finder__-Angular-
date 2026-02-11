export interface Job {
  id: number;
  name: string;
  short_name: string;
  type: string;
  model_type: string;
  publication_date: string;
  contents: string;

  locations: {
    name: string;
  }[];

  categories: any[];

  levels: {
    name: string;
    short_name: string;
  }[];

  tags: any[];

  refs: {
    landing_page: string;
  };

  company: {
    id: number;
    short_name: string;
    name: string;
  };
}
