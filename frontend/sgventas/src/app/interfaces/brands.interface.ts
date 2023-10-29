
export interface CategoryPagination {
    count:    number;
    next:     null;
    previous: null;
    results:  Brand[];
}

export interface Brand {
    id:number,
    name:string,
    description: string
}