import { AnimationType } from "../components/carousels/carousel/carousel.animations";

export interface ProductInInterface {
    product_image: string;
    productId: number;
    code: string;
    deletedAt: Date | null;
    description: string;
    descriptionEn: string | null;
    name: string;
    nameEn: string | null;
    otherDetails: string;
    otherDetailsEn: string | null;
    parameters: ParameterInInterface[];
    price: number;
    priceEUR: number;
    priceUSD: number;
    productComments: ProductCommentInInterface[];
    productDiscounts: DiscountInProductInterface[];
    productImages: ProductImageInInterface[];
    status: string;
    stock: number;
    stockMin: number;
    units: ProductUnitInInterface[];
    currentSlide: number;
    animationType: AnimationType;
    sliders: SliderInInterface[];
    images?: ProductImageInInterface[];
}

export interface ParameterInInterface {
    code: string;
    deletedAt: Date | null;
    description: string;
    groupId: number;
    parameterId: number;
    position: number;
    status: string;
    value: string;
    value1: string | null;
    value2: string | null;
}

export interface ProductCommentInInterface {
    comment: string;
    commentAt: string;
    commentId: number;
    createdAt: string;
    deletedAt: Date | null;
    name: string;
    replyCommentId: number | null;
    status: string;
    type: string;
}

export interface ProductImageInInterface {
    deletedAt: Date | null;
    path: string;
    productImageId: number;
}

export interface ProductUnitInInterface {
    abbreviation: string;
    conversionFactor: number | null;
    deletedAt: Date | null;
    status: string;
    unitId: number;
    unitName: string;
}

export interface DiscountInProductInterface {
    deletedAt: null;
    discountPercentage: number;
    endDate: string;
    otherDetails: string;
    productDiscountId: number;
    startDate: string;
}

export interface SliderInInterface {
    currentSlide: number;
    name: string;
    value: AnimationType;
    headline: string;
    src: string;
}
