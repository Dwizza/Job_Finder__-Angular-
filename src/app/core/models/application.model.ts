export type ApplicationStatus = 'en_attente' | 'accepte' | 'refuse';

export interface Application {
  id?: number;
  user_id: number;
  offer_id: string;
  api_source: string;
  title: string;
  company: string;
  location: string;
  url: string;
  status: ApplicationStatus;
  notes?: string;
  date_added: string;
}
