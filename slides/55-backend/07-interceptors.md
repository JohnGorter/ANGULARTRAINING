### HTTP interceptors

Modify requests/responses by implementing interceptors.

Here's a request interceptor that adds a couple of HTTP headers to every request.

```ts
@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler) {
        let headers = req.headers.set('Content-Type', 'application/json');
		if (this.auth.isLoggedIn) {
			headers = headers.append('Auth-Token', this.auth.getAuthToken());
		}

		const authReq = req.clone({ headers }); // requests are immutable
		return next.handle(authReq);
	}
}

```

---

### HTTP interceptors

And here's a response interceptor that transforms the response.

```ts
@Injectable()
export class JsonResolverInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler) {
		return next.handle(req).pipe(map(
			(ok: HttpResponse<any>) => {
				
                // do some sort of transformation here

				return ok.clone({
					body: objects
				});
			}
		));
	}
}
```

---

### HTTP interceptors

Provide your interceptors.

```ts
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
	imports: [..., HttpClientModule, ...],
	declarations: [...],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JsonResolverInterceptor, multi: true },

        // ...
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
```

<!-- .element class="small" -->

---

### Unittesting HTTP interceptors

Import the `HttpTestingModule` and inject the `HttpTestingController` to test for requests.

```ts
it('should add the authtoken if the user is logged in', () => {
	auth.isLoggedIn = true;
	auth.setAuthToken('q');
	http.get('api/bla').subscribe(x => { });
	let request = httpController.expectOne(req =>
		req.headers.has('Auth-Token') &&
		req.headers.get('Auth-Token') === 'q'
	);
	request.flush({});
});
```

```ts
it('should not add the authtoken if the user is not logged in', () => {
	http.get('api/bla').subscribe(x => { });
	httpController.expectOne(req => !req.headers.has('Auth-Token'));
});
```

notes:

De volledige code om zo'n interceptor te testen:

import { TestBed, inject } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthTokenInterceptor } from './auth-token.interceptor';
import { AuthService } from '../services/auth/auth.service';
import { AuthServiceMock } from '../mocks/auth.service.mock.spec';

describe('Interceptor: AuthToken', () => {
	let http: HttpClient;
	let httpController: HttpTestingController;
	let authService: AuthServiceMock;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule
			],
			providers: [
				{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
				{ provide: AuthService, useClass: AuthServiceMock }
			]
		});
	});

	beforeEach(inject([
		HttpClient,
		HttpTestingController,
		AuthService
	], (
		hc: HttpClient,
		htc: HttpTestingController,
		as: AuthServiceMock) => {
			http = hc;
			httpController = htc;
			authService = as;
		}));

	afterEach(() => {
		httpController.verify();
	});

	it('should add the authtoken if the user is logged in', () => {
		authService.isLoggedIn = true;
		authService.setAuthToken('q');
		http.get('api/bla').subscribe(x => { });
		let request = httpController.expectOne(req => req.headers.has('Auth-Token') && req.headers.get('Auth-Token') === 'q');
		request.flush({});
	});

	it('should not add the authtoken if the user is not logged in', () => {
		http.get('api/bla').subscribe(x => { });
		httpController.expectOne(req => req.headers.has('Auth-Token') === false);
	});
});