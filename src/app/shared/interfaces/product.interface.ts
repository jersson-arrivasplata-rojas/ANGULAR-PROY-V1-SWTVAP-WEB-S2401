import { ImageInterface } from "./image.interface";
import { ProductTagInterface } from "./product-tag.interface";

export interface ProductInterface {
    products_id: number,
    products_name: string,
    products_heart: number,
    products_subcategory_id: string,
    products_description: string,
    products_image: string,
    products_tag_name: string,
    products_tags: string,
    products_weigth_or_measure: string,
    products_url: number,
    product_type_sale_type: string,
    product_type_sale_weight_min: number,
    product_type_sale_price: string,
    product_type_sale_stock: string,
    product_type_sale_discount: number,
    products_images_tag_visible:number,
    products_unavailable: number,
    subcategories_category_id: string,
    subcategories_description: string,
    categories_id: string,
    categories_store_id: string,
    categories_description: string,
    categories_position: string,
    stores_address: string,
    stores_celphone: string,
    stores_collect: string,
    stores_country_phone_code: string,
    stores_coverage: string,
    stores_delivery: string,
    stores_description:  string,
    stores_email: string,
    stores_facebook: string,
    stores_id: number,
    stores_image: string,
    stores_image_url: string,
    stores_instagram:  string,
    stores_latitud: number,
    stores_longitud: number,
    stores_name: string,
    stores_uri: string,
    stores_nickname: string,
    stores_whatsapp: string,
    hours:any,
    payment_card:any,
    today:any,
    products_image_url:string,
    products_facebook:string,
    product_images:ImageInterface[],
    products_description_html:any,
    product_type_sale_price_with_discount:any,
    products_comments:any[],
    product_tags:ProductTagInterface[],
    //products_cart_tag_name_input:string,
    products_cart_id: number,
    products_cart_price: number,
    products_cart_product_tags_image_type_color: string,
    products_cart_quantity:number,
    products_cart_tag_description: string,
    products_cart_tags_image_description: string,
    products_cart_tags_image_type: number
}
