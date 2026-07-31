import { isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import { Component, HostListener, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgStyle, NgClass, TranslateModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  private readonly _PLATFORM_ID = inject(PLATFORM_ID)
  private readonly _TranslateService = inject(TranslateService)

  navbarTop:string = '0';
  background:string = `
    radial-gradient(circle at 85% 30%, rgba(89,138,240,.18), transparent 45%),
    radial-gradient(circle at 15% 20%, rgba(178,69,194,.20), transparent 45%),
    linear-gradient(120deg, #21102f 0%, #101B42 50%, #050816 100%);
  `;
  scrolled = false;
  lastScrollTop = 0;
  lang: string =  'ar';

  ngOnInit(): void {
    this._TranslateService.use(this.lang);
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      this.updateHtmlAttributes();
    }
  }

  @HostListener('window:scroll') onScroll(){
    const scrollPosition = window.scrollY;

    if (scrollPosition > this.lastScrollTop) {
      if(this.lastScrollTop > 200){
        this.navbarTop = '-200px';
      }
    } else {
      if(this.lastScrollTop > 200){
        this.navbarTop = '0';
        this.scrolled = true;
      } else {
        this.navbarTop = '0';
        this.scrolled = false;
      }
    }

    this.lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
  }

  sections = [
    { id: 'home', name: 'navbar.home' },
    { id: 'about', name: 'navbar.about' },
    { id: 'why-us', name: 'navbar.whyUs' },
    { id: 'feature', name: 'navbar.features' },
    { id: 'how-it-work', name: 'navbar.how-it-work' },
    { id: 'event-types', name: 'navbar.event-types' },
    { id: 'pricing', name: 'navbar.pricing' },
    { id: 'faq', name: 'navbar.faq' },
    { id: 'contact-us', name: 'navbar.contact-us' },
  ];
  activeLink: string = 'home';

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.setActiveLink(sectionId);
    }
  }

  setActiveLink(sectionId: string) {
    this.activeLink = sectionId;
  }

  ngAfterViewInit() {
    if(isPlatformBrowser(this._PLATFORM_ID)){
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.activeLink = entry.target.id;
            }
          });
        },
        { threshold: 0.5 }
      );

      this.sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
      });
    }
  }

  // Translation Code
  switchLang() {
    this.lang = this.lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', this.lang);
    this._TranslateService.use(this.lang);
    this.updateHtmlAttributes();
  }

  updateHtmlAttributes() {
    const htmlTag = document.documentElement;
    htmlTag.setAttribute('dir', this.lang === 'ar' ? 'rtl' : 'ltr');
    htmlTag.setAttribute('lang', this.lang);
  }
}
