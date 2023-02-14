export interface Recipe {
  _id?: string
  name: string
  imgURL: string
  ingredients: { id: string, quantity: string, name: string, }[]
  link?: string
  directions?: string
}

export interface Ingredient {
  id: string, quantity: string, name: string
}

export interface RecipeFilter {
  term: string
}
