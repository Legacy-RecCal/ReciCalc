import React from 'react';
import { Container, Header } from 'semantic-ui-react';

const RecipeSuggestion = (props) => {
 return (<Container text fluid>
    <Header as='h2'>Recipe Suggestion</Header>
    <Header as='h4'>Chicken Recipe</Header>
    <p>
      <ul>
    {/* {props.ingredients.map((ingredient) => <li>ingredient</li>)} */}
      </ul>
    </p>
  </Container>)

}

export default RecipeSuggestion;

