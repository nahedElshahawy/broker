/**
 * Wishlist List
 */
 export interface wishlist {
  id: number;
  image?: image[];
  verify_btn?: string;
  verify_color?: string;
  btn?: string;
  btn_color?: string;
  sale?: string;
  title?: string;
  address?: string;
  price?: string;
  bad?: string;
  bath?: string;
  car?: string;
}
export interface image {
  image: string;
}
