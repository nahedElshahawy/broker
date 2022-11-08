import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  providers: [CookieService]
})

/**
 * Signin Component
 */
export class SigninComponent implements OnInit {
  show=false;
  data:any;
  er:any;
  fieldTextType!: boolean;
  //  Validation form
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(private formBuilder: UntypedFormBuilder , private accountuserService: AuthenticationService ,private cookieService: CookieService ,private toastr: ToastrService ,private router: Router) { }

  ngOnInit(): void {
     /**
     * Bootstrap validation form data
     */
      this.validationform = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });

    document.body.classList.add('bg-secondary');
  }

  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  /**
  * Bootsrap validation form submit method
  */
   validSubmit() {
    this.submit = true;
      if(this.validationform.invalid){
        return;
      }


        this.accountuserService.loginuser(this.form['email'].value, this.form['password'].value).subscribe(
          res =>{
                    this.data = res;
                      if(this.data.code === 200) {
                        this.toastr.success(this.data.message, 'success')
                        this.router.navigate(['/']);
                      }else{
                        this.toastr.error(this.data.message, 'error');
                        // Emitters.authEmitter.emit(false);
                      }
                       },
                    error =>{
                  console.log("error");
                     console.log(error);

                }
              );



  }

  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

}
