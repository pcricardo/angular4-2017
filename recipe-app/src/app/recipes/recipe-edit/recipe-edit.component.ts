import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false; //manage new and edit mode

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null; //if params['id'] is undefined then editMode should be false
				  console.log('RecipeEditComponent - id is \'' + this.id + '\' - editMode is \'' + this.editMode + '\'');
				}
			);
  }

}
