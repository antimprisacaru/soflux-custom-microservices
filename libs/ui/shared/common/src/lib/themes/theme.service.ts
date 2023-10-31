import { ApplicationRef, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ThemeOptions } from './theme.options';

@Injectable()
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private appRef: ApplicationRef
  ) {
    // Initially check if dark mode is enabled on system
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    // If dark mode is enabled then directly switch to the dark-theme
    if (darkModeOn) {
      this.switchTheme(ThemeOptions.DARK_INDIGO);
    }

    // Watch for changes of the preference
    window.matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
      const turnOn = e.matches;
      this.switchTheme(
        turnOn ? ThemeOptions.DARK_INDIGO : ThemeOptions.LIGHT_INDIGO
      );

      // Trigger refresh of UI
      this.appRef.tick();
    });
  }

  switchTheme(theme: ThemeOptions) {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
    }
  }
}
