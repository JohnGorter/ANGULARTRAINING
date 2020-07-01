### Internationalization

You can configure this API in your module

```ts
import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeNL from '@angular/common/locales/nl';

registerLocaleData(localeNL);

@NgModule({
	imports: [...],
	declarations: [...],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'nl-NL'
		},
		...
	],
	bootstrap: []
})
export class AppModule { }
```

<!-- .element class="small" -->