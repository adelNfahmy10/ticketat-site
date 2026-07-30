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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgClass, NavbarComponent, HomeComponent, AboutComponent, WhyChooseUsComponent, FeatureComponent, FooterComponent, HowItWorkComponent, EventTypesComponent, FaqComponent, PricingComponent, ContactUsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _NgwWowService = inject(NgwWowService)


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
