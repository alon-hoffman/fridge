import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolver implements Resolve<Recipe> {
  constructor(private recipeService: RecipeService) { }
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> {
    const recipeId = route.params['_id']
    return this.recipeService.getById(recipeId).pipe(delay(100))
  }
}
