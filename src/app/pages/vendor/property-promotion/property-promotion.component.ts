import { Component, OnInit } from '@angular/core';

import { promotion } from './property-promotion.model';
import { promotionData } from './data';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-promotion',
  templateUrl: './property-promotion.component.html',
  styleUrls: ['./property-promotion.component.css']
})

/**
 * Property Promotion Component
 */
export class PropertyPromotionComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  promotionData!: promotion[];
   type='';
   plan='';
   handler:any = null;
  constructor(private http: HttpClient,private toastr: ToastrService,private router:Router) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Add property ', link:'/vendor/add-property' },
      { label: 'Promotion page', active: true }
    ];

     // Chat Data Get Function
     this._fetchData();
     this.get_plan();
  }

  // Chat Data Fetch
  private _fetchData() {
    this.promotionData = promotionData;
  }

  result:any = 0;
  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkboxes:any = document.getElementsByName('checkAll');
    this.result = 0
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        this.result += parseInt(checkboxes[i].value);
      }
    }
  }


get_type (type:string){

this.type=type;
console.log(this.type);


}


pay(){
  const http=this.http
  const toastr=this.toastr
  const type=this.type;
  const router=this.router;
  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51LHFSYD9D6CVszHYjRbT1lgMqgkmEwmSaPv6e0GreRBILC2ohwoajs03RnufuJp9AH773MPA7CKcPUbTPnvfUoZU00cSmCefpj',
    locale: 'auto',
    token: function (token: any) {
   
 
      http.post('http://localhost:8000/api/premUser', {
      type:type,
        token:token.id,
      }) .subscribe(
        (data:any)=>{
          if(data.code ==1){
           toastr.success(data.msg, 'your promotion  done successfuly')
      
           router.navigate(['/']);

          }
          else{
           toastr.error(data.error, 'error try again please')
            
          }
        },
        (error:any)=>{
          console.log(error)
         toastr.error( 'error try again please')
  
        }
  
  
      )
    }

    
  });
 


  handler.open({
    name: 'payment add',
    description: 'master card',
    //amount: amount * 100
  });
}



get_plan(){


  this.http.get(`http://localhost:8000/api/plan`).subscribe(

    (data:any)=>{
      if(data.code ==0){

  console.log(data.errore);
  
      }else{
        console.log(data.data);
        if (data.data=='')
        this.plan='non';
        else this.plan=data.data[0].type;
        console.log(this.plan);
      }
    },
    (error:any)=>{
    console.log(error);

    })
}

















loadStripe() {
     
  if(!window.document.getElementById('stripe-script')) {
    var s = window.document.createElement("script");
    s.id = "stripe-script";
    s.type = "text/javascript";
    s.src = "https://checkout.stripe.com/checkout.js";
    s.onload = () => {
      this.handler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51LHFSYD9D6CVszHYjRbT1lgMqgkmEwmSaPv6e0GreRBILC2ohwoajs03RnufuJp9AH773MPA7CKcPUbTPnvfUoZU00cSmCefpj',
        locale: 'auto',
        token: function (token: any) {
        }
      });
    }
     
    window.document.body.appendChild(s);
  }
}

}
