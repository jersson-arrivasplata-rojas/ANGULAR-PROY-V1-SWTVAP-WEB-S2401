import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LaddaModule } from 'angular2-ladda';
import * as echarts from 'echarts';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgxEchartsModule } from 'ngx-echarts';
import { CarouselModule } from 'ngx-owl-carousel-o';

//import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
//import { DataService } from './services/data.service';

import { CardLgIconsComponent } from '././components/cards/card-lg-icons/card-lg-icons.component';
import { AlertCardComponent } from './components/alerts/alert-card/alert-card.component';
import { AlertDefaultComponent } from './components/alerts/alert-default/alert-default.component';
import { ChatDefaultComponent } from './components/apps/chat-default/chat-default.component';
import { ChatWindowAuthComponent } from './components/apps/chat-window-auth/chat-window-auth.component';
import { ChatWindowComponent } from './components/apps/chat-window/chat-window.component';
import { ContactDefaultComponent } from './components/apps/contact-default/contact-default.component';
import { ContactListDefaultComponent } from './components/apps/contact-list-default/contact-list-default.component';
import { ChatContactComponent } from './components/apps/content-chat/chat-contact/chat-contact.component';
import { ChatContentComponent } from './components/apps/content-chat/chat-content/chat-content.component';
import { ChatMessageLeftComponent } from './components/apps/content-chat/chat-message-left/chat-message-left.component';
import { ChatMessageRightComponent } from './components/apps/content-chat/chat-message-right/chat-message-right.component';
import { ChatSidebarComponent } from './components/apps/content-chat/chat-sidebar/chat-sidebar.component';
import { ChatTopbarLeftComponent } from './components/apps/content-chat/chat-topbar-left/chat-topbar-left.component';
import { ChatTopbarComponent } from './components/apps/content-chat/chat-topbar/chat-topbar.component';
import { InvoiceDefaultComponent } from './components/apps/invoice-default/invoice-default.component';
import { BreadcrumbDefaultComponent } from './components/breadcrumbs/breadcrumb-default/breadcrumb-default.component';
import { ButtonDefaultHexComponent } from './components/buttons/button-default-hex/button-default-hex.component';
import { ButtonDefaultComponent } from './components/buttons/button-default/button-default.component';
import { ButtonLaddaComponent } from './components/buttons/button-ladda/button-ladda.component';
import { ButtonOutlineHexComponent } from './components/buttons/button-outline-hex/button-outline-hex.component';
import { ButtonOutlineComponent } from './components/buttons/button-outline/button-outline.component';
import { ButtonRaisedHexComponent } from './components/buttons/button-raised-hex/button-raised-hex.component';
import { ButtonRaisedComponent } from './components/buttons/button-raised/button-raised.component';
import { CardBgLargeComponent } from './components/cards/card-bg-large/card-bg-large.component';
import { CardBgMediumComponent } from './components/cards/card-bg-medium/card-bg-medium.component';
import { CardEchartOneComponent } from './components/cards/card-echart-one/card-echart-one.component';
import { CardEcommerceDefaultComponent } from './components/cards/card-ecommerce-default/card-ecommerce-default.component';
import { CardEcommerceHorizontalComponent } from './components/cards/card-ecommerce-horizontal/card-ecommerce-horizontal.component';
import { CardEcommerceImageComponent, CardProductComment, NgbdModalContent } from './components/cards/card-ecommerce-image/card-ecommerce-image.component';
import { CardEcommerceListComponent } from './components/cards/card-ecommerce-list/card-ecommerce-list.component';
import { CardEcommerceOneComponent } from './components/cards/card-ecommerce-one/card-ecommerce-one.component';
import { CardEcommerceVerticalComponent } from './components/cards/card-ecommerce-vertical/card-ecommerce-vertical.component';
import { CardIconLargeComponent } from './components/cards/card-icon-large/card-icon-large.component';
import { CardIconMediumComponent } from './components/cards/card-icon-medium/card-icon-medium.component';
import { CardIconSmallComponent } from './components/cards/card-icon-small/card-icon-small.component';
import { CardIconWidgetComponent } from './components/cards/card-icon-widget/card-icon-widget.component';
import { CardMtSellerComponent } from './components/cards/card-mt-seller/card-mt-seller.component';
import { CardPricingTableComponent } from './components/cards/card-pricing-table/card-pricing-table.component';
import { CardProfileVerticalComponent } from './components/cards/card-profile-vertical/card-profile-vertical.component';
import { CarouselDefaultComponent } from './components/carousels/carousel-default/carousel-default.component';
import { CartDefaultComponent } from './components/cart/cart-default/cart-default.component';
import { CartInicioEcommerceImageComponent } from './components/cart/cart-inicio-ecommerce-image/cart-inicio-ecommerce-image.component';
import { CartInicioComponent } from './components/cart/cart-inicio/cart-inicio.component';
import { GeneratorCssComponent } from './components/color-picker/generator-css/generator-css.component';
import { CommentDefaultComponent } from './components/comments/comment-default/comment-default.component';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { DashboardInicioFooterComponent } from './components/dashboard-inicio-footer/dashboard-inicio-footer.component';
import { DescriptionDefaultComponent } from './components/descriptions/description-default/description-default.component';
import { DropdownMenuComponent } from './components/dropdown-menu/dropdown-menu.component';
import { DropdownNotificationComponent } from './components/dropdown-notification/dropdown-notification.component';
import { EcommerceCartDefaultComponent } from './components/ecommerce/ecommerce-cart-default/ecommerce-cart-default.component';
import { EcommerceCheckoutDefaultComponent } from './components/ecommerce/ecommerce-checkout-default/ecommerce-checkout-default.component';
import { EcommerceProductDetailDefaultComponent } from './components/ecommerce/ecommerce-product-detail-default/ecommerce-product-detail-default.component';
import { EcommerceProductsDefaultComponent } from './components/ecommerce/ecommerce-products-default/ecommerce-products-default.component';
import { EditorBubbleComponent } from './components/editors/editor-bubble/editor-bubble.component';
import { EditorDefaultComponent } from './components/editors/editor-default/editor-default.component';
import { EditorFullComponent } from './components/editors/editor-full/editor-full.component';
import { FormInputDefaultComponent } from './components/forms/form-input-default/form-input-default.component';
import { GoogleDefaultComponent } from './components/google/google-default/google-default.component';
import { GoogleSecondDefaultComponent } from './components/google/google-second-default/google-second-default.component';
import { HeaderDefaultExampleComponent } from './components/header/header-default-example/header-default-example.component';
import { HeaderDefaultComponent } from './components/header/header-default/header-default.component';
import { HeaderTopDefaultComponent } from './components/header/header-top-default/header-top-default.component';
import { HeartDefaultComponent } from './components/icons/heart-default/heart-default.component';
import { IconIconsmindDefaultComponent } from './components/icons/icon-iconsmind-default/icon-iconsmind-default.component';
import { ShareDefaultComponent } from './components/icons/share-default/share-default.component';
import { ImageCropperComponent } from './components/image-crop/image-cropper/image-cropper.component';
import { InputDefaultComponent } from './components/inputs/input-default/input-default.component';
import { SelectDefaultComponent } from './components/inputs/select-default/select-default.component';
import { TextareaDefaultComponent } from './components/inputs/textarea-default/textarea-default.component';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { MegaMenuComponent } from './components/mega-menu/mega-menu.component';
import { MenuToggleComponent } from './components/menu-toggle/menu-toggle.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { BottomNavbarDefaultComponent } from './components/navbar/bottom-navbar-default/bottom-navbar-default.component';
import { TopBarDefaultComponent } from './components/navbar/top-bar-default/top-bar-default.component';
import { TopNavbarDefaultComponent } from './components/navbar/top-navbar-default/top-navbar-default.component';
import { FooterDefaultComponent } from './components/others/footer-default/footer-default.component';
import { FooterStoreDefaultComponent } from './components/others/footer-store-default/footer-store-default.component';
import { ForgotPasswordDefaultComponent } from './components/others/forgot-password-default/forgot-password-default.component';
import { LoginDefaultComponent, NgbdModal2Content } from './components/others/login-default/login-default.component';
import { NotFoundComponent } from './components/others/not-found/not-found.component';
import { PricingComponent } from './components/others/pricing/pricing.component';
import { ResetPasswordDefaultComponent } from './components/others/reset-password-default/reset-password-default.component';
import { SignUpDefaultComponent } from './components/others/sign-up-default/sign-up-default.component';
import { SuccessPasswordRecoverDefaultComponent } from './components/others/success-password-recover-default/success-password-recover-default.component';
import { UserProfileComponent } from './components/others/user-profile/user-profile.component';
import { ProgressBarStripesComponent } from './components/progress-bar/progress-bar-stripes/progress-bar-stripes.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchDefaultComponent } from './components/search-default/search-default.component';
import { SearchMiniDefaultComponent } from './components/search-mini-default/search-mini-default.component';
import { SearchUiComponent } from './components/search-ui/search-ui.component';
import { SidebarLeftComponent } from './components/sidebar-left/sidebar-left.component';
import { PaginationDefaultComponent } from './components/tables/pagination-default/pagination-default.component';
import { TableDefaultComponent } from './components/tables/table-default/table-default.component';
import { TableListComponent } from './components/tables/table-list/table-list.component';
import { TooltipDefaultComponent } from './components/tooltips/tooltip-default/tooltip-default.component';
import { CulquiDefaultComponent } from './components/typePayments/culqui-default/culqui-default.component';
import { WidgetMenuComponent } from './components/widget-menu/widget-menu.component';
import { WidgetBestSellersDefaultComponent } from './components/widgets/widget-best-sellers-default/widget-best-sellers-default.component';
import { WidgetDownloadFilesDefaultComponent } from './components/widgets/widget-download-files-default/widget-download-files-default.component';
import { WidgetNotificationDefaultComponent } from './components/widgets/widget-notification-default/widget-notification-default.component';
import { WidgetPaymentFormDefaultComponent } from './components/widgets/widget-payment-form-default/widget-payment-form-default.component';
import { WidgetSupportTicketsDefaultComponent } from './components/widgets/widget-support-tickets-default/widget-support-tickets-default.component';

