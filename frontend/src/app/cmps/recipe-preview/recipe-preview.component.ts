import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'recipe-preview',
  templateUrl: './recipe-preview.component.html',
  styleUrls: ['./recipe-preview.component.scss']
})

export class RecipePreviewComponent {
  @Input() recipe!: Recipe;
  @Output() onRemove = new EventEmitter<string>();

  constructor(private router: Router) {}

  onRecipeDetail(ev: MouseEvent):void{
    ev.stopPropagation();
    this.router.navigate(['/recipe', this.recipe._id]);
    console.log(this.recipe._id)
  }

  onRemoveRecipe(ev: MouseEvent) {
    ev.stopPropagation();
    this.onRemove.emit(this.recipe._id);
  }

  onShowDetails(): void {
    console.log('showDetails');
    this.router.navigate(['/recipe', this.recipe._id]);
}

  onEditRecipe(ev: MouseEvent) {
    ev.stopPropagation();
    this.router.navigate(['/edit', this.recipe._id]);
  }
}
