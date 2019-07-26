import React, { Component } from "react";
import axios from "axios";
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from "reactstrap";

class App extends Component {
  state = {
    books: [],
    newBookData: {
      title: "",
      rating: ""
    }
  }
  componentWillMount() {
    axios.get("http://localhost3000/books").then((response) => {
      this.setState({
        books: response.data,
        newBookModal: false
      })
    });
  }
  toggleNewBookModal () {
    this.setState({
      newBookModal: ! this.state.newBookModal
    })
  }
  addBook() {
    axios.post("http://localhost:3000/books", this.state.newBookData).then((response) => {
      console.log(response.data);
    });
  }
render() {
  let books = this.state.books.map((book) => {
    return (
      <tr key ={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.rating}</td>
          <td>
            <Button color ="success" size ="sm" className="mr-2">Edit</Button>
            <Button color ="danger" size ="sm">Delete</Button>
          </td>
          </tr>
    )
  })
  return (
    <div className="App container">

        <Button color="primary" onClick={this.toggleNewBookModal.bind(this)}>Add Book</Button>
          <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
            <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add a new book</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="title">Title</Label>
                <Input id="title" value={this.state.newBookData.title} onChange={(e) => {
                  let { newBookData } = this.state;

                  newBookData.title = e.target.value;
                  
                  this.setState({ newBookData });
                }} />
              </FormGroup>
              <FormGroup>
                <Label for="rating">Rating</Label>
                <Input id="rating" value={this.state.newBookData.rating} onChange={(e) => {
                  let { newBookData } = this.state;

                  newBookData.rating = e.target.value;
                  
                  this.setState({ newBookData });

                }} />
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addBook.bind(this)}>Add a new book</Button>{' '}
              <Button color="secondary" onClick={this.toggleNewBookModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books}
        </tbody>
      </Table>
    </div>
  );
}
}

export default App;
