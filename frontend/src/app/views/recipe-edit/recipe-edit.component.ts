import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Recipe, Ingredient } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  recipe!: Recipe
  ingredient: { quantity: string, name: string, id: string } = { quantity: '', name: '', id: this._makeId() }
  subscription!: Subscription
  editingIngredient: { quantity: string, name: string, id: string } | null = null;

  editedQuantity = '';
  editedName = '';

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe || this.recipeService.getEmptyRecipe() as Recipe
    })
     }

  async onSaveRecipe() {
    console.log("onSaveRecipe")
    await lastValueFrom(this.recipeService.save(this.recipe))
    this.router.navigateByUrl('/')

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onEditIngredient(ingredient: { quantity: string, name: string, id: string }): void {
    this.editingIngredient = ingredient;
  }

  onRemoveIngredient(id: string) {
    this.recipe.ingredients = this.recipe.ingredients.filter(currIngredient => {
      return currIngredient.id !== id
    });
  }

  onAddIngredient(): void {
    if (this.ingredient.name && this.ingredient.quantity) this.recipe.ingredients.push(this.ingredient)
  }

  onBack() {
    this.router.navigateByUrl('/')
  }

  _makeId(): string {
    return `id-${Date.now()}}-${Math.random()}`
  }

  onIngredientChange(ingredient: Ingredient) {
    // this.recipe.ingredients = this.recipe.ingredients.map(currIngredient => {
    //   if (currIngredient.id === ingredient.id) return ingredient;
    //   return currIngredient });
    //   this.recipeService.save(this.recipe);
  }

}
