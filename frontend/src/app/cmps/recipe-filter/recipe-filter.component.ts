import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'recipe-filter',
  templateUrl: './recipe-filter.component.html',
  styleUrls: ['./recipe-filter.component.scss']
})
export class RecipeFilterComponent implements OnInit {
  @Input() recipes!: Recipe[] 
  @Output() filtered = new EventEmitter<Recipe[]>();

  uniqueIngredients: string[] = [];
  checkedIngredients: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.generateIngredientsList();
  }

  ngOnChanges(changes: SimpleChanges) {
    //@ts-ignore
    if (changes.recipes && changes.recipes.currentValue) {
      this.generateIngredientsList();
    }
  }

  generateIngredientsList(): void {
    const allIngredients = this.recipes.flatMap(recipe => recipe.ingredients);
    const uniqueIngredients = new Set(allIngredients.map(ingredient => ingredient.name));
    this.uniqueIngredients = [...uniqueIngredients];
  }

  onFilterChange(): void {
    const checkboxes = document.querySelectorAll('.ingredient-filter');
    const checkedBoxesEl:HTMLInputElement[] = Array.from(checkboxes) as HTMLInputElement[]
    this.checkedIngredients = checkedBoxesEl
      .filter((checkbox: HTMLInputElement) => checkbox.checked)
      .map((checkbox: HTMLInputElement) => checkbox.value);
    
    const checkedRecipes = this.getCheckedRecipes();
    const uncheckedRecipes = this.getUncheckedRecipes();
    const sortedUncheckedRecipes = this.sortRecipesByMissingIngredients(uncheckedRecipes);

    if (this.checkedIngredients.length === this.uniqueIngredients.length) {
      console.log('all')
      this.filtered.emit([...this.recipes]);
    } else {
      console.log('not all')
      this.filtered.emit([...checkedRecipes, ...sortedUncheckedRecipes]);
      console.log([...checkedRecipes, ...sortedUncheckedRecipes])
    }
  }

  private getCheckedRecipes(): Recipe[] {
    return this.recipes.filter(recipe => {
      return recipe.ingredients.every(ingredient => {
        return this.checkedIngredients.includes(ingredient.name);
      });
    });
  }

  private getUncheckedRecipes(): Recipe[] {
    return this.recipes.filter(recipe => {
      return !recipe.ingredients.every(ingredient => {
        return this.checkedIngredients.includes(ingredient.name);
      });
    });
  }

  private sortRecipesByMissingIngredients(recipes: Recipe[]): Recipe[] {
    return recipes.sort((recipeA, recipeB) => {
      const missingIngredientsInA = this.getMissingIngredients(recipeA);
      const missingIngredientsInB = this.getMissingIngredients(recipeB);
      return missingIngredientsInA.length - missingIngredientsInB.length;
    });
  }

  private getMissingIngredients(recipe: Recipe): string[] {
    return recipe.ingredients.filter(ingredient => {
      return !this.checkedIngredients.includes(ingredient.name);
    }).map(ingredient => ingredient.name);
  }
}
