import { Injectable, computed, inject, signal } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translocoService = inject(TranslocoService);

  // Current active language as signal
  private _activeLangSignal = signal<string>(
    this.translocoService.getActiveLang(),
  );

  // Public read-only computed signal for active language
  activeLang = computed(() => this._activeLangSignal());

  // Check if current language is RTL
  isRTL = computed(() => this._activeLangSignal() === 'ar');

  // Available languages
  availableLangs = ['de', 'en', 'ru', 'ar', 'ua'] as const;

  constructor() {
    // Subscribe to language changes and update signal
    this.translocoService.langChanges$.subscribe((lang) => {
      this._activeLangSignal.set(lang);
      this.updateHTMLDirection(lang);
    });
  }

  /**
   * Set active language
   */
  setActiveLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this._activeLangSignal.set(lang);
    this.updateHTMLDirection(lang);
  }

  /**
   * Translate a key
   */
  translate(key: string, params?: Record<string, any>): string {
    return this.translocoService.translate(key, params);
  }

  /**
   * Get translation as computed signal
   */
  translateSignal(key: string, params?: Record<string, any>) {
    return computed(() => this.translocoService.translate(key, params));
  }

  /**
   * Update HTML direction for RTL support
   */
  private updateHTMLDirection(lang: string): void {
    const htmlElement = document.documentElement;
    if (lang === 'ar') {
      htmlElement.setAttribute('dir', 'rtl');
      htmlElement.setAttribute('lang', 'ar');
    } else {
      htmlElement.setAttribute('dir', 'ltr');
      htmlElement.setAttribute('lang', lang);
    }
  }
}
