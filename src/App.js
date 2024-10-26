import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function App() {
  //   list of the tasks
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [id, setId] = useState(0);

  function addTask(input,id) {
      // control that input in not empty
      if (input.trim()===""){
          setValidated(true);
      } else {
          setValidated(false);

          // Handle the "Add" action here
          const updatedTasks = [...tasks];
          updatedTasks.push({detail:input, id:id})
          setTasks(updatedTasks);
          setInput('');
          setId(id+1);
      }


  }

  function deleteTask(id) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
  }

const [validated, setValidated] = useState(false);



  return (
      <Container className={`App px-4`} fluid={`md`} >
          <Row className={`justify-content-center`}>
              <Col xs={12} md={6} className={`text-center`}>
                  <h1 className={`text-primary fw-bold`}>TODO List</h1>
                  <Form noValidate>
                      <Row className={`justify-content-between`}>
                          <Col md="11" className={`px-0`}>
                              <Form.Group>
                                  <Form.Control
                                      required
                                      type="text"
                                      placeholder="Write your task here ..."
                                      defaultValue=""
                                      value={input}
                                      onChange={(e) => setInput(e.target.value)}
                                      className="mb-3 "
                                      isInvalid={validated && input.trim() ===""}
                                  />
                                  <Form.Control.Feedback type="invalid">Task can not be empty!</Form.Control.Feedback>
                              </Form.Group>
                          </Col>
                          <Col md="1" className={`px-0 mx-0`} >
                              <Button  className="mb-1 btn-success" type="button" onClick={()=>addTask(input,id)}>Add</Button>
                          </Col>
                      </Row>

                  </Form>

              </Col>

          </Row>
          <Row className={`justify-content-center`}>
              <Col xs={12} md={6} className={`px-0 mx-0`}>
                  <ListGroup as="ol" numbered>
                  {
                      tasks.map((task) => (
                          <ListGroup.Item  as="li" key={task.id} className="d-flex justify-content-between align-items-start p-1">
                              <div className={`ms-2 me-auto`}>{task.detail}</div>
                              <Button className={`btn-danger`} size="sm" type="button" onClick={() => deleteTask(task.id)}>Delete</Button>
                          </ListGroup.Item>

                      ))
                  }
                  </ListGroup>
              </Col>
          </Row>
      </Container>

  );
}

export default App;
