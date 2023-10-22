
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