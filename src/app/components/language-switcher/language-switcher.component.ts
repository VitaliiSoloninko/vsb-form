import { Component, input, output } from '@angular/core';

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
  languages = input.required<Language[]>();
  currentLanguage = input.required<string>();
  languageChange = output<string>();

  onLanguageChange(langCode: string) {
    this.languageChange.emit(langCode);
  }
}
