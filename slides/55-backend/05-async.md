### AsyncPipe

* A pipe that deals with observables/promises
* Expose the observable

```ts
people: Observable<Person[]>;
constructor(private http: Http) {
    this.people = this.http.get<Person[]>('api/people');
}
```
* Use in your HTML:

```html
<span *ngFor="let p of people | async">{{p.name}}</span>
```
```html
<p>Names: {{peopleObservable | async | greetAll}}</p>
```