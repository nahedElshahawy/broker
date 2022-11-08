/**
 * Top Offer List
 */
 export interface topOffer {

  id?: number;
  verified_btn?: string;
  btn?: string;
  btn_color?: string;
  image?: Array<{
    img?: string;
  }>;
  sale?: string;
  title?: string;
  address?: string;
  price?: string;
  bad?: string;
  bath?: string;
  car?: string;
}


/**
 * Top Offer List
 */
 export interface sale {
  verified_btn: string;
  btn?: string;
  btn_color?: string;
  image?: Array<{
    img?: string;
  }>;
  sale?: string;
  title?: string;
  address?: string;
  price?: string;
  bad?: string;
  bath?: string;
  car?: string;
}
export interface person {
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: null;
  value:             string;
  created_at:        Date;
  updated_at:        Date;
  phone:             string;
  whatsapp:          string;
  address:           string;
  image:             string;
  isbanned:          number;
  role:              string;
  bio:               string;
  company_name:      string;
}
