### Components can work together

![Pass data into child components](img/angular2-components-hierarchy-data.png) <!-- .element: class="right" -->

So far, we've seen that components can pass data into child components.



source: <!-- .element: class="source" -->
https://www.sitepoint.com/angular-2-components-inputs-outputs/ <!-- .element: class="source" -->

---

### Components can work together

![Signal parent of same event](img/angular2-components-hierarchy-data-and-events.png) <!-- .element: class="right" -->
A component can communicate with its parent component to signal some sort of event has happened



* Create a new field of type `EventEmitter` with `@Output()` applied
* When using the component, register an event handler

source: <!-- .element: class="source" -->
https://www.sitepoint.com/angular-2-components-inputs-outputs/ <!-- .element: class="source" -->

---

### Collaborating: Shopping cart

```ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'shopping-cart'
	templateUrl: 'shopping-cart.component.html'
})
export class ShoppingCartComponent {
	@Output() contentChange = new EventEmitter();
	@Output() pay = new EventEmitter();

	addItemToCart() {
		this.contentChange.emit({ type: 'add', item: this.item });
	}
}
```

Using this component:

```html
<shopping-cart
    (pay)="doSomthingWithPayEvent()" 
	(contentChange)="doSomethingWithContent($event)"></shopping-cart>
```

---

### Components can work together

The other way around, a parent can use `@ViewChild` to access the instance of a child element.

```ts
@Component({ ... })
export class MainPage {
    @ViewChild(ShoppingCartComponent)
    shoppingCart: ShoppingCartComponent;

    pay() {
        this.shoppingCart.clear();
    }
}
```

Use `@ViewChildren` for accessing multiple element instances.