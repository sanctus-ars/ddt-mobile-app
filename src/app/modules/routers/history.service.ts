import { filter } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { Router, NavigationEnd, Event, ActivatedRoute, NavigationExtras } from '@angular/router';

import { HistoryRouterModel } from 'src/app/shared/models/history.router.model';

@Injectable({
	providedIn: 'root'
})
export class HistoryService implements OnDestroy {
	private historyObj: BehaviorSubject<HistoryRouterModel[]> = new BehaviorSubject([]);
	private routerEventsSub: Subscription;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
	) { }

	public ngOnDestroy(): void {
		if (this.routerEventsSub) { this.routerEventsSub.unsubscribe(); }
	}

	public loadHistory(): void {
		this.routerEventsSub = this.router.events
			.pipe(
				filter((event: Event) => event instanceof NavigationEnd),
			)
			.subscribe(({urlAfterRedirects, url}: NavigationEnd) => {

				const routeConfig = this.activatedRoute.root.firstChild.routeConfig;

				const routeUrl = urlAfterRedirects;
				const routeLabel = routeConfig && routeConfig.data ? routeConfig.data.label : 'Home';
				const routePath = url;

				const historyItem = new HistoryRouterModel(routeUrl, routeLabel, routePath);

				this.historyObj.next([...this.historyObj.value, historyItem]);
			});
	}

	get getHistory(): Observable<HistoryRouterModel[]> {
		return this.historyObj;
	}
	get getHistoryValue(): HistoryRouterModel[] {
		return this.historyObj.value;
	}

	public goBack(): void {
		const currentHistory = this.historyObj.value;
		const lastRouterNumber = -2;
		const lastRouterIndex = currentHistory.length <= 1 ? 0 : lastRouterNumber;
		const lastRouterItem: HistoryRouterModel = currentHistory.slice(lastRouterIndex)[0];
		this.router.navigate([lastRouterItem.url]);
	}

	public goToError(): void {
		this.goTo('/404', { skipLocationChange: true });
	}

	public goTo(url: string, extras?: NavigationExtras): void {
		if (!url) { return; }
		this.router.navigate([url], extras);
	}
}
