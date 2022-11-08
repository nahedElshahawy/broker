import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

// Light Box
import { Lightbox } from 'ngx-lightbox';

import { aboutReviews, recently, vselledet } from './single-v1.model';
import { aboutReviewData, recentlyData  } from './data';
import { ActivatedRoute } from '@angular/router';
import { AdversmentSService } from 'src/app/services/adversment-s.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Addrev } from 'src/app/models/addrev';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAccount } from 'src/app/models/user-account';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-single-v1',
  templateUrl: './single-v1.component.html',
  styleUrls: ['./single-v1.component.scss']
})

/**
 * SingleV1 Component
 */
export class SingleV1Component implements OnInit {
  IDv:number = (this.activroute.snapshot.paramMap.get("id"))?Number (this.activroute.snapshot.paramMap.get("id")) : 0;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  aboutReviewData!: aboutReviews[];
  recentlyData!: recently[];
  public overviewColleaps = true;
  public amenitiesColleaps = true;
  //  Validation form
  validationform!: UntypedFormGroup;
  signUpform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;
  longitude = 20.728218;
  latitude = 52.128973;
  _album: Array<any> = [];
  i:any;
  t:any;

  addre:Addrev={} as Addrev;
  user!:UserAccount;

  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder, private _lightbox: Lightbox,private activroute:ActivatedRoute , private advapi:AdversmentSService , private Apireviews:ReviewsService,private accountservice: AuthenticationService ,private ApiFav:FavoriteService) {



    this.accountservice.user.subscribe(x => this.user = x);


    for (let i = 4; i <= 8; i++) {
      const src = 'assets/img/city-guide/single/th0' + i + '.jpg';
      const caption = 'Image ' + i + ' caption here';
      const thumb = 'assets/img/city-guide/single/th0' + i + '.jpg';
      const album = {
         src: src,
         caption: caption,
         thumb: thumb
      };

      this._album.push(album);
    }





  }

  ngOnInit(): void {


      this.getbyID();
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Property for rent', link:'/catalog/rent' },
      { label: 'Pine Apartments', active: true }
    ];

     /**
     * Bootstrap validation form data
     */
      this.validationform = this.formBuilder.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required]],
      });

    /**
     * Bootstrap validation form data
     */
     this.signUpform = this.formBuilder.group({

      rating: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    // Data Get Function
    this._fetchData();
  }

   // Data Fetch
    countReviews:any;

   private _fetchData() {

        this.Apireviews.getreviewsofAdv(this.IDv).subscribe((res:any)=>{

          console.log(res.data);
          this.aboutReviewData = res.data;
          this.countReviews=res.data.length;

        })



    this.recentlyData = recentlyData;
  }


  /**
   * Open Review modal
   * @param reviewContent modal content
   */
   openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { centered: true });
  }

  /**
   * Open Review modal
   * @param content modal content
   */
   openMapModal(content: any) {
    this.modalService.open(content, { size: 'fullscreen', centered: true });
  }

  /**
   * Swiper setting
   */
   config = {
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

  /**
  * Bootsrap validation form submit method
  */
   validSubmit() {
    this.submit = true;
  }

  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

  /**
   * Bootstrap tooltip form validation submit method
   */
   formSubmit() {


      if(this.user == null) {
        Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "You must be logged in to add review ",
              })

              return;
      }



    this.formsubmit = true;

    if(this.validationform.invalid){

      return;
    }

      console.log(this.formData["rating"].value, this.formData["message"].value ,this.IDv ,this.user_id);

      this.addre.advert_id = this.IDv;
      this.addre.user_id = this.user_id;
      this.addre.review = this.formData["message"].value;
      this.addre.value = this.formData["rating"].value;


      this.Apireviews.addreviews( this.addre).subscribe(data => {

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: "add review successfully",
          showConfirmButton: false,
          timer: 4500
        })
      },
      (error:any)=>{

        Swal.fire({
          position: 'center',
          icon: 'error',
          title: error.error.message,
          showConfirmButton: false,
          timer: 4500
        })


      }



      )







  }

  /**
   * returns tooltip validation form
   */
   get formData() {
    return this.signUpform.controls;
  }

  open(index: number): void {
    // open lightbox
    this._lightbox.open(this._album, index);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  customOpen(a: any): void {
    // open lightbox
    this._lightbox.open(this._album, a);
  }

  // Sort filter
  sortField:any;
  sortBy:any
  SortFilter(){
    this.sortField = (document.getElementById("reviews-sorting") as HTMLInputElement).value;
    if (this.sortField[0] == 'A') {
      this.sortBy = 'desc';
      this.sortField = this.sortField.replace(/A/g, '')
    }
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }


  da:any;
  advers: vselledet[]=[];
  uservalue: any;
  user_id!:number;

  getbyID(){
    this.advapi.getadvsellbyid(this.IDv).subscribe(
      data => {
          this.da=data;
          this.advers=this.da.data;
          this.uservalue=this.da.data[0].value;
          this.user_id=this.da.data[0].user_id;

        // console.log(this.advers);


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
