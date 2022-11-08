import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { EventService } from '../../core/services/event.service';
import { AuthenticationService } from '../../services/authentication.service';

import { Router, NavigationEnd } from '@angular/router';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MENU } from './menu';
import { MenuItem } from './menu.model';
import { UserAccount } from 'src/app/models/user-account';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

/**
 * Header Component
 */
export class HeaderComponent implements OnInit {

    user!:UserAccount;


  mode: string | undefined;
  loginPassfield!: boolean;
  signupPassfield!: boolean;
  signupCPassfield!: boolean;
  menuItems: MenuItem[] = [];
  //  Validation form
  validationform!: UntypedFormGroup;
  signUpform!: UntypedFormGroup;
  submit!: boolean;
  formsubmit!: boolean;

  @ViewChild('sideMenu') sideMenu!: ElementRef;
  IsAuth=false;
  constructor(private router: Router,private modalService: NgbModal, private eventService: EventService, private formBuilder: UntypedFormBuilder ,private accountservice: AuthenticationService  ,private toastr: ToastrService ) {


      this.accountservice.user.subscribe(x => this.user = x);

    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activateMenu();
      }
    });
  }

  ngOnInit(): void {




    /**
     * Bootstrap validation form data
     */
     this.validationform = this.formBuilder.group({
      email: ['',[Validators.required]],
      password: ['', [Validators.required]],
    });

    /**
     * Bootstrap validation form data
     */
     this.signUpform = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    // Menu Items
    this.menuItems = MENU;
  }

   /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar');
    if (document.documentElement.scrollTop > 40) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector('.btn-scroll-top')?.classList.remove('show');
    }
  }

  /**
   * Open scroll modal
   * @param toggleDataModal scroll modal data
   */
   toggleModal(staticDataModal: any) {
    this.modalService.open(staticDataModal, { size: 'lg', centered: true });
  }
  secondModal(toggleSecondModal: any) {
    this.modalService.open(toggleSecondModal, { size: 'lg', centered: true });
  }

  /**
   * Password Hide/Show
   */
   toggleLoginPassField() {
    this.loginPassfield = !this.loginPassfield;
  }

  /**
   * Password Hide/Show
   */
   toggleSignUpPassField() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
   * Password Hide/Show
   */
   toggleSignUpCPassField() {
    this.signupCPassfield = !this.signupCPassfield;
  }


   /**
  * On menu click
  */
    onMenuClick(event: any) {
      const nextEl = event.target.nextElementSibling;
      if (nextEl) {
        const parentEl = event.target.parentNode;
        if (parentEl) {
          parentEl.classList.remove('show');
        }
        nextEl.classList.toggle('show');
      }
      return false;
    }

    ngAfterViewInit() {
      this.activateMenu();
    }

    /**
    * Activates the menu
    */
    private activateMenu() {
      const resetParent = (el: any) => {
        const parent = el.parentElement;
        if (parent) {
          parent.classList.remove('active');
          const parent2 = parent.parentElement;
          this._removeAllClass('mm-active');
          this._removeAllClass('mm-show');
          if (parent2) {
            parent2.classList.remove('active');
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.remove('active');
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.remove('active');
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.remove('active');
                  const menuelement = document.getElementById(
                    'topnav-menu-content'
                  );
                  if (menuelement !== null)
                    if (menuelement.classList.contains('show'))
                      document
                        .getElementById('topnav-menu-content')!
                        .classList.remove('show');
                }
              }
            }
          }
        }
      };

      // activate menu item based on location
      const links: any = document.getElementsByClassName('side-nav-link-ref');
      let matchingMenuItem = null;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < links.length; i++) {
        // reset menu
        resetParent(links[i]);
      }
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < links.length; i++) {
        // tslint:disable-next-line: no-string-literal
        if (location.pathname === links[i]['pathname']) {
          matchingMenuItem = links[i];
          break;
        }
      }

      if (matchingMenuItem) {
        const parent = matchingMenuItem.parentElement;
        if (parent) {
          parent.classList.add('active');
          const parent2 = parent.parentElement;
          if (parent2) {
            parent2.classList.add('active');
            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add('active');
              const parent4 = parent3.parentElement;
              if (parent4) {
                parent4.classList.add('active');
                const parent5 = parent4.parentElement;
                if (parent5) {
                  parent5.classList.add('active');
                }
              }
            }
          }
        }
      }
    }

    /**
    * remove active and mm-active class
    */
    _removeAllClass(className: any) {
      const els = document.getElementsByClassName(className);
      while (els[0]) {
        els[0].classList.remove(className);
      }
    }

    /**
    * Topbar Light-Dark Mode Change
    */
    changeMode(mode: string) {
      this.mode = mode;
      this.eventService.broadcast('changeMode', mode);

      switch (mode) {
        case 'light':
          document.body.setAttribute('data-layout-mode', "light");
          document.body.setAttribute('data-sidebar', "light");
          break;
        case 'dark':
          document.body.setAttribute('data-layout-mode', "dark");
          document.body.setAttribute('data-sidebar', "dark");
          break;
        default:
          document.body.setAttribute('data-layout-mode', "light");
          break;
      }
    }

     /**
  * Returns true or false if given menu item has child or not
  * @param item menuItem
  */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  /**
   * On mobile toggle button clicked
   */
   toggleMobileMenu() {
    if (window.screen.width <= 1024) {
      document.getElementById('navbarNav')?.classList.toggle('show');
    }
  }

   /**
  * Bootsrap validation form submit method
  */




    data:any;
    er:any;
    @ViewChild('btnClose') btnClose! : ElementRef
    validSubmit() {
      this.submit = true;
      if(this.validationform.invalid){
        return;
      }
        this.accountservice.loginuser(this.form['email'].value, this.form['password'].value).subscribe(
          res =>{
                    this.data = res;
                      if(this.data.code === 200) {
                        this.toastr.success(this.data.message, 'success')
                        window.location.reload();

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

  /**
   * Bootstrap tooltip form validation submit method
   */

  err: any;
  daa: any;
   formSubmit() {
    this.formsubmit = true;

    if (this.signUpform.invalid) {
      return;
    }

    this.accountservice
      .register(
        this.formData['name'].value,
        this.formData['email'].value,
        this.formData['password'].value
      )
      .subscribe(
        (res) => {
          this.daa = res;
          // console.log(this.data);
          if (this.daa.status === 400) {
            for (var msg in this.daa.message) {
              this.toastr.error(msg, 'Error');
            }
          } else if (this.daa.status === 201) {
            this.toastr.success(this.daa.message, 'success');
            document.getElementById("closeModalButton")!.click();

            this.router.navigate(['/auth/signin']);

          } else if (this.daa.code === 409) {
            this.toastr.warning(this.daa.message, 'warning');
            console.log(this.daa);
          }
        },
        (error) => {
          this.err = error;
          console.log(this.err);
        }
      );






  }

  /**
   * returns tooltip validation form
   */
   get formData() {
    return this.signUpform.controls;
  }

   /**
  * Demos Onclick
  */
  demosDroupDownClick() {
    document.querySelector('.demos')?.classList.toggle('show');
  }

}
