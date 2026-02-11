export interface Job {
  id: string;
  __CLASS__: string;

  title: string;
  description: string;

  salary_min: number;
  salary_max: number;
  salary_is_predicted: string;

  latitude: number;
  longitude: number;

  redirect_url: string;
  adref: string;

  created: string;

  category: {
    tag: string;
    label: string;
    __CLASS__: string;
  };

  location: {
    __CLASS__: string;
    display_name: string;
    area: string[];
  };

  company: {
    display_name: string;
    __CLASS__: string;
  };
}
