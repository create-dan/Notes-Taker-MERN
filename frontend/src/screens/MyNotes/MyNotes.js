import React, { useEffect } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

import "./MyNotes.css";
import axios from "axios";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading/Loading";
import ErrorMessage from "../../components/ErrorMessage.js";
const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const navigate = useNavigate();
  const deleteHandler = (id) => {
    if (window.confirm("Are you Sure")) {
      dispatch(deleteNoteAction(id));
    }
    console.log("dddd");
  };

  // console.log('notes are here bava', notes);

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    successCreate,
    navigate,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <div>
      <MainScreen title={`Welcome back ${userInfo.name}`}>
        <Link to="/createnote">
          <Button style={{ marginLeft: 10, marginRight: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>

        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        {notes
          ?.reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion key="note._id">
              <Accordion.Item eventKey="0">
                <Card style={{ margin: 10 }}>
                  <Card.Header style={{ display: "flex" }}>
                    <span
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      {/* <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                    {note.title}
                  </Accordion.Toggle> */}
                      <Accordion.Header>{note.title}</Accordion.Header>
                    </span>

                    <div>
                      <Button href={`/note/${note._id}`}>Edit</Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => deleteHandler(note._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card.Header>
                  {/* <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge bg="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Created on - Date
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse> */}

                  {/* ***** */}
                  <Accordion.Body>
                    <Card.Body>
                      <h4>
                        <Badge bg="success">Category - {note.category}</Badge>
                      </h4>
                      <blockquote className="blockquote mb-0">
                        <p>{note.content}</p>
                        <footer className="blockquote-footer">
                          Created on -
                          <cite title="Source Title">{note.createdAt}</cite>
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Accordion.Body>
                </Card>
              </Accordion.Item>
            </Accordion>
          ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
