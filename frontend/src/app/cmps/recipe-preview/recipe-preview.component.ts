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

  onRemoveRecipe(ev: MouseEvent) {
    ev.stopPropagation();
    this.onRemove.emit(this.recipe._id);
  }

  onShowDetails(): void {
    console.log('showDetails');
    this.router.navigate(['/details', this.recipe._id]);
  }

  onEditRecipe(ev: MouseEvent) {
    console.log(this.recipe._id)
    ev.stopPropagation();
    this.router.navigate(['/edit', this.recipe._id]);
  }
}
