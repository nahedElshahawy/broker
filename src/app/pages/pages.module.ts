import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Page Routing
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from "../shared/shared.module";
import { NgxStarsModule } from 'ngx-stars';

// Light Box
import { LightboxModule } from 'ngx-lightbox';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    LightboxModule,
    NgxStarsModule
  ]
})
export class PagesModule { }
