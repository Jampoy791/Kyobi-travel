import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class LegacyScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  loadScript(src: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      // don't load twice
      if (this.document.querySelector(`script[data-src="${src}"]`)) {
        resolve();
        return;
      }

      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;
      script.setAttribute('data-src', src);
      script.onload = () => resolve();
      script.onerror = () => {
        console.warn(`Legacy script not found: ${src} (ok in tests)`);
        resolve(); // don't reject, allow app to continue
      };
      this.document.body.appendChild(script);
    });
  }

  loadScripts(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map(s => this.loadScript(s)));
  }

  removeScript(src: string): void {
    const el = this.document.querySelector(`script[data-src="${src}"]`);
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
}
