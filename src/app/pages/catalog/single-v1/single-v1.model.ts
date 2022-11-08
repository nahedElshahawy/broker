/**
 * About Reviews List
 */
 export interface aboutReviews {
   id?: number;
  image?: string;
  title?: string;
  date?: string;
  rating?: any;
  content?: string;
  like?: string;
  unlike?: string;
}

/**
 * Recently List
 */
 export interface recently {
  id?: number;
  verified_btn: string;
  btn?: string;
  btn_color?: string;
  image?: string;
  sale?: string;
  title?: string;
  content?: string;
  price?: string;
  bad?: string;
  bath?: string;
  car?: string;
}

export interface vselledet {
  name:         string;
  image:        string;
  id:           number;
  phone:        string;
  whatsapp:     string;
  value:        string;
  rent_or_sale: string;
  price:        string;
  descrption:   string;
  user_id:      number;
  created_at:   string;
  updated_at:   string;
  area:         string;
  n_bath:       string;
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
  topimg:       Img[];
  smimg:        Img[];
}

export interface Img {
  image: string;
}
