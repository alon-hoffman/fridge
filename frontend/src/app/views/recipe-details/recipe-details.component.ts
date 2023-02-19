import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Recipe, Ingredient } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent  implements OnInit {
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  recipe!: Recipe
  subscription!: Subscription

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe || this.recipeService.getEmptyRecipe() as Recipe
    }) 
     }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onBack() {
    this.router.navigateByUrl('/')
  }
}