import { ColorPickerApplyDirective } from './directives/color-picker-apply.directive';
import { ForbiddenValidatorDirective } from './directives/forbidden-name.directive';
import { OnlyNumbersInputDirective } from './directives/only-numbers-input.directive';

import { ByPassSecurityPipe } from './pipes/by-pass-security.pipe';
import { MonedaPipe } from './pipes/moneda.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';


import { CommentComponent } from './components/comments/comment/comment.component';
import { AmountValidatorDirective } from './directives/amount-validator.directive';
import { DateFormatDirective } from './directives/date-format.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { PrefixValueDirective } from './directives/prefix-value.directive';
import { HttpModule } from './http/http.module';
import { ColorSketchModule } from './lib/components/sketch/sketch.component';
import { AddZerosPipe } from './pipes/add-zeros.pipe';
import { EmptyTextPipe } from './pipes/empty-text.pipe';
import { InitialsPipe } from './pipes/initials.pipe';
import { StatusAddPipe } from './pipes/status-add.pipe';
import { StatusProviderPipe } from './pipes/status-provider.pipe';
import { StatusRelationshipPipe } from './pipes/status-relationship.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { TransformTextPipe } from './pipes/transform-text.pipe';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { ServicesModule } from './services/services.module';

@NgModule({
  declarations: [
    GeneratorCssComponent,
    SanitizeHtmlPipe,
    ByPassSecurityPipe,
    MenuToggleComponent,
    MegaMenuComponent,
    SearchBarComponent,
    WidgetMenuComponent,
    DropdownNotificationComponent,
    DropdownMenuComponent,
    DashboardInicioFooterComponent,
    SearchUiComponent,
    CustomizerComponent,
    ColorPickerApplyDirective,
    OnlyNumbersInputDirective,
    SafeUrlPipe,
    MonedaPipe,
    SidebarLeftComponent,
    NavItemComponent,
    CardIconLargeComponent,
    CardIconMediumComponent,
    CardIconSmallComponent,
    CardBgLargeComponent,
    CardBgMediumComponent,
    CardProfileVerticalComponent,
    ButtonDefaultComponent,
    ButtonDefaultHexComponent,
    ButtonRaisedHexComponent,
    ButtonRaisedComponent,
    ButtonOutlineComponent,
    ButtonOutlineHexComponent,
    AlertDefaultComponent,
    AlertCardComponent,
    ImageCropperComponent,
    ProgressBarStripesComponent,
    TooltipDefaultComponent,
    CarouselDefaultComponent,
    IconIconsmindDefaultComponent,
    InputDefaultComponent,
    FormInputDefaultComponent,
    SelectDefaultComponent,
    NotFoundComponent,
    CardPricingTableComponent,
    PricingComponent,
    CulquiDefaultComponent,
    TableDefaultComponent,
    PaginationDefaultComponent,
    BreadcrumbDefaultComponent,
    DescriptionDefaultComponent,
    EditorDefaultComponent,
    EditorFullComponent,
    EditorBubbleComponent,
    ContactDefaultComponent,
    ChatSidebarComponent,
    ChatDefaultComponent,
    ChatContentComponent,
    ChatContactComponent,
    ChatMessageLeftComponent,
    ChatMessageRightComponent,
    ChatTopbarComponent,
    ChatTopbarLeftComponent,
    TextareaDefaultComponent,
    InvoiceDefaultComponent,
    WidgetNotificationDefaultComponent,
    WidgetDownloadFilesDefaultComponent,
    WidgetBestSellersDefaultComponent,
    WidgetSupportTicketsDefaultComponent,
    WidgetPaymentFormDefaultComponent,
    ButtonLaddaComponent,
    CardEcommerceDefaultComponent,
    EcommerceProductDetailDefaultComponent,
    EcommerceProductsDefaultComponent,
    EcommerceCartDefaultComponent,
    EcommerceCheckoutDefaultComponent,
    ContactListDefaultComponent,
    CardEcommerceHorizontalComponent,
    CardEcommerceVerticalComponent,
    CardEcommerceOneComponent,
    UserProfileComponent,
    TableListComponent,
    CardEcommerceListComponent,
    CardEcommerceImageComponent,
    CardProductComment,
    NgbdModalContent,
    LoginDefaultComponent,
    SignUpDefaultComponent,
    MainHeaderComponent,
    CardLgIconsComponent,
    CardMtSellerComponent,
    CardEchartOneComponent,
    CardIconWidgetComponent,
    SearchDefaultComponent,
    SearchMiniDefaultComponent,
    GoogleDefaultComponent,
    //iONIC
    ForgotPasswordDefaultComponent,

    FooterDefaultComponent,
    SuccessPasswordRecoverDefaultComponent,
    ForbiddenValidatorDirective,
    ResetPasswordDefaultComponent,
    NgbdModal2Content,

    FooterStoreDefaultComponent,
    BottomNavbarDefaultComponent,

    TopNavbarDefaultComponent,

    CartDefaultComponent,

    HeaderDefaultComponent,

    TopBarDefaultComponent,

    HeartDefaultComponent,

    ShareDefaultComponent,
    CommentDefaultComponent,

    CartInicioComponent,
    HeaderDefaultExampleComponent,
    CartInicioEcommerceImageComponent,
    HeaderTopDefaultComponent,
    GoogleSecondDefaultComponent,
    ChatWindowComponent,
    ChatWindowAuthComponent,
    CommentComponent,
    InitialsPipe,
    HighlightDirective,
    StatusPipe,
    TruncateTextPipe,
    StatusAddPipe,
    StatusRelationshipPipe,
    EmptyTextPipe,
    StatusProviderPipe,
    AmountValidatorDirective,
    AddZerosPipe,
    DateFormatDirective,
    TransformTextPipe,
    PrefixValueDirective
  ],
  exports: [
    GeneratorCssComponent,
    SanitizeHtmlPipe,
    ByPassSecurityPipe,
    MenuToggleComponent,
    MegaMenuComponent,
    SearchBarComponent,
    WidgetMenuComponent,
    DropdownNotificationComponent,
    DropdownMenuComponent,
    DashboardInicioFooterComponent,
    SearchUiComponent,
    CustomizerComponent,
    ColorPickerApplyDirective,
    OnlyNumbersInputDirective,
    SafeUrlPipe,
    MonedaPipe,
    SidebarLeftComponent,
    NavItemComponent,
    CardIconLargeComponent,
    CardIconMediumComponent,
    CardIconSmallComponent,
    CardBgLargeComponent,
    CardBgMediumComponent,
    CardProfileVerticalComponent,
    ButtonDefaultComponent,
    ButtonDefaultHexComponent,
    ButtonRaisedHexComponent,
    ButtonRaisedComponent,
    ButtonOutlineComponent,
    ButtonOutlineHexComponent,
    AlertDefaultComponent,
    AlertCardComponent,
    ImageCropperComponent,
    ProgressBarStripesComponent,
    TooltipDefaultComponent,
    CarouselDefaultComponent,
    IconIconsmindDefaultComponent,
    InputDefaultComponent,
    FormInputDefaultComponent,
    SelectDefaultComponent,
    NotFoundComponent,
    CardPricingTableComponent,
    PricingComponent,
    CulquiDefaultComponent,
    TableDefaultComponent,
    PaginationDefaultComponent,
    BreadcrumbDefaultComponent,
    DescriptionDefaultComponent,
    EditorDefaultComponent,
    EditorFullComponent,
    EditorBubbleComponent,
    ContactDefaultComponent,
    ChatSidebarComponent,
    ChatDefaultComponent,
    ChatContentComponent,
    ChatContactComponent,
    ChatMessageLeftComponent,
    ChatMessageRightComponent,
    ChatTopbarComponent,
    ChatTopbarLeftComponent,
    TextareaDefaultComponent,
    InvoiceDefaultComponent,
    WidgetNotificationDefaultComponent,
    WidgetDownloadFilesDefaultComponent,
    WidgetBestSellersDefaultComponent,
    WidgetSupportTicketsDefaultComponent,
    WidgetPaymentFormDefaultComponent,
    ButtonLaddaComponent,
    CardEcommerceDefaultComponent,
    EcommerceProductDetailDefaultComponent,
    EcommerceProductsDefaultComponent,
    EcommerceCartDefaultComponent,
    EcommerceCheckoutDefaultComponent,
    ContactListDefaultComponent,
    CardEcommerceHorizontalComponent,
    CardEcommerceVerticalComponent,
    CardEcommerceOneComponent,
    UserProfileComponent,
    TableListComponent,
    CardEcommerceListComponent,
    CardEcommerceImageComponent,
    CardProductComment,
    NgbdModalContent,
    LoginDefaultComponent,
    SignUpDefaultComponent,
    MainHeaderComponent,
    CardLgIconsComponent,
    CardMtSellerComponent,
    CardEchartOneComponent,
    CardIconWidgetComponent,
    SearchDefaultComponent,
    SearchMiniDefaultComponent,
    GoogleDefaultComponent,
    //BrowserAnimationsModule,

    FooterDefaultComponent,
    //ionic
    ForgotPasswordDefaultComponent,

    SuccessPasswordRecoverDefaultComponent,

    ForbiddenValidatorDirective,
    ResetPasswordDefaultComponent,
    NgbdModal2Content,

    FooterStoreDefaultComponent,

    BottomNavbarDefaultComponent,

    TopNavbarDefaultComponent,

    CartDefaultComponent,

    HeaderDefaultComponent,

    TopBarDefaultComponent,

    HeartDefaultComponent,

    ShareDefaultComponent,

    CommentDefaultComponent,

    CartInicioComponent,
    HeaderDefaultExampleComponent,
    CartInicioEcommerceImageComponent,
    HeaderTopDefaultComponent,
    GoogleSecondDefaultComponent,
    ChatWindowComponent,
    ChatWindowAuthComponent,
    CommentComponent,
    InitialsPipe,
    HighlightDirective,
    StatusPipe,
    TruncateTextPipe,
    StatusAddPipe,
    StatusRelationshipPipe,
    EmptyTextPipe,
    StatusProviderPipe,
    AmountValidatorDirective,
    AddZerosPipe,
    DateFormatDirective,
    TransformTextPipe,
    PrefixValueDirective
  ],
  imports: [
    CommonModule,
    ColorPickerModule,
    NgbModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule.forRoot({
      echarts,//: () => import('echarts')
    }),
    ColorSketchModule,
    RouterModule,
    LaddaModule,
    ServicesModule,
    HttpModule
  ],
  providers:[]
})
export class SharedModule { }
//https://swimlane.github.io/ngx-charts/#/ngx-charts/bar-vertical
