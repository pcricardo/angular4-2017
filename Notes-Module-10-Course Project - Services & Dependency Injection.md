## Module 10 - Course Project - Services & Dependency Injection

### Using Services for "Push Notifications"

**Scenario**
- we have a component that show a list of ingredients and add new ingredient
- we have a service that manage a array of Ingredient (an ingredient is just a object with name and amount)
- the service has 2 services: 
	- getIngredients() - return a copy of array of ingredients
	- addIngredient(ingredient: Ingredient)

**Problem:**
- when we add an ingredient, our component does not update the list of ingredients.
- the reason is because we populate the array of ingredients  on the component (OnInit event) with a copy (__not a recerence__) returned by the service

**Solution: __notify the component that the array of ingredients change__**

Steps:
- in the service
	- add Event Emitter of ingredient array 
		- example: `ingredientChanged = new EventEmitter<Ingredient[]>();`
	- in the method that change the array os ingredients, call __emit__ from __Event Emitter__
		- example: 
		```TS
		addIngredient(ingredient: Ingredient){
			this.ingredients.push(ingredient);
			this.ingredientChanged.emit(this.ingredients.slice());
		}
		```
- in the component -  subscribe the event (for example in the OnInit), and do something
	- example 
	```
	ngOnInit() {
		this.ingredients = this.shoppingListService.getIngredients();
		this.myService.ingredientChanged
			.subscribe(
				(ingredients: Ingredient[]) => {
					this.ingredients = ingredients;
				}
			);
	}
	  ```

Notes:
- It is good practice return a copy of array/list instead of a reference of the array/list
