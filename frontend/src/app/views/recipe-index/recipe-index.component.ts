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
  recipesToShow: Recipe[] = [];

  subscription!: Subscription
  //@ts-ignore
  onFilterChange(payload):void{
    console.log("🚀 ~ file: recipe-index.component.ts:25 ~ RecipeIndexComponent ~ onFilterChange ~ payload", payload)
    // this.recipesToShow= checkedRecipes
  }
  // onFilterChange(checkedRecipes:Recipe[], sortedUncheckedRecipes:Recipe[]|null):void{
  //   this.recipesToShow= checkedRecipes
  // }
  onRemoveRecipe(recipeId: string) {
    this.recipeService.remove(recipeId)
    this.userMsgService.setMsg(`Recipe (${recipeId}) removed!`)

  }

  ngOnInit(): void {
    this.subscription = this.recipeService.query().subscribe(recipes => {
      this.recipes = recipes
      this.recipesToShow = recipes
    });
  }
  
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
