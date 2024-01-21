export interface AuthSocialInterface {
    type_user: string;
    email: string;
    name: string;
    password: string;
    celphone: string;
    country_phone_code: string;
    country_id: number;
    document: string;
    document_type: string;
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
    //response: any;
}
