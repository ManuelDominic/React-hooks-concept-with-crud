import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AddStudentsResults = props => {
  const initialFormState = {
    studentId: null,
    username: "",
    sst: "",
    science: "",
    english: "",
    math: "",
    Avg: ""
  };
  const [studentResults, setUser] = useState(initialFormState);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...studentResults, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        if (!studentResults.username) return;

        props.addStudentResult(studentResults);
        setUser(initialFormState);
      }}
    >
      <label>username</label>
      <input
        type="text"
        name="username"
        value={studentResults.username}
        onChange={handleInputChange}
      />
      <br />
      <label>sst</label>
      <input
        type="text"
        name="sst"
        value={studentResults.sst}
        onChange={handleInputChange}
      />
      <label>science</label>
      <input
        type="text"
        name="science"
        value={studentResults.science}
        onChange={handleInputChange}
      />
      <br />
      <label>english</label>
      <input
        type="text"
        name="english"
        value={studentResults.english}
        onChange={handleInputChange}
      />
      <label>math</label>
      <input
        type="text"
        name="math"
        value={studentResults.math}
        onChange={handleInputChange}
      />
      <br />
      <button>Add Results</button>
    </form>
  );
};

const EditStudentsResults = props => {
  const [studentResults, setUser] = useState(props.currentUser);

  useEffect(() => {
    setUser(props.currentUser);
  }, [props]);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setUser({ ...studentResults, [name]: value });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        props.updateStudentResult(studentResults.studentId, studentResults);
      }}
    >
      <label>username</label>
      <input
        type="text"
        name="username"
        value={studentResults.username}
        onChange={handleInputChange}
      />
      <label>sst</label>
      <input
        type="text"
        name="sst"
        value={studentResults.sst}
        onChange={handleInputChange}
      />
      <label>science</label>
      <input
        type="text"
        name="science"
        value={studentResults.science}
        onChange={handleInputChange}
      />
      <label>english</label>
      <input
        type="text"
        name="english"
        value={studentResults.english}
        onChange={handleInputChange}
      />
      <label>math</label>
      <input
        type="text"
        name="math"
        value={studentResults.math}
        onChange={handleInputChange}
      />
      <button>Update studentResults</button>
      <button
        onClick={() => props.setEditing(false)}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

const StudentsResultsTable = props => (
  <table>
    <thead>
      <tr>
        <th>username</th>
        <th>sst</th>
        <th>science</th>
        <th>english</th>
        <th>math</th>
        <th>Total</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {props.studentsResults.length > 0 ? (
        props.studentsResults.map(studentResults => (
          <tr key={studentResults.studentId}>
            <td>{studentResults.username}</td>
            <td>{studentResults.sst}</td>
            <td>{studentResults.science}</td>
            <td>{studentResults.english}</td>
            <td>{studentResults.math}</td>
            <td>{studentResults.Avg}</td>
            <td>
              <button
                onClick={() => {
                  props.editRow(studentResults);
                }}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteStudentResult(studentResults.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={3}>No studentsResults</td>
        </tr>
      )}
    </tbody>
  </table>
);

const App = () => {
  const usersData = [
    {
      studentId: 1,
      username: "Tania",
      sst: 70,
      science: 65,
      english: 58,
      math: 76,
      Avg: 67
    },
    {
      studentId: 2,
      username: "Craig",
      sst: 70,
      science: 65,
      english: 59,
      math: 76,
      Avg: 68
    },
    {
      studentId: 3,
      username: "Ben",
      sst: 71,
      science: 65,
      english: 88,
      math: 76,
      Avg: 75
    }
  ];

  const initialFormState = {
    studentId: null,
    username: "",
    sst: "",
    science: "",
    english: "",
    math: "",
    Avg: ""
  };

  const [studentsResults, setUsers] = useState(usersData);
  const [currentUser, setCurrentUser] = useState(initialFormState);
  const [editing, setEditing] = useState(false);

  const addStudentResult = studentResults => {
    studentResults.studentId = studentsResults.length + 1;
    studentResults.Avg = Math.round(
      (studentResults.sst +
        studentResults.science +
        studentResults.english +
        studentResults.math) /
        4
    );
    setUsers([...studentsResults, studentResults]);
  };

  const deleteStudentResult = studentId => {
    setEditing(false);

    setUsers(
      studentsResults.filter(
        studentResults => studentResults.studentId !== studentId
      )
    );
  };

  const updateStudentResult = (studentId, updatedUser) => {
    setEditing(false);

    setUsers(
      studentsResults.map(studentResults =>
        studentResults.studentId === studentId ? updatedUser : studentResults
      )
    );
  };

  const editRow = studentResults => {
    setEditing(true);

    setCurrentUser({
      studentId: studentResults.studentId,
      username: studentResults.username,
      sst: studentResults.sst,
      science: studentResults.science,
      english: studentResults.english,
      math: studentResults.math
    });
  };

  return (
    <div className="container">
      <h1>Students Portal</h1>
      <div className="flex-row">
        <div className="flex-large">
          {editing ? (
            <React.Fragment>
              <h2>Edit studentResults</h2>
              <EditStudentsResults
                editing={editing}
                setEditing={setEditing}
                currentUser={currentUser}
                updateStudentResult={updateStudentResult}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Add studentResults</h2>
              <AddStudentsResults addStudentResult={addStudentResult} />
            </React.Fragment>
          )}
        </div>
        <div className="flex-large">
          <h2>View studentsResults</h2>
          <StudentsResultsTable
            studentsResults={studentsResults}
            editRow={editRow}
            deleteStudentResult={deleteStudentResult}
          />
        </div>
      </div>
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
