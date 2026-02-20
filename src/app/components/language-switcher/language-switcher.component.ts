import { Component, inject, input, output } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

export interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LanguageSwitcherComponent {
  private translationService = inject(TranslationService);

  languages = input.required<Language[]>();
  currentLanguage = input.required<string>();
  languageChange = output<string>();

  onLanguageChange(langCode: string) {
    this.translationService.setActiveLang(langCode);
    this.languageChange.emit(langCode);
  }
}
