# Lab: Backend communication

## Pre-exercise: Set up a REST service

1. In the `resource/` folder, there's a `contacts.json` file to boot up a REST service.
1. Open a commandprompt in this folder and execute the following commands

    ```bash
    npm install json-server --global
    json-server .\contacts.json --port 9688
    ```
    This will boot up a REST server you can use during this lab.

## Exercise 1: Retrieve contacts from a REST service

1. Register the `HttpClientModule` with your module. It's in `@angular/common/http`.
1. In your `ContactService`, inject `HttpClient` with the constructor. You can find `HttpClient` in `@angular/common/http` as well.
    ```ts
	private url = 'http://localhost:9688/contacts';

    constructor(private http: HttpClient) { }
    ```

1. Use this `http` when getting the contacts.

    ```ts
	getContacts() {
	    return this.http.get<Contact[]>(this.url);
	}
    ```

1. Because `getContacts()` no longer returns an array but an `Observable<Contact[]>`, some changes need to be made inside `ContactListComponent`. The call should now look like this:
    ```ts
    ngOnInit() {
	    this.contactService.getContacts().subscribe(contacts => {
	        this.contacts = contacts;
	    });
    }
    ```

## Exercise 2: More interaction with the REST service

Change the implementations of adding, editing and deleting of contacts to work with the REST service. The `ContactService` should be responsible for all API calls.

You'll probably also run into the problem that you have to requery the list of contacts once a contact has been added. Multiple solutions are possible here and it all depends on which you simply like most.

## Exercise 3: Intercepting errors

In this exercise, we'll be adding an interceptor to globally catch error responses. This includes status code 500 (internal server error) responses as well as when the server is simply not available.

1. Start by adding a new class, `ErrorInterceptor`, in a new folder called `interceptors`.
1. This class should implement the `HttpInterceptor` interface.
1. Provide the new interceptor with your module.

    ```ts
    import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

    @NgModule({
        imports: [..., HttpClientModule, ...],
        declarations: [...],
        providers: [
            { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

            // ...
        ],
        bootstrap: [...]
    })
    export class AppModule { }
    ```
1. Now for the actual logic of your interceptor. RxJS has an operator `catchError` that we can use.
    ```ts
    return next.handle(req).pipe(
        catchError((err, caught) => {
            if (err instanceof HttpErrorResponse) {
                console.error('something went horribly wrong', err);
                return of([] as any);
            }
        })
    );
    ```
1. To test whether is works, simply stop the REST-service and try to make AJAX calls again. This should trigger our interceptor.

1. If there's time, feel free to add a library to your project for showing a user-friendly message that something went wrong. Something like [ngx-toastr](https://scttcper.github.io/ngx-toastr/) or the snackbar from [Angular MDC](https://trimox.github.io/angular-mdc-web/#/snackbar-demo)/[Angular Material](https://material.angular.io/components/snack-bar/overview). Depending on your library choice, these are soms steps you'll most likely have to do:
    1. Install the library in your project: `npm install --save ...`
    1. Import it with your module `@NgModule({ imports: [...] })`
    1. Possibly add a CSS-stylesheet to your `angular.json`.
    1. Dependency inject a service into your interceptor that can show toasts for you:

        ```ts
        constructor(private toastr: ToastrService) {}
        ```

        ```ts
        this.toastr.error(`Something went wrong when making a request: ${req.method} ${req.url}`, 'HTTP error');
        ```