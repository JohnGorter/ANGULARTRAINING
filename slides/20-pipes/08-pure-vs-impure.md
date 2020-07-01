### Pure vs impure pipes

`@Pipe` has a `pure` property:
```ts
@Pipe({
	name: 'my',
	pure: false // boolean
})
export class MyPipe implements PipeTransform {
```

Pure pipes:

<!-- .element class="fragment" data-fragment-index="0" -->

* Are the default, most (custom) pipes are pure 
* Get called when the input value has changed

<!-- .element class="fragment" data-fragment-index="0" -->

Impure pipes:

<!-- .element class="fragment" data-fragment-index="1" -->

* Get called for every time change detection gets triggered
* Can drain performance quickly
* `async` pipe is impure

<!-- .element class="fragment" data-fragment-index="1" -->