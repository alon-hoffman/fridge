import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent {

  @Input() recipes!: Recipe[] | null
  @Output() onRemove = new EventEmitter<string>()



}
