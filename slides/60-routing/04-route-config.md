### Define where the views are shown

```ts
import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	templateUrl: 'my-app.component.html'
})
export class AppComponent {}
```

app/my-app.component.html

```html
<h1>Welcome to the car app!</h1>
<router-outlet></router-outlet>
```