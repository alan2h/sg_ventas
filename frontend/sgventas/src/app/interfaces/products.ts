export interface ProductList {
    count:    number;
    next:     null;
    previous: null;
    results:  Product[];
}

export interface Product {
    id:          number;
    name:        string;
    description: string;
    photo:       string;
    brand:       Brand;
    category:    Brand;
    price_sale:  string;
    price_buy:   string;
    observation: string;
    stock:       number;
    stock_min:   number;
}

export interface Brand {
    id:          number;
    name:        string;
    description: string;
}