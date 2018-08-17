import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Nav from './Nav';
import getAllRecipes from '../utils/masterrecipe-api';

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
        <Nav />
        <ListGroup>
          {recipes.map((recipe, index) => (
            <ListGroupItem key={index} header={recipe.title} href={`api/recipes/${recipe._id}`}>
              {recipe.author}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Recipes;
