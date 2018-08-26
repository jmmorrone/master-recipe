import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { getAllRecipes } from '../services/recipeService';

class Recipes extends Component {
  constructor() {
    super();
    this.state = { recipes: [] };
  }

  componentDidMount() {
    this.getRecipes();
  }

  getRecipes() {
    getAllRecipes().then((recipes) => {
      this.setState({ recipes });
    });
  }

  render() {
    const { recipes } = this.state;
    return (
      <div>
        <ListGroup>
          {recipes.map((recipe, index) => (
            <ListGroupItem key={index} header={recipe.title} href={`/recipes/${recipe._id}`}>
              by {recipe.author}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Recipes;
