### Dealing with asynchronousity

* What happens here?

```typescript
it('should run async', () => {
    const p = new Promise(res => {
        setTimeout(() => res(42));
    });
    p.then(num => expect(num).toBe(0));
});
```

```bash
Executed 1 of 1 SUCCESS (0.015 secs / 0.006 secs)
```
<!--.element class="fragment"-->

---

### Solving it with plain Jasmine

```typescript
it('should run async', (done) => {
    const p = new Promise(res => setTimeout(() => res(42)));
    p.then(num => {
        expect(num).toBe(0);
        done();
    });
});
```

```bash
Executed 1 of 1 (1 FAILED) (0.015 secs / 0.006 secs)
```
<!--.element class="fragment"-->

<!--.element class="fragment"--> Using `done()` can be tedious, what if you forget to call it?

<!--.element class="fragment"--> Some frameworks (i.e. Mocha) allow you to return a promise. Unfortunately, Jasmine does *not* (see [issue 681](https://github.com/jasmine/jasmine/issues/681)<!--.element target="_blank"-->)


---

### Solving it with async / fakeAsync

```typescript
import { fakeAsync, async, tick } from '@angular/core/testing';

it('should run async', async(() => {
    const p = new Promise(res => setTimeout(() => res(42)));
    p.then(num => expect(num).toBe(0));
}));

it('should run async', fakeAsync(() => {
    let val = 0;
    setTimeout(() => val = 42, 100);
    setTimeout(() => val = 0, 200);
    tick(100);
    expect(val).toBe(42);
    tick(100);
    expect(val).toBe(0);
}));
```

<!--.element class="small"-->


```bash
Executed 2 of 2 (1 FAILED) (0.015 secs / 0.006 secs)
```

<!--.element class="fragment"-->

---

### Using `async` / `fakeAsync`

* Using `async`
  * All async calls get captured
  * When *all* async calls are done, calls jasmine's `done()` function
* Using `fakeAsync`
  * Like `async`, but let all calls be called synchronously

Bonus question: How can this work?

<!-- .element class="fragment" -->

---

### Angular example

```ts
 beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MyComponent
      ]
    });
    TestBed.compileComponents(); // Executes asynchronously
    fixture = TestBed.createComponent(PresentListComponent);
    sut = fixture.componentInstance;
  }));
```