import { Injectable } from '@angular/core';
import { WAnalyticsHttp } from '../http/w-analytics.http';
import { CommonUtils } from '../utils/common.utils';

@Injectable({
    providedIn: 'root'
})
export class AnalyticsService {

    constructor(private wAnalyticsHttp: WAnalyticsHttp) { }

    sendForAnalytics(page: string, query?: string) {
        const item = {
            visitedPage: query ? `${page}?${query}` : page,
            visitedDate: CommonUtils.getDayNow()
        };
        this.wAnalyticsHttp.addWAnalytics(item).subscribe();
    }
}
