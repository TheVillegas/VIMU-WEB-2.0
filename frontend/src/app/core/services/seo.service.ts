import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoData {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
}

const BASE_TITLE = 'VIMU DEVS';
const BASE_URL = 'https://vimudevs.com';
const BASE_IMAGE = 'https://vimudevs.com/assets/images/og-image.jpg';

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private title: Title,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  update(data: SeoData): void {
    const fullTitle = `${data.title} — ${BASE_TITLE}`;
    const canonical = data.canonical ?? BASE_URL;
    const image = data.image ?? BASE_IMAGE;

    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: data.description });

    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: data.description });
    this.meta.updateTag({ property: 'og:url', content: canonical });
    this.meta.updateTag({ property: 'og:image', content: image });

    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: data.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    if (isPlatformBrowser(this.platformId)) {
      this.updateCanonical(canonical);
    }
  }

  private updateCanonical(url: string): void {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
