import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Prof } from 'src/app/models/prof';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SprofileService } from 'src/app/services/sprofile.service';
import { Upuser } from './upuser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})

/**
 * Info Component
 */
export class InfoComponent implements OnInit {
  data:Prof[] = [];
  editprof:Upuser={} as Upuser;
  form!: UntypedFormGroup;
  config: DropzoneConfigInterface = { };
  token:any;
   // bread crumb items
   breadCrumbItems!: Array<{}>;
   public firstColleaps = true;

  constructor(private accountuserse:AuthenticationService , private Apiprofile:SprofileService,private formBuilder: UntypedFormBuilder,private toastr: ToastrService ,private router: Router,private http: HttpClient,private cookieService: CookieService) {

    this.token = this.cookieService.get('jwt');
    this.config = {
      url: 'http://127.0.0.1:8000/api/upd_profimg',
      method: 'post',
      // maxFilesize: 1,
      maxFiles: 1,

      headers   :  {
        'Authorization': `Bearer ${this.token}`
      },
      clickable: true,
    paramName:"new_image",
     acceptedFiles: 'image/*'
    };



    this.form = this.formBuilder.group({
      bio: ['', [Validators.required]],
      name: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      company_name: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });

   }





  ngOnInit(): void {
    this.getinfo();


    /**
     *
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Account', link:'/account/info' },
      { label: 'Personal Info', active: true }
    ];
  }

  /**
   * On mobile toggle button clicked
   */
   SideBarMenu() {
    document.getElementById('account-nav')?.classList.toggle('show');
}
  out(){

        this.accountuserse.logout()


  }


    getinfo(){

      this.Apiprofile.getuserprofile().subscribe(
        (user:any) => {
            this.data= user.data;

            },
        err => {
          console.log(err);

        })


    }



    OnSubmit(){

        if(this.form.invalid){
          this.toastr.warning("Please review all your information before modifying ", 'warning')


          return;
        }


          this.Apiprofile.updateprofile(this.form.getRawValue()).subscribe(

            res=>{
              console.log(res);
              this.getinfo();


            },
            err=>{
              console.log(err);
            }


          );

      console.log(this.form.getRawValue());

    }




    onUploadSuccess(args: any): void {
      this.getinfo();

    }

}
