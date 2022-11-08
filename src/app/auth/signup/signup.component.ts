import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

/**
 * Signup Component
 */
export class SignupComponent implements OnInit {
  data: any;
  err: any;
  passTextType!: boolean;
  fieldTextType!: boolean;
  //  Validation form
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private accountuserser: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /**
     * Bootstrap validation form data
     */
    this.validationform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
    });

    document.body.classList.add('bg-secondary');
  }

  /**
   * Password Hide/Show
   */
  togglePassFieldTextType() {
    this.passTextType = !this.passTextType;
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
    if (this.validationform.invalid) {
      return;
    }

    this.accountuserser
      .register(
        this.form['name'].value,
        this.form['email'].value,
        this.form['password'].value
      )
      .subscribe(
        (res) => {
          this.data = res;
          // console.log(this.data);
          if (this.data.status === 400) {
            for (var msg in this.data.message) {
              this.toastr.error(msg, 'Error');
            }
          } else if (this.data.status === 201) {
            this.toastr.success(this.data.message, 'success');

            this.router.navigate(['/auth/signin']);
          } else if (this.data.code === 409) {
            this.toastr.warning(this.data.message, 'warning');
            console.log(this.data);
          }
        },
        (error) => {
          this.err = error;
          console.log(this.err);
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
