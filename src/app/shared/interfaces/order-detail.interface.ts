
export interface OrderDetailInterface {
    order_details_id:number,
    order_details_price:number,
    order_details_type_sale:string,
    order_details_weight_min:number,
    order_details_discounted:number,
    order_details_quantity:number,
    order_details_comment:string,
    products_id:number,
    products_subcategory_id:number,
    products_image:string,
    products_weigth_or_measure:number,
    products_url:string,
    products_name:string,
    subcategories_description:string,
    products_image_url:string,
    product_type_sale_type:string,
    product_type_sale_weight_min:number,
    product_type_sale_weight_min_unit:number,
    product_type_sale_price:number,
    product_type_sale_stock:number,
    product_type_sale_discount:number,
    product_type_sale_price_with_discount:number,
    products_cart_quantity:number,
    products_cart_price:number,
    product_images:{
        image:string
    }[],

}
