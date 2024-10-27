import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Modal} from "react-bootstrap";

function App() {
  //   list of the tasks
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [id, setId] = useState(0);
  const [updatingTask, setUpdatingTask] = useState(null);
  const [validated, setValidated] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleShowModal = (id) => {
    setShowModal(true);
    const t = tasks.filter(task => task.id === id)[0];
    setUpdatingTask(t);
  }

  function updateTask(task) {
      const updatedTasks = tasks.map((t) => {
          if (t.id === task.id) {
              return task;
          }else{
              return t;
          }
      })

      setTasks(updatedTasks);
      handleCloseModal();
  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
    event.preventDefault(); // Prevents default form submission behavior
    addTask(input, id);
    }
  };


  const handleKeyDownUpdate = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents default form submission behavior
        updateTask(updatingTask);
    }
  };


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
                                      isInvalid={validated && input.trim() ===""}
                                      onKeyDown={handleKeyDown}
                                  />
                                  <Form.Control.Feedback type="invalid">Task can not be empty!</Form.Control.Feedback>
                              </Form.Group>
                          </Col>
                          <Col md="1" className={`px-0 mx-0`} >
                              <Button
                                  className="btn-success"
                                  type="button"
                                  onClick={()=>addTask(input,id)}

                              >Add</Button>
                          </Col>
                      </Row>

                  </Form>

              </Col>

          </Row>
          <Row className={`justify-content-center mt-5`}>
              <Col xs={12} md={6} className={`px-0 mx-0`}>
                  <ListGroup as="ol" numbered>
                  {
                      tasks.map((task) => (
                          <ListGroup.Item  as="li" key={task.id} className="d-flex justify-content-between align-items-start p-1">
                              <div className={`ms-2 me-auto`}>{task.detail}</div>
                              <Button className={`btn-primary ms-1`} size="sm" type="button"  onClick={()=>handleShowModal(task.id)}>Update</Button>
                              <Button className={`btn-danger ms-1`} size="sm" type="button" onClick={() => deleteTask(task.id)}>Delete</Button>
                          </ListGroup.Item>

                      ))
                  }
                  </ListGroup>

                  {/*Modal when user want to update a task*/}
                  <Modal show={showModal} onHide={handleCloseModal}>
                      <Modal.Header closeButton>
                          <Modal.Title>Update</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <Form.Group>
                              <Form.Control
                                  required
                                  type="text"
                                  value={showModal && updatingTask.detail}
                                  onChange={(e) => setUpdatingTask({detail:e.target.value,id:updatingTask.id})}
                                  isInvalid={validated && updatingTask.detail.trim() ===""}
                                  onKeyDown={handleKeyDownUpdate}
                              />
                              <Form.Control.Feedback type="invalid">Task can not be empty!</Form.Control.Feedback>
                          </Form.Group>
                      </Modal.Body>
                      <Modal.Footer>
                          <Button size="sm" variant="secondary" onClick={handleCloseModal}>
                              Close
                          </Button>
                          <Button size="sm" variant="primary" onClick={() => updateTask(updatingTask)}>
                              Save Changes
                          </Button>
                      </Modal.Footer>
                  </Modal>
              </Col>
          </Row>
      </Container>

  );
}

export default App;
