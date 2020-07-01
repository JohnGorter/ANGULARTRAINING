### Basics

Decorate a class with `@Injectable()`

```ts
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {
    getAll() {
        return /*...*/;
    }
}
```

Then let Angular know how this service can be provided:

```ts
@NgModule({
	imports: [...],
	declarations: [...],
	providers: [..., PeopleService],
	bootstrap: [...]
})
export class AppModule { }
```

---

### Basics

Now your service is ready to be injected:

```ts
import { Component } from '@angular/core';
import { PeopleService } from './people.service';

@Component({
    selector: 'playground',
    templateUrl: 'playground.component.html'
})
export class PlaygroundComponent {
    constructor(private peopleService: PeopleService) {
        peopleService.getAll();
    }
}
```

Within the module, `PeopleService` is a singleton.

---

### The other way around

Or the `Service` can refer to the `NgModule`

```ts
import { Injectable } from '@angular/core';
import { AppModule } from './app.module';

@Injectable({
    providedIn: AppModule
})
export class PeopleService {
}
```

**New** This is new in Angular 6

Might still not work https://github.com/angular/angular/issues/24082

---

### The other way around - Singleton

This is the new preferred way to define a service as a singleton.

```ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PeopleService {
}
```