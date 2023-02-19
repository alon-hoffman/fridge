import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Recipe, RecipeFilter} from '../models/recipe.model';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient) { }
  //connect for production

private recipesUrl = 'http://localhost:3030/api/recipe'
  

  // Mock the database
  private _recipesDb: Recipe[] = [
    {
      _id: 'p2', name: 'Creamy Peanut Butter Jackfruit Noodles',
      imgURL: 'https://cdn.pickuplimes.com/cache/8a/d4/8ad45c8036b94d3f2b4424e5d3684bc6.jpg',
      ingredients: [{ id: '1a', quantity: '1', name: 'bell pepper' },
      { id: '1', quantity: '2 cups (356 g)', name: ', roughly chopped ' },
      { id: '2', quantity: '1 Tbsp', name: 'vegetable oil' },
      { id: '3', quantity: '14 oz', name: 'pre cooked udon noodles' },
      { id: '4', quantity: '1 stalk', name: 'green onion' },
      ],
      link: 'https://www.pickuplimes.com/recipe/creamy-peanut-butter-jackfruit-noodles-1075',
      directions: `To a sauté pan on medium-high heat, cook the bell pepper and jackfruit in the oil for 3 - 4 minutes.
      Meanwhile, combine the sauce ingredients in a jar.
      Add the udon noodles and the white and light green parts of the green onion to the pan. Gently break the noodles apart, cooking for 2 minutes.
      Pour the sauce into the pan and cook until everything is well coated in sauce.
      Garnish with the dark green parts of the green onion, and add any other desired toppings. Enjoy!
      Storage`
    },
    {
      _id: 'p3', name: 'ASIAN PASTA SALAD',
      imgURL: 'https://life-in-the-lofthouse.com/wp-content/uploads/2016/05/Asian_Pasta_Salad6.jpg',
      ingredients: [
        { id: '1', quantity: '8 ounces', name: 'Linguine pasta' },
        { id: '2', quantity: '2', name: 'green onions' },
        { id: '3', quantity: '1 cup', name: 'matchstick carrots' },
        { id: '4', quantity: '1', name: 'red bell pepper' },
        { id: '5', quantity: '1/4 cup', name: 'chopped celery' },
        { id: '6', quantity: '1/2 cup', name: 'low-sodium soy sauce' },
        { id: '7', quantity: '1/4 cup', name: 'vegetable oil' },
        { id: '8', quantity: '1/4 cup', name: 'light brown sugar' },
        { id: '9', quantity: '2 Tablespoons', name: 'rice vinegar' },
        { id: '10', quantity: '2 teaspoons', name: 'sweet chili sauce' },
        { id: '11', quantity: '1 teaspoon', name: 'sesame oil' },
        { id: '12', quantity: '1/4 teaspoon', name: 'dried ginger' },
        { id: '13', quantity: '1 teaspoon', name: 'chopped fresh ginger' },
      ],
      link: 'https://www.pickuplimes.com/recipe/creamy-peanut-butter-jackfruit-noodles-1075',
      directions: `Cook pasta in a large pot of water according to package directions. Drain water then rinse with cold water to cool.
      Add cooked pasta to a large bowl. Add all the vegetables. Gently toss to combine.
      In a small bowl, whisk all dressing ingredients together. Pour dressing over pasta mixture. Gently toss together to coat with dressing. Cover with lid then place bowl in refrigerator for 2 hours or overnight. (I feel overnight is best.)`
    },

  ];

  private _recipes$ = new BehaviorSubject<Recipe[]>([]);
  public recipes$ = this._recipes$.asObservable()

  private _recipeFilter$ = new BehaviorSubject<RecipeFilter>({ term: '' });
  public recipeFilter$ = this._recipeFilter$.asObservable()


  public query(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getEmptyRecipe() {
    return {
      name: '', ingredients: [], imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8_CToYCR2mMXo9FbgkzkxiGf4jADr1Em8FscYbx_v-w&s',
    }
  }

  public remove(recipeId: string) {
    const recipes = this._recipesDb
    const recipeIdx = recipes.findIndex(recipe => recipe._id === recipeId)
    recipes.splice(recipeIdx, 1)
    this._recipes$.next(recipes);
    return of({})
  }

  public getById(recipeId: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipesUrl}/${recipeId}`)
      .pipe()
  }


  public save(recipe: Recipe): Observable<Recipe> {
    console.log(`${this.recipesUrl}/${recipe._id}`)
    return recipe._id
      ? this.http.put<Recipe>(`${this.recipesUrl}/${recipe._id}`, recipe)
      : this.http.post<Recipe>(this.recipesUrl, recipe);
  }
  

  public setFilter(recipeFilter: RecipeFilter) {
    this._recipeFilter$.next(recipeFilter)
    this.query()
  }

  private _add(recipe: Recipe) {
    recipe._id = this._makeId()
    this._recipesDb.push(recipe)
    this._recipes$.next(this._recipesDb)
    return of(recipe)
  }

  private _edit(recipe: Recipe) {
    const recipes = this._recipesDb
    const recipeIdx = recipes.findIndex(_recipe => _recipe._id === recipe._id)
    recipes.splice(recipeIdx, 1, recipe)
    this._recipes$.next(recipes)
    return of(recipe)
  }

  private _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}

//@ts-ignore
const object ={
  "_id": "63e8e08c177ad5241803f4d5",
  "name": "Creamy Peanut Butter Jackfruit Noodles",
  "imgURL": "https://cdn.pickuplimes.com/cache/8a/d4/8ad45c8036b94d3f2b4424e5d3684bc6.jpg",
  "ingredients": [
    { "id": "1a", "quantity": "1", "name": "bell pepper!!!" },
    { "id": "1", "quantity": "2 cups (356 g)", "name": ", roughly chopped " },
    { "id": "2", "quantity": "1 Tbsp", "name": "vegetable oil" },
    { "id": "3", "quantity": "14 oz", "name": "pre cooked udon noodles" },
    { "id": "4", "quantity": "1 stalk", "name": "green onion" }
  ],
  "link": "https://www.pickuplimes.com/recipe/creamy-peanut-butter-jackfruit-noodles-1075",
  "directions": "To a sauté pan on medium-high heat, cook the bell pepper and jackfruit in the oil for 3 - 4 minutes. Meanwhile, combine the sauce ingredients in a jar. Add the udon noodles and the white and light green parts of the green onion to the pan. Gently break the noodles apart, cooking for 2 minutes. Pour the sauce into the pan and cook until everything is well coated in sauce. Garnish with the dark green parts of the green onion, and add any other desired toppings. Enjoy! Storage"
}
//@ts-ignore
window.axiosCheck = () => {
  fetch('http://localhost:3030/api/recipe/63e8e08c177ad5241803f4d5', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(object)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
};
