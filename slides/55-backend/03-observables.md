### Observables are used a lot

* With AJAX calls:
	```ts
  let observable = this.http
      .get<Car[]>('api/car')
      .subscribe(data => console.log(data));
	```
* With reactive forms:
	```ts
  this.form = this.fb.group({ ... });
  this.form.valueChanges.subscribe(newValue => {
      console.log('newValue:', newValue);
  });
	```
* With routes:
	```ts
  this.route.params
      .pipe(map(params => +params['id']))
      .subscribe(id => this.carId = id);
	```
* And more. `EventEmitter`, web socket connections

---

### So what are observables?

* A stream of data published by some source
  * Like an asynchronous array
  * Similar to LINQ in C# or Java 8 streams
* Listen for events in this stream by subscribing to the Observable
* Observables are lazy, no subscribers means no action is taken
* Interactive visual demo: http://rxmarbles.com
* Currently being proposed as a standard in JavaScript: <!-- .element: class="fragment" data-fragment-index="1" -->
http://kangax.github.io/compat-table/esnext/ <!-- .element: class="fragment" data-fragment-index="1" -->
* Use them now through Reactive Extensions for JavaScript (RxJS) <!-- .element: class="fragment" data-fragment-index="1" -->

```ts
// static observable access methods
import { Observable, of, from, interval, empty } from 'rxjs';
 
// all operators (pipes)
import { map, share, count, distinct } from 'rxjs/operators';
```
<!-- .element: class="fragment" data-fragment-index="1" -->

---

### Creating observables

