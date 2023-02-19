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
  subscription!: Subscription

  editedQuantity = '';
  editedName = '';

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe || this.recipeService.getEmptyRecipe() as Recipe
    })
    setTimeout(()=> this.setTextareaHeight(),1)
   
     }

     setTextareaHeight() {
      console.log('set height')
      const textarea = document.querySelector('.directions-area') as HTMLTextAreaElement;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    }

  async onSaveRecipe() {
    console.log("onSaveRecipe")
    await lastValueFrom(this.recipeService.save(this.recipe))
    this.router.navigateByUrl('/')

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  

  onRemoveIngredient(id: string) {
    this.recipe.ingredients = this.recipe.ingredients.filter(currIngredient => {
      return currIngredient.id !== id
    });
  }

  onAddIngredient(): void {
    const newIngredient: Ingredient= {
      id:this._makeId(),
      quantity: 'Amount',
      name:'Name'
    }
    this.recipe.ingredients.push(newIngredient)
  }

  onBack() {
    this.router.navigateByUrl('/')
  }

  _makeId(): string {
    return `id-${Date.now()}}-${Math.random()}`
  }
}
