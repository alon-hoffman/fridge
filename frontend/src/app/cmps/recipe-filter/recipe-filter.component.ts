import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.scss']
})
export class RecipeFilterComponent implements OnInit {
  @Input() recipes: any[] = [];
  @Output() filtered = new EventEmitter<string[]>();

  uniqueIngredients: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateIngredientsList();
  }

  generateIngredientsList(): void {
    const allIngredients = this.recipes.flatMap(recipe => recipe.ingredients);
    const uniqueIngredients = new Set(allIngredients.map(ingredient => ingredient.name));
    this.uniqueIngredients = [...uniqueIngredients];
  }

  onFilterChange(): void {
    const checkboxes = document.querySelectorAll('.ingredient-filter');
    // const checkedBoxes = Array.from(checkboxes)
    //   .filter((checkbox: HTMLInputElement) => checkbox.checked)
    //   .map((checkbox: HTMLInputElement) => checkbox.value);

    //@ts-ignore
    this.filtered.emit(checkboxes);
    // this.filtered.emit(checkedBoxes);
  }

}
