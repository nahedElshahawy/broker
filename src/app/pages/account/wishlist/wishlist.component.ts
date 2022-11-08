import { Component, OnInit } from '@angular/core';

import { wishlist } from './wishlist.model';
import { wishlistData } from './data';
import { FavoriteService } from 'src/app/services/favorite.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})

/**
 * Wishlist Component
 */
export class WishlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  wishlistData!: wishlist[];

  constructor( private Apifavorites:FavoriteService ) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Account', link:'/account/info' },
      { label: 'Wishlist', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();
  }

  countFav:any
  // Chat Data Fetch
  private _fetchData() {


    this.Apifavorites.getFavoriteAdv().subscribe((res:any) => {

      console.log(res.data);
      this.wishlistData = res.data;
      this.countFav=res.data.length
      if(this.countFav==0){
        Swal.fire({
          position: 'center',
          icon: 'info',
          title: "You Haven't Added Any Advertisements To Favorite",
          showConfirmButton: true,
        })

      }
      })





  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }


    deletfromFavorites(ID:number) {

        this.Apifavorites.deletFavoriteAdv(ID).subscribe((res:any)=>{

        },
        (err: any) =>{
          this._fetchData();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Remove from  Favorite List Successfully',
            showConfirmButton: false,
            timer: 2500
          })
        }
        )


    }





}





