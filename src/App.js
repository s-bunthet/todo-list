import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, {useState} from "react";

function App() {
  //   list of the tasks
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [id, setId] = useState(0);

  function addTask(input,id) {
      // control that input in not empty
      if (input===""){
          alert("Input can not be empty");
          return;
      }
      const updatedTasks = [...tasks];
      updatedTasks.push({detail:input, id:id})
      setTasks(updatedTasks);
      setInput('');
      setId(id+1);
  }

  function deleteTask(id) {
      const updatedTasks = tasks.filter(task => task.id !== id);
      setTasks(updatedTasks);
  }


  return (
      <Container className={`App px-4`} fluid={`md`} >
          <Row className={`justify-content-center`}>
              <Col xs={12} md={6} className={`text-center`}>
                  <h1>TODO LIST</h1>
                  <form>
                      <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                      <button type="button" onClick={()=>addTask(input,id)}>Add</button>
                  </form>

              </Col>

          </Row>
          <Row className={`justify-content-center`}>
              <Col xs={12} md={6}>
                  {
                      tasks.map((task) => (
                          <div key={task.id}>
                              {task.detail}
                              <button type="button" onClick={()=>deleteTask(task.id)}>Delete</button>
                          </div>
                      ))
                  }
              </Col>
          </Row>
      </Container>

  );
}

export default App;
