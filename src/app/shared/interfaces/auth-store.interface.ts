export interface AuthStoreInterface {
    type_user: string;
    name: string;
    email: string;
    password: string;
    celphone: string;
    document: string;
    document_type: string;
    country_phone_code: string;
    country_id: number;
    message: string;
    error: string;
    check_terms_conditions:boolean;
    check_politics_privacy:boolean;
    check_emails_snap_store:boolean;
    token:string;
    password_confirmation:string;
    provider: string;//FACEBOOK,EMAIL,GOOGLE
    image: string;
    first_name: string;
    last_name: string;
    operation_number?: string;
    plan?: string;
}
