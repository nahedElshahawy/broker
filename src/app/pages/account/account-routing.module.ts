import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { InfoComponent } from "./info/info.component";
import { SecurityComponent } from "./security/security.component";
import { PropertiesComponent } from "./properties/properties.component";
import { WishlistComponent } from "./wishlist/wishlist.component";
import { ReviewsComponent } from "./reviews/reviews.component";
import { NotificationsComponent } from "./notifications/notifications.component";
import { AuthGuard } from 'src/app/guards/auth.guard';
import { RequestsComponent } from './requests/requests.component';

const routes: Routes = [
  {
    path: "info",
    component: InfoComponent,canActivate:[AuthGuard]
  },
  {
    path: "security",
    component: SecurityComponent,canActivate:[AuthGuard]
  },
  {
    path : "properties",
    component: PropertiesComponent,canActivate:[AuthGuard]
  },
  {
    path: "wishlist",
    component: WishlistComponent ,canActivate:[AuthGuard]
  },
  {
    path: "req",
    component:RequestsComponent,canActivate:[AuthGuard]
  },
  {
    path: "reviews",
    component: ReviewsComponent,canActivate:[AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountRoutingModule { }
