### Lifecycle hooks

```ts
import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'loading',
	templateUrl: 'loading.component.html'
})
export class LoadingComponent implements OnInit {
	@Input() message: string;

	constructor() {
		console.log('constructor message:', this.message);
	}

	ngOnInit() {
		console.log('onInit message:', this.message);
	}
}
```

<!--.element class="small"-->


```html
<loading message="Very busy retrieving cars" *ngIf="!cars"></loading>
<li *ngFor="let car of cars" *ngIf="cars">
	{{car.make}} {{car.type}}
</li>
```

<!--.element class="small"-->

---

### Cleaning up resources

Because we're dealing with a SPA, remember to clean up resources in `ngOnDestroy`. This doesn't happen automagically for you.

```ts
ngOnInit() {
	// Open IndexedDB connections
	// Create web workers
	// Connect web sockets
	// Set intervals/timeouts
	// Subscribe to observables
}

ngOnDestroy() {
	// Close IndexedDB connections
	// Stop web workers
	// Disconnect web sockets
	// Clear intervals/timeouts
	// Unsubscribe from observables
}
```