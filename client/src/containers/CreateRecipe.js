import React from 'react';
import {
  ControlLabel,
  Form,
  Panel,
  Row,
  FormGroup,
  FormControl,
  Button,
} from 'react-bootstrap';

class CreateRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      ingredients: [''],
      instructions: [{ text: '', url: '' }],
    };
  }

  handleSubmit(form) {
    this.state.title = form.title;
  }

  render() {
    return (
      <Panel onSubmit={this.handleSubmit} bsStyle="info">
        <Panel.Heading>
          <Panel.Title componentClass="h3">Create a recipe</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <Form>
            <FormGroup controlId="formHorizontalTitle">
              <Row componentClass={ControlLabel} sm={4}>
                Title
              </Row>
              <Row sm={3}>
                <FormControl type="title" placeholder="Recipe title" />
              </Row>
            </FormGroup>
            <FormGroup controlId="formHorizontalIngredients">
              <Row componentClass={ControlLabel} sm={4}>
                Ingredients
                <Button type="button" className="small">+</Button>
              </Row>
              {this.state.ingredients.map((ingredient, idx) => (
                <Row sm={3}>
                  <FormControl type="ingredient" placeholder="Ingredient" />
                  <Button type="button" className="small">-</Button>
                </Row>
              ))}
            </FormGroup>
            <FormGroup controlId="formHorizontalInstructions">
              <Row componentClass={ControlLabel} sm={4}>
                Instructions
                <Button type="button" className="small">+</Button>
              </Row>
              {this.state.instructions.map((instruction, idx) => (
                <Row sm={3}>
                  <FormControl type="text" placeholder="Instruction" />
                  <FormControl type="url" placeholder="Image URL" />
                  <Button type="button" className="small">-</Button>
                </Row>
              ))}
            </FormGroup>
          </Form>
        </Panel.Body>
      </Panel>
    );
  }
}

export default CreateRecipe;
