import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbCarouselModule,NgbTooltipModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Swiper Slider
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// Search Filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// Component
import { ExtraPagesRoutingModule } from "./extrapages-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { AboutComponent } from './about/about.component';
import { BlogGridComponent } from './blog-grid/blog-grid.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { ContactsComponent } from './contacts/contacts.component';
import { HelpCenterComponent } from './help-center/help-center.component';
import { SortByExtraPagesPipe } from '../extrapages/sort-by.pipe';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AboutComponent,
    BlogGridComponent,
    SingleBlogComponent,
    ContactsComponent,
    HelpCenterComponent,
    SortByExtraPagesPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbCarouselModule,
    NgbTooltipModule,
    NgbPaginationModule,
    Ng2SearchPipeModule,
    ExtraPagesRoutingModule,
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
export class ExtrapagesModule { }
