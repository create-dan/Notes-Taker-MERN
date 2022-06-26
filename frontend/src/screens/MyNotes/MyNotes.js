import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../../components/MainScreen";

import "./MyNotes.css";
import axios from "axios";
const MyNotes = () => {

  const [notes, setNotes] = useState([]);
  const deleteHandler = (id) => {
    // if (window.confirm("Are you Sure")) {
    // }
    console.log("dddd");
  };

  const fetchNotes = async () => {
    const {data} = await axios.get("http://localhost:5000/api/notes");
    // console.log("data is here", data);
    setNotes(data);
  };

  // console.log('notes are here bava', notes);

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <MainScreen title="duniya goal hai">
        <Link to="createnote">
          <Button style={{ marginLeft: 10, marginRight: 6 }} size="lg">
            Create New Note
          </Button>
        </Link>

        {notes.map((note) => (
          <Accordion key='note._id'>
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
                        Created on - Date
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
