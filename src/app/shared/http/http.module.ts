import { NgModule } from '@angular/core';
import { AnalyticHttp } from './analytics.http';
import { AuthHttp } from './auth.http';
import { CatalogHttp } from './catalogs.http';
import { CategoryHttp } from './categories.http';
import { CategoryCatalogsHttp } from './category-catalogs.http';
import { ClientHttp } from './clients.http';
import { CommentHttp } from './comments.http';
import { ContactHttp } from './contacts.http';
import { MarketingCampaignHttp } from './marketing-campaigns.http';
import { OrderAmountsHttp } from './order-amounts.http';
import { OrderDetailsHttp } from './order-details.http';
import { OrderTransactionsHttp } from './order-transactions.http';
import { OrderHttp } from './orders.http';
import { ParameterHttp } from './parameters.http';
import { ProductCatalogsHttp } from './product-catalogs.http';
import { ProductCategoriesHttp } from './product-categories.http';
import { ProductDiscountsHttp } from './product-discounts.http';
import { ProductImagesHttp } from './product-images.http';
import { ProductParametersHttp } from './product-parameters.http';
import { ProductProvidersHttp } from './product-providers.http';
import { ProductUnitsHttp } from './product-units.http';
import { ProductHttp } from './products.http';
import { ProviderHttp } from './providers.http';
import { ReviewHttp } from './reviews.http';
import { StorageHttp } from './storage.http';
import { SubscriptionHttp } from './subscriptions.http';
import { UnitHttp } from './units.http';
import { WAnalyticsHttp } from './w-analytics.http';
import { WCatalogsHttp } from './w-catalogs.http';
import { WCommentsHttp } from './w-comments.http';
import { WContactsHttp } from './w-contacts.http';
import { WNewsletterSubscriptionsHttp } from './w-newsletter-subscriptions.http';
import { WOrderHttp } from './w-orders.http';
import { WParameterHttp } from './w-parameters.http';
import { WProductsHttp } from './w-products.http';
import { WReviewsHttp } from './w-reviews.http';
@NgModule({
  imports: [],
  providers: [
    AuthHttp,
    CategoryHttp,
    CatalogHttp,
    CategoryCatalogsHttp,
    ContactHttp,
    UnitHttp,
    ClientHttp,
    ProviderHttp,
    AnalyticHttp,
    MarketingCampaignHttp,
    SubscriptionHttp,
    CommentHttp,
    ReviewHttp,
    ParameterHttp,
    ProductHttp,
    ProductCategoriesHttp,
    ProductUnitsHttp,
    ProductProvidersHttp,
    ProductDiscountsHttp,
    ProductImagesHttp,
    ProductParametersHttp,
    OrderHttp,
    OrderAmountsHttp,
    OrderDetailsHttp,
    OrderTransactionsHttp,
    ProductCatalogsHttp,
    WParameterHttp,
    WCatalogsHttp,
    WProductsHttp,
    WContactsHttp,
    WNewsletterSubscriptionsHttp,
    WAnalyticsHttp,
    WReviewsHttp,
    WCommentsHttp,
    WOrderHttp,
    StorageHttp
  ],
})
export class HttpModule {}
