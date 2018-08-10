declare interface Job {
  id?: string;
  title: string;
  description: string;
  application_link: string;
  tags: string[] | string;
  approved: boolean;

  company?: Company;
}
