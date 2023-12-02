export interface ProductList {
    count:    number;
    next:     null;
    previous: null;
    results:  Product[];
}

export interface Product {
    id:          number;
    name:        string;
    barcode?:      string;
    description: string;
    photo:       string;
    brand:       Brand;
    category:    Brand;
    price_sale:  string;
    price_buy:   string;
    observation: string;
    stock:       number;
    stock_min:   number;
    mount?: number;
    total_price?: Float32Array;
}

export interface Brand {
    id:          number;
    name:        string;
    description: string;
}


export interface Category{
    id:          number;
    name:        string;
    description: string;
}


export interface ProductSelected {
  id:          number;
  name:        string;
  description: string;
  mount:       number;
  price:       Float32Array;
}
