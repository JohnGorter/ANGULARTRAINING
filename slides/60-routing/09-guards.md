### Control route access

By placing a **guard** on a route:

```ts
export const routes: Route[] = [
	{
		path: 'my-profile',
		component: MyProfilePage,
		canActivate: [AuthGuard]
    },
    ...
];
```

```TS
@NgModule({
	providers: [
		AuthGuard,
        ...
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
```

---

### Control route access

The guard itself looks like this:

```ts
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
                private auth: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot) {
        if (!this.auth.isLoggedIn) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}
```
