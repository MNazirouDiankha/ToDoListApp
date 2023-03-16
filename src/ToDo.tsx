import React, { useState } from "react";
import styled from "styled-components";
import Button from "./components/Button";
import Modal from "react-modal";
import { Styles } from "react-modal";

interface Todo {
  id: number;
  name: string;
  status: string;
  creationDate: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableData = styled.td`
  padding: 8px;
  text-align: center;
`;

const customModalStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};

const ToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValues, setInputValues] = useState<{
    name: string;
    status: string;
    creationDate: string;
  }>({
    name: "",
    status: "",
    creationDate: "",
  });
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValues({
      ...inputValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreateTodo = () => {
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 1000),
      name: inputValues.name,
      status: inputValues.status,
      creationDate: inputValues.creationDate,
    };
    setTodos([...todos, newTodo]);
    setInputValues({
      name: "",
      status: "",
      creationDate: "",
    });
  };

  const handleUpdateTodo = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            name: inputValues.name,
            status: inputValues.status,
            creationDate: inputValues.creationDate,
          }
        : todo
    );
    setTodos(updatedTodos);
    setInputValues({
      name: "",
      status: "",
      creationDate: "",
    });
    setSelectedTodo(null);
    setIsOpen(false);
  };

  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  const handleOpenModal = (todo: Todo) => {
    setSelectedTodo(todo);
    setInputValues({
      name: todo.name,
      status: todo.status,
      creationDate: todo.creationDate,
    });
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTodo(null);
    setInputValues({
      name: "",
      status: "",
      creationDate: "",
    });
    setIsOpen(false);
  };

  return (
    <Container>
      <h1>ToDo List</h1>
      {/*Utiliser une fonction flechée sous forme de constante; voir useCallBack*/}
      <Button onClick={() => setCreateModalIsOpen(true)}>Create</Button>
      <Modal
        isOpen={createModalIsOpen}
        onRequestClose={() => setCreateModalIsOpen(false)}
        style={customModalStyles}
      >
        <h2>Create Todo</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={inputValues.status}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Creation Date:
          <input
            type="Date"
            name="creationDate"
            value={inputValues.creationDate}
            onChange={handleInputChange}
          />
        </label>
        <div>
          <Button
            onClick={() => {
              handleCreateTodo();
              setCreateModalIsOpen(false);
            }}
          >
            Create
          </Button>
          <Button onClick={() => setCreateModalIsOpen(false)}>Cancel</Button>
        </div>
      </Modal>

      <Table>
        <thead>
          <TableRow>
            <th>Name</th>
            <th>Status</th>
            <th>Creation Date</th>
          </TableRow>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <TableRow key={todo.id}>
              <TableData>{todo.name}</TableData>
              <TableData>{todo.status}</TableData>
              <TableData>{todo.creationDate}</TableData>
              <TableData>
                <Button>Read</Button>
                <Button onClick={() => handleOpenModal(todo)}>Update</Button>
                <Button onClick={() => handleDeleteTodo(todo.id)}>
                  Delete
                </Button>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        style={customModalStyles}
      >
        <h2>Update Todo</h2>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={inputValues.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="status">Status: </label>
          <input
            type="text"
            id="status"
            name="status"
            value={inputValues.status}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="creationDate">Creation Date: </label>
          <input
            type="Date"
            id="creationDate"
            name="creationDate"
            value={inputValues.creationDate}
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={() => handleUpdateTodo(selectedTodo!.id)}>
          Update
        </Button>
        <Button onClick={handleCloseModal}>Cancel</Button>
      </Modal>
    </Container>
  );
};

export default ToDo;
