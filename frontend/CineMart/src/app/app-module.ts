import { NgModule, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations} from '@angular/platform-browser/animations';
import {HttpClient,HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import {authInterceptor} from './core/interceptors/auth-interceptor.service';
import {loadingBarInterceptor} from './core/interceptors/loading-bar-interceptor.service';
import {errorLoggingInterceptor} from './core/interceptors/error-logging-interceptor.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {CustomTranslateLoader} from './core/services/custom-translate-loader';
import {materialModules} from './modules/shared/material-modules';
import {SharedModule} from './modules/shared/shared-module';
import { MyMoviesComponent } from './pages/my-movies/my-movies.component';
import { CommonModule } from '@angular/common';
import { ClientModule } from './modules/client/client-module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    ClientModule,
    AppRoutingModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new CustomTranslateLoader(http),
        deps: [HttpClient]
      }
    }),
    SharedModule,
    materialModules,
  ],
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection(),
    provideHttpClient(
      withInterceptors([
        loadingBarInterceptor,
        authInterceptor,
        errorLoggingInterceptor
      ])
    )
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
