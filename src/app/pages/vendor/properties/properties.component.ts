import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { topOffer, sale, person } from './properties.model';
import { rentData, saleData } from './data';
import { VedorInfoService } from 'src/app/services/vedor-info.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAccount } from 'src/app/models/user-account';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})

/**
 * Properties Component
 */
export class PropertiesComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  rentData!: topOffer[];
  saleData!: sale[];
  showNavigationIndicators: any;
  public overviewColleaps = true;
   //  Validation form
   validationform!: UntypedFormGroup;
   submit!: boolean;
   formsubmit!: boolean;
   user!:UserAccount;
   from= '';
   message='';
   name!:string;
   prsonda:person[]=[] ;
   salladv:sale[]=[];
   rentadv:sale[]=[];

   IDv:number = (this.activroute.snapshot.paramMap.get("id"))?Number (this.activroute.snapshot.paramMap.get("id")) : 0;


  constructor(private modalService: NgbModal, private formBuilder: UntypedFormBuilder 
    ,private ApiVendor: VedorInfoService,private activroute:ActivatedRoute,
    private http: HttpClient,public datepipe: DatePipe,private accountservice: AuthenticationService) {
      this.accountservice.user.subscribe(x => this.user = x);
    console.log(this.user);
    this.from=`${this.user.user_id}`;




     }


  ngOnInit(): void {


    this.ApiVendor.getuserdata(this.IDv).subscribe((data:any) => { this.prsonda = data;
      this.name=this.prsonda[0].name;
      this.breadCrumbItems = [
        { label: 'Home', link:'' },
        { label: 'Agents', link:'/vendor/properties/'+this.IDv },
        { label: this.name, active: true }
      ];


    });
    this.ApiVendor.getuserSellAdv(this.IDv).subscribe((data:any) => { this.salladv = data.data;    });
    this.ApiVendor.getuserRentAdv(this.IDv).subscribe((data:any) => { this.rentadv = data.data;    });



    /**
     * BreadCrumb
     */


     /**
     * Bootstrap validation form data
     */
      this.validationform = this.formBuilder.group({
        message: ['', [Validators.required]],
      });

     // Chat Data Get Function
     this._fetchData();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.rentData = this.rentadv;
    this.saleData = this.salladv;
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
   this.modalService.open(content, { centered: true });
    
    
    
  }

  /**
   * Swiper setting
   */
   config = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    loop:true
  };

  /**
   * Swiper setting
   */
   saleSlider = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: true,
    loop:true
  };

  /**
  * Bootsrap validation form submit method
  */
   validSubmit() {
    this.submit = true;
     this.message=this.validationform.get('message')?.getRawValue();
  


    let currentDateTime =this.datepipe.transform((new Date), 'MMM d,yy, h:mm a');
  
    console.log(currentDateTime);

    
    this.http.post('http://localhost:8000/api/messages', {
   
      message: this.message,
      from:this.from,
      to:this.IDv,
      created_at:currentDateTime
    }).subscribe(() =>{ this.message = '';
    this.modalService.dismissAll();
  
  });











  }

  /**
 * Returns form
 */
  get form() {
 
    return this.validationform.controls; 
  
    
  }

  // Sort filter
  sortField:any;
  sortBy:any
  SortFilter(){
    this.sortField = (document.getElementById("sortby") as HTMLInputElement).value;
    if (this.sortField[0] == 'A') {
      this.sortBy = 'desc';
      this.sortField = this.sortField.replace(/A/g, '')
    }
    if (this.sortField[0] == 'D') {
      this.sortBy = 'asc';
      this.sortField = this.sortField.replace(/D/g, '')
    }
  }


  goo(){

    
  }










}
