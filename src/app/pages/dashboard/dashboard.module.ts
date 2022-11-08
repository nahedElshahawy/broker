import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Home1Component } from './home1/home1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule, NgbProgressbarModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Ngx Sliders
import { NgxSliderModule } from '@angular-slider/ngx-slider';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// Modules
import { DashboardsRoutingModule } from "./dashboard-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { Home2Component } from './home2/home2.component';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    Home1Component,
    Home2Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbTooltipModule,
    NgxSliderModule,
    DashboardsRoutingModule,
    SharedModule,
    SwiperModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class DashboardModule { }
