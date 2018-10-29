import React, { Component } from 'react';
import { Panel, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
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
        {recipes.map((recipe, index) => (
          <Col sm={4} key={index}>
            <Panel bsStyle="success">
              <Panel.Heading>
                <Panel.Title>
                  <Router>
                    <Link to={`/recipes/${recipe._id}`}>{recipe.title} by {recipe.author}</Link>
                  </Router>
                </Panel.Title>
              </Panel.Heading>
              <Panel.Body>
                {recipe.ingredients}
              </Panel.Body>
            </Panel>
          </Col>
        ))}
      </div>
    );
  }
}

export default Recipes;
