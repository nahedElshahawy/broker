export interface Iadve {
  descrption:   string;
  title:        string;
  price:        number;
  rent_or_sale: string;
  area:         number;
  n_rooms:      number;
  n_bath:       string;
  type:         string;
  parking:      number;
  street:       string;
  zip:          number;
  district:     string;
  city:         string;
  country:      string;
  pr_com:       string;
}
export interface IviewAdv {
  name:         string;
  id:           number;
  phone:        string;
  value:        string;
  whatsapp:     string;
  rent_or_sale: string;
  price:        number;
  descrption:   string;
  user_id:      number;
  created_at:   string;
  updated_at:   string;
  area:         number;
  n_bath:       number;
  n_rooms:      string;
  booked:       number;
  title:        string;
  type:         string;
  pr_com:       string;
  country:      string;
  city:         string;
  district:     string;
  zip:          string;
  street:       string;
  parking:      string;
  images:       Image[];
  mainImage:    Image;
  image:       string;
}

export interface Image {
  image: string;
  id:    number;
}
