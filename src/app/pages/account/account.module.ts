import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAccordionModule, NgbDropdownModule, NgbNavModule, NgbRatingModule, NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Drop Zone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Component
import { AccountRoutingModule } from "./account-routing.module";
import { SharedModule } from "../../shared/shared.module";
import { InfoComponent } from './info/info.component';
import { SecurityComponent } from './security/security.component';
import { PropertiesComponent } from './properties/properties.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NgxStarsModule } from 'ngx-stars';

import { SortByAccountPipe } from '../account/sort-by.pipe';
import { RequestsComponent } from './requests/requests.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';



@NgModule({
  declarations: [
    InfoComponent,
    SecurityComponent,
    PropertiesComponent,
    WishlistComponent,
    ReviewsComponent,
    NotificationsComponent,
    SortByAccountPipe,
    RequestsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbRatingModule,
    NgbCollapseModule,
    NgbTooltipModule,
    SharedModule,
    AccountRoutingModule,
    DropzoneModule,
    NgxStarsModule
  ],
  providers: [
    DatePipe
  ]
})
export class AccountModule { }
