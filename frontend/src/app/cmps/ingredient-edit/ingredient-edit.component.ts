import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Ingredient } from 'src/app/models/recipe.model';



@Component({
  selector: 'ingredient-edit',
  templateUrl: './ingredient-edit.component.html',
  styleUrls: ['./ingredient-edit.component.scss'],
})
export class IngredientEditComponent {
  @Input() ingredient!: Ingredient;
  @Output() ingredientChange = new EventEmitter<Ingredient>();
  @Output() removeIngredient = new EventEmitter<string>();

  private debouncer = new Subject();

  ngOnInit() {
    this.debouncer
      .pipe(debounceTime(500))
      .subscribe(ingredient => this.ingredientChange.emit(this.ingredient));
  }

  updateIngredient() {
    this.debouncer.next(this.ingredient);
  }

  onRemove(){
    this.removeIngredient.emit(this.ingredient.id)
  }
}

