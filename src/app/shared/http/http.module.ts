import { NgModule } from '@angular/core';
import { AnalyticHttp } from './analytics.http';
import { AuthGuardHttp } from './auth-guard.http';
import { AuthHttp } from './auth.http';
import { AuthorizationHttp } from './authorization.http';
import { CatalogHttp } from './catalogs.http';
import { CategoryHttp } from './categories.http';
import { CategoryCatalogsHttp } from './category-catalogs.http';
import { ClientHttp } from './clients.http';
import { CommentHttp } from './comments.http';
import { MarketingCampaignHttp } from './marketing-campaigns.http';
import { ParameterHttp } from './parameters.http';
import { ProductCategoriesHttp } from './product-categories.http';
import { ProductProvidersHttp } from './product-providers.http';
import { ProductUnitsHttp } from './product-units.http';
import { ProductHttp } from './products.http';
import { ProviderHttp } from './providers.http';
import { ReviewHttp } from './reviews.http';
import { SubscriptionHttp } from './subscriptions.http';
import { UnitHttp } from './units.http';
@NgModule({
  imports: [],
  providers: [
    AuthGuardHttp,
    AuthorizationHttp,
    AuthHttp,
    CategoryHttp,
    CatalogHttp,
    CategoryCatalogsHttp,
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
    ProductProvidersHttp
  ],
})
export class HttpModule {}
