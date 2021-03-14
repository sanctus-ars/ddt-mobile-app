import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { PagesModule } from 'src/app/pages/pages.module';
import { authReducer } from './modules/auth/store/auth.reducer';
import { loadingReducer } from './core/loading/store/loading.reducer';
import { historyReducer } from './modules/routers/store/history.reducers';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { LoadingEffects } from './core/loading/store/loading.effects';
import { HistoryEffects } from './modules/routers/store/history.effects';
import { HistoryService } from './modules/routers/history.service';
import { environment } from 'src/environments/environment';
import { StoreModule } from '@ngrx/store';
import { AuthModule } from './modules/auth/auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { ToastContainerModule, ToastrModule } from 'ngx-toastr';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from 'src/app/modules/user/store/user.effects';
import { userReducer } from 'src/app/modules/user/store/user.reducers';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function createTranslateLoader(http: HttpClient ) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const store  = {
	auth: authReducer,
	user: userReducer,
	loading: loadingReducer,
	history: historyReducer,
};

const effects = [
	AuthEffects,
	UserEffects,
	LoadingEffects,
	HistoryEffects,
];
const services = [
	HistoryService,
];

const modules = [
	BrowserModule,
	AppRoutingModule,
	CoreModule,
	PagesModule,
	SharedModule,
	IonicModule.forRoot(),
	HttpClientModule,
	FontAwesomeModule,
	TranslateModule.forRoot({
		loader: {
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [ HttpClient ]
		}
	}),
	ReactiveFormsModule,
	ToastContainerModule,
	AuthModule.forRoot(),
	ToastrModule.forRoot(),
	StoreModule.forRoot(store),
	EffectsModule.forRoot([ ...effects ]),

	StoreDevtoolsModule.instrument({
		maxAge: 25,
		logOnly: environment.production,
	}),
];

@NgModule({
	declarations: [AppComponent],
	entryComponents: [],
	imports: [
			...modules,
			BrowserAnimationsModule
	],
	providers: [
		...services,
		StatusBar,
		SplashScreen,
		{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(iconLibrary: FaIconLibrary) {
		iconLibrary.addIconPacks(fas, fab, far);
	}
}
