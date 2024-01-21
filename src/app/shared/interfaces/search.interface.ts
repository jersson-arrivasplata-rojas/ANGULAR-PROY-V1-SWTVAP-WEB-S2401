export interface SearchInterface {
    current_page: number;
    type: string;
    name: string;
    product: string;
    address: string;
    price_min: number;
    price_max: number;
    filters: string;
    check_delivery: string;
    check_pick_store: string;
    check_promotions: string;
    subcategories: string;
    categories: string;
}
