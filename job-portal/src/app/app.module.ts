import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthorizationInterceptor } from './services/authorization.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
