import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { UserMsgService } from 'src/app/services/user-msg.service';

@Component({
  selector: 'recipe-index',
  templateUrl: './recipe-index.component.html',
  styleUrls: ['./recipe-index.component.scss']
})
export class RecipeIndexComponent implements OnInit, OnDestroy {

  constructor(
    private recipeService: RecipeService,
    private userMsgService: UserMsgService
  ) { }

  recipes: Recipe[] = [];

  subscription!: Subscription

  onRemoveRecipe(recipeId: string) {
    this.recipeService.remove(recipeId)
    this.userMsgService.setMsg(`Recipe (${recipeId}) removed!`)

  }

  ngOnInit(): void {
    this.subscription = this.recipeService.query().subscribe(recipes => {
      this.recipes = recipes
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
