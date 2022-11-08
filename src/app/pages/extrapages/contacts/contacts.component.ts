import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactSService } from 'src/app/services/contact-s.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

/**
 * Contacts Component
 */
export class ContactsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  //  Validation form
  validationform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  constructor(private formBuilder: UntypedFormBuilder , private  ApiContact:ContactSService) { }

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Contact us', active: true }
    ];

    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });
  }

  /**
  * Bootsrap validation form submit method
  */
   validSubmit() {
    this.submit = true;





    if(this.validationform.invalid){
      return;
    }

    this.ApiContact.addcontact(this.validationform.getRawValue()).subscribe(

        res=>{

          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Thanks for your message, we will contact you as soon as possible',
            showConfirmButton: false,
            timer: 4500
          })
        },
        er=>{

        }


    )




  }

  /**
 * Returns form
 */
  get form() {
    return this.validationform.controls;
  }

}
