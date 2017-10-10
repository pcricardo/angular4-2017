import { EventEmitter } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  ingredientChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Aples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  getIngredients(){
    //slice() without arguments, return a copy of array
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    //bad aproach because addIngredient() emit evenbt, so this will emit a lot of unecessary events
    //for (let ingredient of ingredients) {
    //  this.addIngredient(ingredient);
    //}

    this.ingredients.push(...ingredients); // ES6
    this.ingredientChanged.emit(this.ingredients.slice());
  }

}
