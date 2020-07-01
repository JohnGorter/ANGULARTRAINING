### Link to another route

You can use the `routerLink` directive to link to another route

```html
<a routerLink="/cars">Back to the cars overview</a>
```

We can also use an Angular expression

```html
<a [routerLink]="['/cars', 14]">View details of this amazing car</a>
```