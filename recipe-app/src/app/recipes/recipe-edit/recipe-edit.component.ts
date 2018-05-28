import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; //manage new and edit mode
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null; //if params['id'] is undefined then editMode should be false
          this.initForm();
				  console.log('RecipeEditComponent - id is \'' + this.id + '\' - editMode is \'' + this.editMode + '\'');
				}
			);
  }

  onSubmit(){
    //console.log(this.recipeForm);

    //const newRecipe = new Recipe(
    //  this.recipeForm.value['name'],
    //  this.recipeForm.value['description'],
    //  this.recipeForm.value['imagePath'],
    //  this.recipeForm.value['ingredients']);
    // no need create new Recipe because  this.recipeForm.value has the same values with the same names
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    //call onCancel to navigate up one level
    this.onCancel();
  }
  onAddIngredient(){
    const control = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'amount' : new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
    });
		(<FormArray>this.recipeForm.get('ingredients')).push(control);
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    // go up one level relative to the atual route
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients' : recipeIngredients
    });
  }

}
