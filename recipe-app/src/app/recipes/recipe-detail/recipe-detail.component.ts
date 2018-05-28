import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router'

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    //this only work in thte firt time the component is loaded
    //this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params['id']);

		//add reacte to any changes, not only the first
		this.route.params
			.subscribe(
				(params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
				}
			);
  }

  onAddShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //Example of complex route
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
