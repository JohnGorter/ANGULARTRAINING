### Pre-fetching data

Angular routes have a **resolve**  mechanism to pre-fetch data.

```ts
export const routes: Route[] = [
	{
		path: 'cardetails/:id',
		component: CardetailsPage,
		resolve: {
			car: CarResolver
		}
	}
];
```

notes:
Met dit mechanisme kan data zo snel mogelijk worden opgehaald en kun je voorkomen dat je naar de detailspagina gaat met een ongeldige ID. Je kan de gebruiker dan op de lijstpagina houden.

---

### Pre-fetching data

The resolver itself looks as follows:

```ts
@Injectable()
export class CarResolver implements Resolve<Car> {
	constructor(
		private router: Router,
		private carApi: CarApi) { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot) {
		let id = +route.paramMap.get('id');
		return this.carApi.get(id).pipe(map(car => {
			if (car) { return car; }
			this.router.navigate(['/start']);
			return null;
		}));
	}
}
```

---

### Pre-fetching data

To get that fetched data in your component, check `data` of your `ActivatedRoute`.

```ts
constructor(private route: ActivatedRoute) { }

ngOnInit() {
	this.route.data
		.subscribe((data: { car: Car }) => {
			console.log('found car:', this.car);
		});
}
```