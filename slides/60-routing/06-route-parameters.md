### Accessing route parameters

```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
	selector: 'car-details',
	templateUrl: 'car-details.page.html'
})
export class CarDetailsPage implements OnInit {
	constructor(private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params
			.pipe(map(params => params['id']))
			.subscribe(id => console.log('Retrieve some car data:', id));
	}
}
```

<!-- .element class="small" -->

Or, if you're not interested in parameter changes:

```ts
ngOnInit() {
	console.log('Retrieve some car data:', this.route.snapshot.params.id);
}
```

<!-- .element class="small" -->