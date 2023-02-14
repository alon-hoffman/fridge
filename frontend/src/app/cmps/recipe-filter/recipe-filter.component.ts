import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeFilter } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'Recipe-filter',
  templateUrl: './Recipe-filter.component.html',
  styleUrls: ['./Recipe-filter.component.scss']
})
export class RecipeFilterComponent implements OnInit, OnDestroy {

  constructor(private recipeService: RecipeService) { }

  subscription!: Subscription


  recipeFilter!: RecipeFilter

  ngOnInit(): void {
    this.subscription = this.recipeService.recipeFilter$.subscribe(recipeFilter => {
      this.recipeFilter = recipeFilter
    })
  }

  onSetFilter() {
    this.recipeService.setFilter({ ...this.recipeFilter })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
