import { useMutation, useQuery } from '@apollo/client';

import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

// import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
// import { removeBookId } from '../utils/localStorage';
import { DELETE_BOOK } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';

const SavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [deleteBook, { error }] = useMutation(DELETE_BOOK);

  const userData = data?.user || {};

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // show this when user is not logged in
  if (!userData.username) {
    return <h2>Please log in to see this page</h2>;
  }

  // console.log(userData);
  // console.log(data.user);
  // console.log(data.user.savedBooks);

  const handleDeleteBook = async bookId => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log(token);

    if (!token) {
      return false;
    }

    try {
      // const response = await deleteBook(bookId, token);
      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      await deleteBook({ variables: { bookId } });

      // console.log(data);
      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      // removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks.map(book => {
            return (
              <Card
                key={book.bookId}
                border="dark"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  window.open(book.link);
                }}
              >
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`The cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}

                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={event => {
                      event.stopPropagation();
                      handleDeleteBook(book.bookId);
                    }}
                  >
                    Delete this Book!
                  </Button>
                  {error && <div>Deletion failed</div>}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
