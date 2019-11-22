import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';

import { HeaderInterceptor } from './interceptors/header.interceptor';
// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
// modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@app/core/core.module';
import { SharedModule } from './shared/shared.module';
// guards
import * as fromGuards from './guards';
// page components
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JwtInterceptor } from '@app/authentication/jwt.interceptor';
import { FileUploadModule } from 'ng2-file-upload';

export const metaReducers: any[] = !environment.production ? [storeFreeze] : [];

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true
  },
];

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    FileUploadModule,
    AppRoutingModule,
    StoreModule.forRoot([], {metaReducers}),
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap: [AppComponent],
  providers: [
    ...fromGuards.guards,
    httpInterceptorProviders,
  ],
})
export class AppModule {
}
