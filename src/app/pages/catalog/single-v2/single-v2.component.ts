import { Component, OnInit } from '@angular/core';

import { apartments, recently } from './single-v2.model';
import { apartmentsData, recentlyData  } from './data';
import { ActivatedRoute } from '@angular/router';
import { AdversmentSService } from 'src/app/services/adversment-s.service';
import { IviewAdv } from 'src/app/models/iadve';
import Swal from 'sweetalert2';
import { FavoriteService } from 'src/app/services/favorite.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAccount } from 'src/app/models/user-account';

@Component({
  selector: 'app-single-v2',
  templateUrl: './single-v2.component.html',
  styleUrls: ['./single-v2.component.scss']
})

/**
 * SingleV2 Component
 */
export class SingleV2Component implements OnInit {
  IDv:number = (this.activroute.snapshot.paramMap.get("id"))?Number (this.activroute.snapshot.paramMap.get("id")) : 0;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  apartmentsData!: apartments[];
  recentlyData!: recently[];
  public firstColleaps = true;

  id = 'dofyR9p8e7w';
  private player: any;
  private ytEvent : any;
  user!:UserAccount;

  constructor(private activroute:ActivatedRoute , private advapi:AdversmentSService,private ApiFav:FavoriteService ,private accountservice: AuthenticationService) {


    this.accountservice.user.subscribe(x => this.user = x);

  }

  ngOnInit(): void {

        this.getbyID();

     /**
     * BreadCrumb
     */
      this.breadCrumbItems = [
        { label: 'Home', link:'' },
        { label: 'Property for rent', link:'/catalog/rent' },
        { label: '', active: true }
      ];

    // Data Get Function
    this._fetchData();
  }

   // Data Fetch
   private _fetchData() {
    this.apartmentsData = apartmentsData;
    this.recentlyData = recentlyData;
  }

  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    navigation: true
  };

  /**
   * Swiper setting
   */
   recently = {
    initialSlide: 0,
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: true,
    navigation: true,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 4,
      }
    }
  };

  // Youtube Player
  onStateChange(event: any) {
    this.ytEvent = event.data;
  }
  savePlayer(player: any) {
    this.player = player;
  }
  playVideo() {
    this.player.playVideo();
  }
  pauseVideo() {
    this.player.pauseVideo();
  }

  da:any;
  advers: IviewAdv[]=[];

  getbyID(){
    this.advapi.getadvbyid(this.IDv).subscribe(
      data => {
        //  console.log(data);
          this.da=data;
          this.advers=this.da.data;
        // this.booked=this.da.data.booked;
        console.log(this.advers);


      },
      error =>{
        // console.log(error);

      }
    )}


    addtofav(ID:number){
      if(this.user==null){
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "You must be logged in to  add to favorites",
          })

          return;
      }

      this.ApiFav.addtoFavorte(ID).subscribe((data:any) =>{
        if(data.code==0){
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: data.message,
            showConfirmButton: false,
            timer: 2500
            })

        }else if(data.code==1){

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 2500
            })
        }

      },
      error =>{
        console.log(error);

      }

      )
  }


}
