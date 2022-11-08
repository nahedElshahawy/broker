import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AdversmentSService } from 'src/app/services/adversment-s.service';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss']
})

/**
 * AddProperty Component
 */
export class AddPropertyComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  longitude = 20.728218;
  latitude = 52.128973;
  public overviewColleaps = true;
  public amenitiesColleaps = true;
  form!: FormGroup;
  config: DropzoneConfigInterface = { };



  constructor(private modalService: NgbModal ,private formBuilder: FormBuilder ,private toastr: ToastrService ,private router: Router , private apiadv :AdversmentSService) {


    this.con();

    this.form = this.formBuilder.group({
      descrption: ['', [Validators.required]],
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      rent_or_sale: ['', [Validators.required]],
      area:['', [Validators.required]],
      n_rooms: ['', [Validators.required]],
      n_bath: ['', [Validators.required]],
      type: ['', [Validators.required]],
      pr_com: ['', [Validators.required]],
      zip:'',
      district: ['', [Validators.required]],
      city:['', [Validators.required]],
      country: ['', [Validators.required]],
      street: ['', [Validators.required]],
      parking: '',
    });

   }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
     this.breadCrumbItems = [
      { label: 'Home', link:'' },
      { label: 'Add property', active: true }
    ];
  }
  inView(ele:any){
    ele.scrollIntoView({behavior:"smooth", block:"start", inline:"start"})
  }

  /**
   * Open Review modal
   * @param reviewContent modal content
   */
   openReviewModal(reviewContent: any) {
    this.modalService.open(reviewContent, { size: 'fullscreen', windowClass: 'modal-holder' });
  }

data:any;
advId: any;
  addAdv(){

      console.log(this.form.getRawValue());

      if(this.form.invalid){

        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'you must complete all required fields before adding',
          showClass: {
            popup: 'animate__animated animate__swing'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
          // showConfirmButton: false,
          // timer: 1500
        })
        return;
      }
      this.apiadv.addadversmint(this.form.getRawValue()).subscribe(
        res =>{
          this.data = res
          this.advId = this.data.data.id;
          // alert(this.advId);
          console.log(res);
          this.con();

        },
        error =>{
          console.log(error);
        }

        )

        if(this.form.valid){

          document.getElementById("closeModalButton")!.click();
      }


    }





    onUploadSuccess(e:any){
      console.log(e);
    }


    con(){
      this.config = {
        url: `http://127.0.0.1:8000/api/addimg/${this.advId}`,
        method: 'post',
        headers   :  {
          // 'Authorization': `Bearer ${this.token}`
        },
        // errorReset:1,
        clickable: true,
        paramName:"image",
        acceptedFiles: 'image/*',
        maxFilesize: 50,

      };
      // alert(this.advId);
    }


    fi(){
      this.toastr.success("you have successfully added    ", 'success')

    }

}
