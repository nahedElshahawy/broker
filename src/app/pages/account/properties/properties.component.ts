import { Component, OnInit } from '@angular/core';

import { Prof } from '../../../models/prof';
import { properties } from './properties.model';
import { propertiesData } from './data';
import { SprofileService } from 'src/app/services/sprofile.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
  propertiesData!: properties[];
  propertiesDatadelet!: properties[];
  test!: properties[];
  plan='';
  user_id='';
  premIds=Array();
  prof:Prof={} as Prof;
  constructor(private ApiPro:SprofileService ,private http: HttpClient,private toastr: ToastrService,private router:Router) { }
  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Account', link:'/account/info' },
      { label: 'My Properties', active: true }
    ];

    // Chat Data Get Function
    this._fetchData();

    this.get_plan();
    this.get_Ids();
  }

   // Chat Data Fetch
   private _fetchData() {



    this.ApiPro.getuserprofile().subscribe((user:any) => {

        this.prof.name=user.data[0].name;
        this.prof.image=user.data[0].image;
        this.prof.value=user.data[0].value;
        this.prof.phone=user.data[0].phone;
        this.prof.email=user.data[0].email;
        console.log(this.prof.value);

      })






    this.ApiPro.viewAdvForUser().subscribe((res:any)=>{

      this.test= res.data;
      // console.log(this.test);
        // this.topOfferDatas = Object.assign([], this.topOfferData);
        this.propertiesData =  this.test;
          // console.log(this.propertiesData[0].image);
    })
    this.ApiPro.viewAdvdeleted().subscribe((res:any)=>{

      this.propertiesDatadelet= res.data;
      // console.log(this.propertiesDatadelet);
        // this.topOfferDatas = Object.assign([], this.topOfferData);
        // this.propertiesData =  this.test;
          // console.log(this.propertiesData[0].image);
    })





  }




  get_plan(){


    this.http.get(`http://localhost:8000/api/plan`).subscribe(
  
      (data:any)=>{
        if(data.code ==0){
  
        }else{
     
          if (data.data=='')
          this.plan='non';
          else {this.plan=data.data[0].type;
          this.user_id=data.data[0].id;
          }
        }
      },
      (error:any)=>{
  
      })
  }





  get_Ids(){
    this.http.get(`http://localhost:8000/api/premIds`).subscribe(
  
      (data:any)=>{
        if(data.code ==0){
  
        }else{
       this.premIds=data.data;
        
        }
      },
      (error:any)=>{
  console.log(error);
  
      })
  }

   





  promote(adver_id:any){
    console.log('dddd');
    
    this.http.post(`http://localhost:8000/api/AddPremAdver`,
    {
      type:this.plan,
       user_id:this.user_id,
      "adver_id":adver_id
    }).subscribe(
  
      (data:any)=>{
        if(data.code ==0){
          this.toastr.error(` error ${data.error} `, 'failure');
        }else{
          Swal.fire({
            title: 'succsess!',
            text: `promotin done succsessfully  (${data.data}) remaining promotions available `,
            icon: 'success',
            confirmButtonText: 'ok',
            showClass:{
              popup: 'swal2-show',
              backdrop: 'swal2-backdrop-show',
              icon: 'swal2-icon-show'
            },
            hideClass:{
              popup: 'swal2-hide',
              backdrop: 'swal2-backdrop-hide',
              icon: 'swal2-icon-hide'
            }
          })
          //this.toastr.success(` promotin done succsessfully  (${data.data}) remaining promotions available `, 'success');
          this.premIds.push(adver_id);
        
        }
      },
      (error:any)=>{
  console.log(error);
  
      })
  }




  unpromote(adver_id:any){


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        
   
    
    this.http.delete(`http://localhost:8000/api/dele/${adver_id}`).subscribe(
  
      (data:any)=>{
        if(data.code ==0){
          this.toastr.error(` error `, 'failure');
        }else{
          Swal.fire(
            'ٌRemoved',
            'Your advertisment has been unpromoted.',
            'success'
          )
          
         const index: number = this.premIds.indexOf(adver_id);
          this.premIds.splice(index,1);

        }
      },
      (error:any)=>{
  console.log(error);
  
      })

    }
  })

  }

















   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
  }



      addarch(ID:number) {
          this.ApiPro.addtoarchefAdv(ID).subscribe((res:any)=>{
            this.toastr.success("your Advertisment Has Been Added To Archive", 'add to Archive')
            this._fetchData();


          });
      }
      restorearchive(ID:number) {

          this.ApiPro.restorearchive(ID).subscribe((res:any)=>{
            this.toastr.success("your Advertisment Has Been rectored from Archive ", 'back from Archivea');
            this.toastr.warning("Now Your Advertisment will be visible to everyone", 'warning');
            this._fetchData();


          });
      }
      forcedelete(ID:number){
          this.ApiPro.forcedeleteAdv(ID).subscribe((res:any)=>{
            this._fetchData();
            this.toastr.success("your Advertisment Has Been Deleted Successfully", "success");


          });
      }









}
