### What exactly is dependency injection?

* It's a form of inversion of control
* It's about **expressing a need**
* You tell Angular your component needs to perform AJAX requests and Angular supplies you with something that can do just that

---

### What DI solves 

```ts
class Car {
	constructor() {
		this.engine = new Engine();
		this.tires = Tires.getInstance();
		this.doors = app.get('doors');
	}
}
```

* Doing this everywhere in your application will lead to a lot of rework
* Mocking away dependencies becomes horribly complicated

---

### Inject dependencies via constructor

```ts
class Car {
	constructor(
		private engine: Engine, 
		private tires: Tires,
		private doors: Doors) { }
}
```

Injecting the correct instances of the classes is the job of the *dependency injection container*