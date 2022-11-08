import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

// Range Slider
import { Options } from '@angular-slider/ngx-slider';

// Swiper Slider
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';

import { topOffer, propertyCity, estateAagents, service, companies } from './home1.model';
import { topOfferData, cityData, agentsData, servicesData, companiesData } from './data';
import { Router } from '@angular/router';
import { AdversmentSService } from 'src/app/services/adversment-s.service';

@Component({
  selector: 'app-index',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.scss']
})

/**
 * Index Component
 */
export class Home1Component implements OnInit {

  topOfferData!: topOffer[];
  cityData!: propertyCity[];
  agentsData!: estateAagents[];
  servicesData!: service[];
  companiesData!: companies[];
  foor:any;
  locc:any;
  typ:any;

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor( private modalService: NgbModal ,private router: Router,private Apiadv:AdversmentSService) {



  }

  ngOnInit(): void {
     // Chat Data Get Function
     this._fetchData();
     this.filterredImages = this.list;

     // Rent Select data
     document.getElementById("rent-content")?.addEventListener("click",function(e) {
       const input = e.target as HTMLElement;
       const rent = document.querySelector('.rent') as HTMLElement;
       rent.innerText = input.innerText;




      }
      );

      // const rent = document.querySelector('.rent') as HTMLElement;
        this.foor= document.getElementById("cv");
        this.locc= document.getElementById("loc");
        this.typ= document.getElementById("type");


     // Location Select data
     document.getElementById("location-content")?.addEventListener("click",function(e) {
      const input = e.target as HTMLElement;
      const location = document.querySelector('.location') as HTMLElement;
      location.innerText = input.innerText;
     });

     // Property Select data
     document.getElementById("property-content")?.addEventListener("click",function(e) {
      const input = e.target as HTMLElement;
      const property = document.querySelector('.property') as HTMLElement;
      property.innerText = input.innerText;
     });

  }

   // Chat Data Fetch
   private _fetchData() {
   
    this.Apiadv.viewPremAd().subscribe((res:any)=>{

      this.topOfferData= res.data;
     
        
       
        
    })


    this.cityData = cityData;
    this.agentsData = agentsData;
    this.servicesData = servicesData;
    this.companiesData = companiesData;
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
   * Service Swiper setting
   */
   service = {
    initialSlide: 0,
    slidesPerView: 1,
    pagination: true,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2,
      },
      1200:{
        slidesPerView: 3,
      }
    }
  };

  /**
   * partners Swiper setting
   */
   partners = {
    initialSlide: 0,
    slidesPerView: 6,
    spaceBetween: 25
  };

  /**
   * agents Swiper setting
   */
   agents = {
    initialSlide: 0,
    slidesPerView: 1,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  /**
   * Swiper setting
   */
   companies = {
    initialSlide: 0,
    slidesPerView: 2,
    spaceBetween: 25,
    pagination: true,
    loop:true,
    breakpoints:{
      768:{
        slidesPerView: 4,
      },
      1200:{
        slidesPerView: 6,
      }
    }
  };

  /**
  * Slider range set
  */
   visibleSelection = 1000;
   visibleBarOptions: Options = {
     floor: 500,
     ceil: 10000,
     showSelectionBar: true
   };
   /**
   * Portfolio Modern Data
   */
    filterredImages: { image: string; verified_btn?: string; btn: string; btn_color: string; sale: string; title: string; location: string; price: string; category: string;}[] | undefined;
    galleryFilter = 'Houses';
    list = [{
      image: 'assets/img/real-estate/recent/01.jpg',
      verified_btn: 'Verified',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For rental',
      title: 'Luxury Rental Villa',
      location: '118-11 Sutphin Blvd Jamaica, NY 11434',
      price: '$3,850',
      category: 'Houses'
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: '$200,410',
      category: 'Houses',
    },
    {
      image: 'assets/img/real-estate/recent/03.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Country House',
      location: '6954 Grand AveMaspeth, NY 11378',
      price: '$162,000',
      category: 'Houses',
    },
    {
      image: 'assets/img/real-estate/recent/01.jpg',
      verified_btn: 'Verified',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For rental',
      title: 'Luxury Rental Villa',
      location: '118-11 Sutphin Blvd Jamaica, NY 11434',
      price: '$3,850',
      category: 'Rooms'
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: '$200,410',
      category: 'Commercial',
    },
    {
      image: 'assets/img/real-estate/recent/02.jpg',
      verified_btn: '',
      btn: "New",
      btn_color: "bg-info",
      sale: 'For sale',
      title: 'Duplex with Garage',
      location: '21 Pulaski Road Kings Park, NY 11754',
      price: '$200,410',
      category: 'Apartments',
    }
    ];


   /***
   * Active all category selected
   */
  activeCategory(category: string) {
    this.galleryFilter = category;
    if (this.galleryFilter === 'Houses') {
      this.filterredImages = this.list.filter(x => x.category === this.galleryFilter);
    } else {
      this.filterredImages = this.list.filter(x => x.category === this.galleryFilter);
    }
  }

  /**
   * Open modal
   * @param content modal content
   */
   openModal(content: any) {
    this.modalService.open(content, { centered: true });
  }


  amr: number=2;


  sear(){

      if (this.locc.innerText === 'Location' || this.typ.innerText === 'Property type') {

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Select Location And Property Type ',
          showConfirmButton: false,
          timer: 4500

        })

        return;
      }



      const url =`/catalog/search/${this.foor.innerText}/${this.locc.innerText}/${this.typ.innerText}/${this.visibleSelection}`
      this.router.navigate([url]);

    // console.log( `${this.foor.innerText} "+" ${this.locc.innerText}"+" ${this.typ.innerText}"+" ${this.visibleSelection}` );

    // console.log(this.form.getRawValue());
  }









}
