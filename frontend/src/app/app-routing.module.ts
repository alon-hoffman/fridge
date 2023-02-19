import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RecipeResolver } from './services/recipre.resolver';
import { AboutComponent } from './views/about/about.component';
import { RecipeDetailsComponent } from './views/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './views/recipe-edit/recipe-edit.component';
import { RecipeIndexComponent } from './views/recipe-index/recipe-index.component';

const routes: Routes = [
  {
    path: 'recipe/:_id',
    component: RecipeDetailsComponent,
    resolve: { recipe: RecipeResolver },
  },
  { path: 'about', component: AboutComponent },
  {
    path: '', component: RecipeIndexComponent
  },
  { path: 'edit/:_id', component: RecipeEditComponent, resolve: { recipe: RecipeResolver } },
  { path: 'edit', component: RecipeEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
