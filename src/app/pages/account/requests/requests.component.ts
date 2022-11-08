import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  sented=Array();
  recived=Array();
  handler:any = null;
  constructor(private http: HttpClient,private toastr: ToastrService) { }

  ngOnInit() {
this.get_sented();
  this.get_reciveded();
    this.breadCrumbItems = [
     { label: 'Home', link:'' },
     { label: 'Account', link:'/account/info' },
     { label: 'My requests', active: true }
   ];

  }

  get_sented(){

    this.http.get(`http://localhost:8000/api/sented`).subscribe(

      (data:any)=>{
        if(data.code ==0){

    console.log(data.errore);
    
        }else{
          console.log(data.data);
          this.sented=data.data;
          console.log(this.sented);
        }
      },
      (error:any)=>{
      console.log(error);

      })
  }


cancel(req_id:number,i:number){

  this.http.delete(`http://localhost:8000/api/deleteReq/${req_id}`).subscribe(

    (data:any)=>{
      if(data.code ==0){

  console.log(data.errore);
  
      }else{


        this.sented.splice(i,1);
        console.log(data.message);
        this.toastr.success('canceling done', 'Toastr fun!');
  
      }
    },
    (error:any)=>{
    console.log(error);

    })
}


// recived side


get_reciveded(){

  this.http.get(`http://localhost:8000/api/recived`).subscribe(

    (data:any)=>{
      if(data.code ==0){

  console.log(data.errore);
  
      }else{
        console.log(data.data);
        this.recived=data.data;
      
      }
    },
    (error:any)=>{
    console.log(error);

    })
}


reject(req_id:number,i:number){

  this.http.delete(`http://localhost:8000/api/rejectReq/${req_id}`).subscribe(

    (data:any)=>{
      if(data.code ==0){

  console.log(data.errore);
  
      }else{


        this.recived.splice(i,1);
        this.toastr.success('you are successfully rejected this request', ' fun!');
  
      }
    },
    (error:any)=>{
    console.log(error);

    })



}

confirm(req_id:number,i:number){

  this.http.delete(`http://localhost:8000/api/confirmReq/${req_id}`).subscribe(

    (data:any)=>{
      if(data.code ==0){

  console.log(data.errore);
  
      }else{


        this.recived.splice(i,1);
        this.toastr.success('confirmed', ' fun!');
  
      }
    },
    (error:any)=>{
    console.log(error);

    })



}


req_again(req_id:number,i:number){

      

  this.http.delete(`http://localhost:8000/api/reReq/${req_id}`).subscribe(

    (data:any)=>{
      if(data.code ==0){

  console.log(data.errore);
  
      }else{


        this.sented[i].statue='waiting';

        
        this.toastr.success(' your request added again', ' fun!');
  
      }
    },
    (error:any)=>{
    console.log(error);

    })






}

//payment


pay(adver_id:number,user_id:number,price:number,i:number){
  const http=this.http
  const toastr=this.toastr
  
  var handler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51LHFSYD9D6CVszHYjRbT1lgMqgkmEwmSaPv6e0GreRBILC2ohwoajs03RnufuJp9AH773MPA7CKcPUbTPnvfUoZU00cSmCefpj',
    locale: 'auto',
    token: function (token: any) {
   
 
      http.post('http://localhost:8000/api/pay', {
        user_id: user_id,
        adver_id:adver_id,
        price:price,
        token:token.id,
      }) .subscribe(
        (data:any)=>{
          if(data.code ==1){
           toastr.success(data.msg, 'your payment  done successfuly')
      


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
  this.sented.splice(i,1);


  handler.open({
    name: 'payment add',
    description: 'master card',
    //amount: amount * 100
  });
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



