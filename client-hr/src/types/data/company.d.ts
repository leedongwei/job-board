interface Company {
  id?: string;
  user_id: string;

  name: string;
  logo: string;

  address: string;
  city: string;
  state: string;
  zip: string;

  jobs?: Job[];
}
