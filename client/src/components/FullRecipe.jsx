import React, {Component} from 'react';
import Axios from 'axios';

class FullRecipe extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
  }

  componentDidMount() {
    // make call to database for particular recipe referencing {this.props.match.params.id} to retrieve recipe by id number
    // recipe object returned in format below. hardcoding example for testing
    Axios.get(`/api/recipes/${this.props.match.params.id}`).then(response => {
      console.log('successful fullrecipe.jsx request',response.data);
      this.setState({
        recipe: {
          title: response.data.title,
          id: this.props.match.params.id,
          description: response.data.description,
          topIngredients: response.data.topIngredients,
          ingredients: response.data.ingredients.map(ingredient => {
            return {
              name: ingredient.name,
              ndbno: ingredient.ndbno,
              quantity: ingredient.quantity,
              nutrition: {
                kcalPer: parseFloat(ingredient.nutrition.kcalPer),
                fatPer: parseFloat(ingredient.nutrition.fatPer),
                satFatPer: parseFloat(ingredient.nutrition.satFatPer),
                fiberPer: parseFloat(ingredient.nutrition.fiberPer),
                cholesterolPer: parseFloat(ingredient.nutrition.cholesterolPer),
                sodiumPer: parseFloat(ingredient.nutrition.sodiumPer),
                carbsPer: parseFloat(ingredient.nutrition.carbsPer),
                sugarPer: parseFloat(ingredient.nutrition.sugarPer),
                proteinPer: parseFloat(ingredient.nutrition.proteinPer)
              }
          }}),
          instructions: response.data.instructions
        }
      })
    })
    .catch(error => {
      console.log('error: ', error)
    })
  }

  calculateNutrition(){
    const {recipe} = this.state
    let totalNutrition = {};
    for (let ingredient of recipe.ingredients) {
      for (let nutrient in ingredient.nutrition) {
        if (!isNaN(ingredient.nutrition[nutrient])) {
          let ingredientNutrientContribution = Math.round(ingredient.nutrition[nutrient]*ingredient.quantity)/100
          totalNutrition[nutrient] = totalNutrition[nutrient] + ingredientNutrientContribution  || ingredientNutrientContribution; 
        } else {
          totalNutrition[nutrient] = totalNutrition[nutrient] || 0;
        }
      }
    }
    console.log(totalNutrition);
    return totalNutrition;
  }

  render () {
    const {recipe} = this.state;
    if (recipe === undefined) {
      return(<div>ERROR: RECIPE DOES NOT EXIST</div>)
    } else {
      let nutritionObject = this.calculateNutrition();
      return (
        <div id='full-recipe'>
          <h2>WILL RENDER FULL RECIPE FOR RECIPE WITH ID NUMBER : {this.props.match.params.id}</h2>
          <h3>{recipe.title}</h3>
          <p className='description'>{recipe.description}</p>
          <ul>
            <h4>Ingredients:</h4>
            {recipe.ingredients.map(ingredient => 
              <li key={ingredient.ndbno}>{ingredient.name}  -  {ingredient.quantity} grams</li>)}
          </ul>
          <ol>
            <h4>Instructions:</h4>
            {recipe.instructions.map((instruction, index) =>
              <li key={index}>{instruction}</li>  
            )}
          </ol>
          <div id='nutrition'>
            <h4>Nutrition Information</h4>
            <ul id='nutrient-list'>
              <li className='nutrient'>Calories: {nutritionObject.kcalPer} cals</li>
              <li className='nutrient'>Total Fat: {nutritionObject.fatPer} g</li>
              <li className='nutrient'>Saturated Fat: {nutritionObject.satFatPer} g</li>
              <li className='nutrient'>Cholesterol: {nutritionObject.cholesterolPer} mg</li>
              <li className='nutrient'>Sodium: {nutritionObject.sodiumPer} mg</li>
              <li className='nutrient'>Total Carbohydrates: {nutritionObject.carbsPer} g</li>
              <li className='nutrient'>Sugar: {nutritionObject.sugarPer} g</li>
              <li className='nutrient'>Fiber: {nutritionObject.fiberPer} g</li>
              <li className='nutrient'>Protein: {nutritionObject.proteinPer} g</li>
            </ul>
          </div>
        </div>
      )
    }
  }
}

export default FullRecipe;