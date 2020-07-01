### Make an AJAX request

The `HttpClient` class in the `HttpClientModule` is responsible for making AJAX requests.

```ts
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	imports: [..., HttpClientModule],
	declarations: [...],
	providers: [...],
	bootstrap: [...]
})
export class AppModule { }
```

---

### Make an AJAX request

* Inject `HttpClient` in the constructor and send out a request

```ts
constructor(private http: HttpClient) {
    this.http
        .get<Person[]>('api/person')
        .subscribe(persons => {
            this.persons = persons;
        });
}
```

Notice the `subscribe()` here. We're dealing with so-called observables.