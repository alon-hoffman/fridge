import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.scss']
})
export class RecipeFilterComponent implements OnInit, OnChanges {
  @Input() recipes!: Recipe[] 
  @Output() filtered = new EventEmitter<string[]>();

  uniqueIngredients: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateIngredientsList();
    console.log(this.recipes)
  }

  ngOnChanges(changes: any) {
    if (changes.recipes && changes.recipes.currentValue) {
      this.generateIngredientsList();
      console.log(this.recipes);
    }
  }
  

  generateIngredientsList(): void {
    const allIngredients = this.recipes.flatMap(recipe => recipe.ingredients);
    console.log("🚀 ~ file: recipe-filter.component.ts:22 ~ RecipeFilterComponent ~ generateIngredientsList ~ allIngredients", allIngredients)
    const uniqueIngredients = new Set(allIngredients.map(ingredient => ingredient.name));
    this.uniqueIngredients = [...uniqueIngredients];
  }

  onFilterChange(): void {
    const checkboxes = document.querySelectorAll('.ingredient-filter');
    const checkedBoxes = Array.from(checkboxes)
    //@ts-ignore

      .filter((checkbox: HTMLInputElement) => checkbox.checked)
    //@ts-ignore

      .map((checkbox: HTMLInputElement) => checkbox.value);
    this.filtered.emit(checkedBoxes);
  }

}
