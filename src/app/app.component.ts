import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, HostListener, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgwWowService } from 'ngx-wow';
import { NavbarComponent } from "./navbar/navbar.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { WhyChooseUsComponent } from "./why-choose-us/why-choose-us.component";
import { FeatureComponent } from "./feature/feature.component";
import { FooterComponent } from "./footer/footer.component";
import { HowItWorkComponent } from "./how-it-work/how-it-work.component";
import { EventTypesComponent } from "./event-types/event-types.component";
import { FaqComponent } from "./faq/faq.component";
import { PricingComponent } from "./pricing/pricing.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { QRCodeComponent } from 'angularx-qrcode';
import QRCodeStyling from 'qr-code-styling';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NavbarComponent, HomeComponent, AboutComponent, WhyChooseUsComponent, FeatureComponent, FooterComponent, HowItWorkComponent, EventTypesComponent, FaqComponent, PricingComponent, ContactUsComponent, QRCodeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _NgwWowService = inject(NgwWowService)

 @ViewChild('qrCode', { static: true }) qrCode!: ElementRef;

  // qrData = 'https://www.facebook.com/share/1EA5LWo6z6/';
  // qrData = 'https://www.instagram.com/ticketat.eg?igsh=MWRud2N0M2oweHM5ZA==';

  // ngAfterViewInit(): void {
  //   const qrCode = new QRCodeStyling({
  //     width: 400,
  //     height: 400,
  //     type: "svg",
  //     data: this.qrData,

  //     image: "assets/image/logos/ticketat-facebook-qr.png",

  //     margin: 15,

  //     dotsOptions: {
  //       type: "classy-rounded",
  //       gradient: {
  //         type: "linear",
  //         rotation: Math.PI / 4,
  //         colorStops: [
  //           // Facebook Color
  //           { offset: 0, color: "#2563EB" }, // Ticketat Blue
  //           { offset: 1, color: "#1877F2" }  // Facebook Blue

  //           // Instagram Color
  //           // { offset: 0, color: "#2563EB" },
  //           // { offset: 0.5, color: "#C13584" },
  //           // { offset: 1, color: "#F77737" }
  //         ]
  //       }
  //     },

  //     cornersSquareOptions: {
  //       type: "extra-rounded",
  //       color: "#2563EB"
  //     },

  //     cornersDotOptions: {
  //       type: "dot",
  //       color: "#7C3AED"
  //     },

  //     backgroundOptions: {
  //       color: "#FFFFFF"
  //     },

  //     imageOptions: {
  //       imageSize: 0.48,
  //       margin: 10,
  //       hideBackgroundDots: true,
  //       crossOrigin: "anonymous"
  //     }
  //   });

  //   qrCode.append(this.qrCode.nativeElement);
  // }


  ngOnInit(): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this._NgwWowService.init()
    }
  }

  showArrow:boolean = false
  @HostListener('window:scroll') onScroll(){
    let scrollPosition = window.scrollY;
    if (scrollPosition > 200) {
      this.showArrow = true
    } else {
      this.showArrow = false
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
