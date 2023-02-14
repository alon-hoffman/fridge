import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription, switchMap } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  @Input() recipeId!: string
  recipe!: Recipe
  ans!: string

  subscription!: Subscription


  async ngOnInit(): Promise<void> {

    this.subscription = this.route.data.subscribe(data => {
      this.recipe = data['recipe']
    })

    // this.subscription = this.route.params.subscribe(async params => {
    //     const recipeId = params['id']
    //     const recipe = await lastValueFrom(this.recipeService.getById(recipeId))
    //     this.recipe = recipe
    // })


    // this.subscription = this.route.params
    //     .pipe(switchMap(params => this.recipeService.getById(params['id'])))
    //     .subscribe(recipe => this.recipe = recipe)


    // NEVER REALLY BAD,  Never subscribe inside subscribe!
    // this.subscription = this.route.params.subscribe(async params => {
    //     const recipeId = params['id']
    //     this.recipeService.getById(recipeId).subscribe(recipe => {
    //         this.recipe = recipe
    //     })
    // })
  }


  // onShouldAdoptRecipe() {
  //   this.recipeService.shouldAdoptRecipe().subscribe({
  //     next: (ans: string) => {
  //       this.ans = ans
  //       setTimeout(() => {
  //         this.ans = ''
  //       }, 1500);
  //     },
  //     error: (err: HttpErrorResponse) => {
  //       console.log('err component:', err)
  //     },

  //     complete() {

  //     },
  //   })
  // }

  onBack() {
    this.router.navigateByUrl('/')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
