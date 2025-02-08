interface Image {
  _id: string;
  localPath: string;
  url: string;
}

export interface Product {
  _id: string;
  category: string;
  description: string;
  mainImage: Image[];
  subImages: Image[];
  name: string;
  owner: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductResponse {
  products: Product[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  limit: number;
  nextPage: number;
  page: number;
  prevPage: number;
}
export interface Category {
  _id: string;
  name: string;
  owner: string;
}
