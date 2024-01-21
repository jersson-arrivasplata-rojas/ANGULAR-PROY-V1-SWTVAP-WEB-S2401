export interface StoreSearchInterface {
    current_page: number,
    type: string,
    name: string,
    category: string,
    product: string,
    address: string,
    price_min: number,
    price_max: number,
    filters: string,
    check_delivery: any,
    check_pick_store: any,
    check_promotions: any,
    subcategories: string,
    categories:  string
}
