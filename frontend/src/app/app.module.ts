import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { RecipeIndexComponent } from './views/recipe-index/recipe-index.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeListComponent } from './cmps/recipe-list/recipe-list.component';
import { RecipePreviewComponent } from './cmps/recipe-preview/recipe-preview.component';
import { RecipeDetailsComponent } from './views/recipe-details/recipe-details.component';
import { RecipeFilterComponent } from './cmps/recipe-filter/recipe-filter.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './views/about/about.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { HamburgerComponent } from './cmps/hamburger/hamburger.component';
import { UserMsgComponent } from './cmps/user-msg/user-msg.component';
import { RecipeEditComponent } from './views/recipe-edit/recipe-edit.component';
import {ContenteditableDirective} from './directives.module';
import { IngredientEditComponent } from './cmps/ingredient-edit/ingredient-edit.component'

@NgModule({
  declarations: [
    AppComponent,
    RecipeIndexComponent,
    RecipeListComponent,
    RecipePreviewComponent,
    RecipeDetailsComponent,
    RecipeFilterComponent,
    AboutComponent,
    AppHeaderComponent,
    HamburgerComponent,
    UserMsgComponent,
    RecipeEditComponent,
    ContenteditableDirective,
    IngredientEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
