export interface ICategories {
  id: number;
  url: string;
  name: string;
}

// CATEGORY
export interface IImage {
  public_id: string | "";
  url: string | "";
}

export interface ICategory {
  image: IImage;
  _id: string;
  categoryName: string;
  slug: string;
  description: string;
  createdAt: string; // Hoặc Date nếu bạn muốn chuyển đổi sau này
  __v: number;
}

export interface ICategoryResponse {
  rows: ICategory[];
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

//PRODUCT
export interface IProduct {
  images: IImage[];
  _id: string;
  ratings: number;
  numOfReviews: number;
  price: number;
  stock: number;
  name: string;
  seller: number;
  description: string;
  createdAt: string;
  __v: number;
}
export interface IProductResponse {
  rows: IProduct[];
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IProductByIdResponse {
  product: any;
  success: boolean;
}
//NEWS
export interface INew {
  images: any;
  _id: string;
  title: string;
  content: string;
  author: any;
  createdAt: string; // Hoặc Date nếu bạn muốn chuyển đổi sau này
  __v: number;
}
export interface INewResponse {
  rows: INew[];
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IANew {
  rows: INew[];
  success: boolean;
}
