
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
    mount:       number;
    stock_min:   number;
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


export interface SaleInterface {
  id:           number;
  details:      Detail[];
  branch:       Branch;
  date_sale:    Date;
  hour_sale:    string;
  type_payment: string;
  client:       null;
  total:        number;
}

export interface Branch {
  id:          number;
  name:        string;
  description: string;
}

export interface Detail {
  id:      number;
  sale:    SaleClass;
  amount:  number;
  product: Product;
}

export interface SaleClass {
  id:           number;
  date_sale:    Date;
  hour_sale:    string;
  type_payment: string;
  client:       null;
  branch:       number;
}
