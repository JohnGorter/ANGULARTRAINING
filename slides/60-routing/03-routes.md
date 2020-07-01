### Angular routes

Angular supports routing by loading views in dynamically through AJAX. To implement routing:

1. Define routes based on the interface `Route`

	```ts
	export interface Route {
		path?: string;
		component?: Type<any>;
		...
	}
	```

1. Call `RouterModule.forRoot([...])` to supply all the routes
1. Place an `<router-outlet></router-outlet>` in the HTML of your root component. This is the element where the different views are loaded beside.

---

### Angular routes

Provide routes during bootstrap:

```ts
import { Route } from '@angular/router';
import { CarsPage } from './cars.page';
import { CarDetailsPage } from './car-details.page';

let routes: Route[] = [
	{ path: 'cars', component: CarsPage },
	{ path: 'cars/:id', component: CarDetailsPage }
]; // you can split routes up in different files as well

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
	]
})
export class AppModule { }
```


---

### Accessing route information

Inject `ActivatedRoute`:

```ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from './car';
import { CarService } from './car.service';

@Component({
	templateUrl: 'car-details.page.html'
})
export class CarDetailsPage {
	car: Car;

	constructor(
		private carService: CarService,
		private route: ActivatedRoute) {
		this.route.params
			.pipe(
				map(params => +params['id']),
				switchMap(id => this.carService.getContact(id))
			)
			.subscribe(car => this.car = car);
		}
}
```

<!-- .element: class="small" -->