```ts
let data = of(1); // often used in unittests
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="0" x2="0" y1="1.7999999999999998" y2="8.2" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(0, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g></svg>

```ts
let data = from([10, 20, 30]);
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="30" x2="30" y1="1.7999999999999998" y2="8.2" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(10, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">10</text></g><g class="marble" transform="translate(20, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">20</text></g><g class="marble" transform="translate(30, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">30</text></g></svg>

```ts
let data = interval(2000); // emit every 2 seconds
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><g class="marble" transform="translate(10, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">0</text></g><g class="marble" transform="translate(20, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g><g class="marble" transform="translate(30, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g><g class="marble" transform="translate(40, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">3</text></g><g class="marble" transform="translate(50, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">4</text></g><g class="marble" transform="translate(60, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">5</text></g><g class="marble" transform="translate(70, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">6</text></g><g class="marble" transform="translate(80, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">7</text></g><g class="marble" transform="translate(90, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">8</text></g><g class="marble" transform="translate(100, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">9</text></g></svg>


```ts
let o = Observable.create(() => {}); // often used in unittests
```

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

---

### Filtering operators: `filter()`

```ts
let data = from([2, 30, 22, 5, 60, 1]).pipe(
    filter(x => x > 10)
);
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="100" x2="100" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(5, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">30</text></g><g class="marble" transform="translate(25, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">22</text></g><g class="marble" transform="translate(35, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">5</text></g><g class="marble" transform="translate(45, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">60</text></g><g class="marble" transform="translate(55, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g></svg>

becomes

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="100" x2="100" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">30</text></g><g class="marble" transform="translate(25, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">22</text></g><g class="marble" transform="translate(45, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">60</text></g></svg>

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

---

### Filtering operators: `find()`

```ts
let observableItem = from([2, 30, 22, 5, 60, 1]).pipe(
    find(x => x > 10)
);
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="80" x2="80" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(5, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">30</text></g><g class="marble" transform="translate(25, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">22</text></g><g class="marble" transform="translate(35, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">5</text></g><g class="marble" transform="translate(45, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">60</text></g><g class="marble" transform="translate(55, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g></svg>

becomes

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="15" x2="15" y1="1.7999999999999998" y2="8.2" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">30</text></g></svg>

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

---

### Filtering operators: `take()`

```ts
let observableItem = from([1, 2, 3, 4]).pipe(
    take(2)
);
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="85" x2="85" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(30, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g><g class="marble" transform="translate(40, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g><g class="marble" transform="translate(65, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">3</text></g><g class="marble" transform="translate(75, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">4</text></g></svg>

becomes

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="40" x2="40" y1="1.7999999999999998" y2="8.2" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(30, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g><g class="marble" transform="translate(40, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g></svg>

Similar: `first()`, `last()`, `takeLast(x)`

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

---

### Mathematical operators: `count()`

```ts
let countObservable = from([2, 30, 22, 5, 60, 1]).pipe(
    count(x => x > 10)
);
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="80" x2="80" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(5, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">30</text></g><g class="marble" transform="translate(25, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">22</text></g><g class="marble" transform="translate(35, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">5</text></g><g class="marble" transform="translate(45, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">60</text></g><g class="marble" transform="translate(55, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g></svg>

becomes

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="81" x2="81" y1="1.7999999999999998" y2="8.2" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(81, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">3</text></g></svg>

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

Similar: `max()` and `min()`

---

### Mathematical operators: `reduce()`

```ts
let sumObservable = from([1, 2, 3, 4, 5]).pipe(
    reduce((prev, curr) => prev + curr)
);
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="80" x2="80" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(5, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g><g class="marble" transform="translate(25, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">3</text></g><g class="marble" transform="translate(35, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">4</text></g><g class="marble" transform="translate(65, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">5</text></g></svg>

becomes

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="81" x2="81" y1="1.7999999999999998" y2="8.2" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(81, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">15</text></g></svg>

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

---

### Transformation operators: `map()`

```ts
let data = from([1, 2, 3]).pipe(
    map(x => x * 10)
);
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="100" x2="100" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(10, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g><g class="marble" transform="translate(20, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">2</text></g><g class="marble" transform="translate(50, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">3</text></g></svg>

becomes 

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="100.01" x2="100.01" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(10, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">10</text></g><g class="marble" transform="translate(20, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">20</text></g><g class="marble" transform="translate(50, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">30</text></g></svg>

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

---

### Transformation operators

 `flatMap()`

```ts
let employees = from([
	{
		name: 'Fred',
		languages: from(['Dutch', 'English'])
	},
	{
		name: 'Laura',
		languages: from(['French', 'English', 'Spanish'])
	}
]);
console.log('Our employees can converse with you in:');
employees.pipe(
	flatMap(x => x.languages),
	distinct()
).subscribe(lang => console.log(`- ${lang}`));
```

Similar: `switchMap()`

---

### Combination operators: 

`merge()`

```ts
let data1 = timer(0, 1000).pipe(map(x => x * 20 + 20));
let data2 = timer(2500, 2000).pipe(map(x => 1));
data1.pipe(merge(data2)).subscribe(val => console.log('val:', val));
```

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="100" x2="100" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(0, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">20</text></g><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">40</text></g><g class="marble" transform="translate(30, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">60</text></g><g class="marble" transform="translate(45, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">80</text></g><g class="marble" transform="translate(60, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">100</text></g></svg>
<br>

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="100" x2="100" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(37, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g><g class="marble" transform="translate(68, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g></svg>

becomes 

<svg viewBox="0 0 7 10" style="width: 48px; height: 68px; overflow: visible;"><line x1="0" x2="112" y1="5" y2="5" style="stroke: black; stroke-width: 0.3;"></line><polygon points="111.7,6.1 111.7,3.9 114,5"></polygon></svg>
<svg viewBox="0 0 100 10" style="width: 680px; height: 68px; overflow: visible;"><line class="end-marker" x1="100.01" x2="100.01" y1="3.2" y2="6.8" style="stroke: black; stroke-width: 0.3; cursor: ew-resize;"></line><g class="marble" transform="translate(0, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">20</text></g><g class="marble" transform="translate(15, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 203, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">40</text></g><g class="marble" transform="translate(30, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">60</text></g><g class="marble" transform="translate(37, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(255, 105, 70); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g><g class="marble" transform="translate(45, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">80</text></g><g class="marble" transform="translate(60, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(130, 215, 54); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">100</text></g><g class="marble" transform="translate(68, 5)" style="cursor: default;"><circle r="2.3" style="fill: rgb(62, 161, 203); stroke: black; stroke-width: 0.3;"></circle><text text-anchor="middle" y="0.8" style="font-size: 2.5px; font-family: &quot;Source Sans Pro&quot;, sans-serif; user-select: none;">1</text></g></svg>

Similar: `combineLatest()`, `concat()`

Thanks to  <!-- .element: class="source" -->
[RxJS Marbles](http://rxmarbles.com) <!-- .element: class="source" -->

---

### Testing observables

```ts
it('should retrieve data during init', () => {
    let person = { id: 28, name: 'Frank' };
    spyOn(myComponent, 'getData').and.returnValue(of(person));

    myComponent.ngOnInit();

    expect(myComponent.getData).toHaveBeenCalled();
    expect(myComponent.user).toEqual(person);
});
```