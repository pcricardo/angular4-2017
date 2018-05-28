import { Subject } from 'rxjs/Subject';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Aples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(){
    //slice() without arguments, return a copy of array
    return this.ingredients.slice();
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    //bad aproach because addIngredient() emit event, so this will emit a lot of unecessary events
    //for (let ingredient of ingredients) {
    //  this.addIngredient(ingredient);
    //}

    this.ingredients.push(...ingredients); // ES6
    this.ingredientChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    console.log(index);
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
