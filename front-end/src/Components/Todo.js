import { TodosContext } from "../Contexts/TodosContext";
import { useContext, useState } from "react";

import axios from "axios"

export default function Todo({ todo, save }) {
  const { todos, setTodos } = useContext(TodosContext);
  const [deleteDialogue, setDeleteDialogue] = useState(false);
  const [editDialogue, setEditDialogue] = useState(false);

  const [taskForm, setTaskForm] = useState({
    title: todo.title,
    Assignee: todo.assignee,
    status: todo.status,
    estimate: todo.estimate,
    tag: todo.tags.join(" "),
    Description: todo.description,
  });

  // console.log("Insdie toto 400", todo);

  // console.log("Todo status:", todo.assignee);
  const handleDeleteClick = () => {
    setDeleteDialogue(true);
  };

  const handleEditClick = () => {
    setEditDialogue(true);
  };

  const handleYesDeleteButton = () => {
    const updatedTodos = todos.filter((t) => {
      return todo._id !== t._id;
    });
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    console.log("handleDeleteClick", updatedTodos);
    setTodos(updatedTodos);
  };

  async function handleSaveEditButton  () {
    let tagsArray = [];
    let tagString = "";
    for (let letter of taskForm.tag) {
      if (letter === " ") {
        if (tagString.length > 0) {
          // Check to avoid pushing empty tags
          tagsArray.push(tagString);
        }
        tagString = "";
      } else {
        tagString += letter;
      }
    }

    // Push the last tag to the array
    if (tagString.length > 0) {
      tagsArray.push(tagString);
    }

    console.log(tagsArray);
    const newTask = {
      _id: todo._id,
      title: taskForm.title,
      description: taskForm.Description,
      assignee: taskForm.Assignee,
      status: taskForm.status,
      estimate: taskForm.estimate,
      tags: tagsArray,
    };

    await save(newTask);
    setEditDialogue(false);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          padding: "30px",
          background: "rgb(232,232,232)",
          width: "400px", // Width of each todo card
          height: "900px",
          marginBottom: "20px", // Space between rows
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>{todo.title}</h1>
        <hr
          style={{
            color: "black",
            background: "red",
            width: "100%",
            marginBottom: "40px",
          }}
        />
        {/* Assigne */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <label>Assignee: </label>
          <label>{todo.assignee}</label>
        </div>
        {/* // Assigne */}

        {/* Status options */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <label>Status: </label>
          <label>{todo.status}</label>
        </div>
        {/* Delete dialogue */}
        <div
          style={{
            backgroundColor: "white",
            border: "thick double #32a1ce",
            width: "80%",
            position: "absolute", // Absolute position
            top: "50%", // Positioned 50% from the top
            left: "50%", // Positioned 50% from the left
            transform: "translate(-50%, -50%)", // Center it horizontally and vertically
            height: "100px",
            zIndex: "9999", // Higher z-index to ensure it's on top
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
            display: deleteDialogue ? " " : "none",
          }}
        >
          <p
            style={{
              color: "black",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this task?
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                margin: "0 10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={handleYesDeleteButton}
            >
              Yes
            </button>
            <button
              style={{
                padding: "10px 20px",
                margin: "0 10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => setDeleteDialogue(false)}
            >
              No
            </button>
          </div>
        </div>
        {/* // Delete dialogue */}

        {/* Edit dialogue */}

        <div
          style={{
            backgroundColor: "white",
            border: "thick double #32a1ce",
            width: "70%",
            position: "absolute", // Absolute position
            top: "30%", // Positioned 50% from the top
            left: "30%", // Positioned 50% from the left
            transform: "translate(-50%, -50%)", // Center it horizontally and vertically
            height: "100px",
            zIndex: "9999", // Higher z-index to ensure it's on top
            // display: "flex",
            justifyContent: "center",
            alignItems: "center",
            display: editDialogue ? " " : "none",
          }}
        >
          <form
            style={{
              className: "modal-overlay",
              padding: "20px",
              width: "100vw",
              height: "100vh",
              background: "none",
              position: "relative",
              justifyContent: "center", // Center the form horizontally
              alignItems: "center", // Center the form vertically
            }}
          >
            <div
              style={{
                className: "modal-content",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                padding: "30px",
                background: "	rgb(90,400,300)",
                minHeight: "700px",
                marginBottom: "40px",
                borderRadius: "30px",
              }}
            >
              <h1 style={{ marginBottom: "20px" }}>Edit task</h1>

              <hr
                style={{
                  color: "black",
                  background: "red",
                  width: "100%",
                  marginBottom: "40px",
                }}
              />

              {/* title */}
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <label>Title: </label>
                <input
                  value={taskForm.title}
                  onChange={(e) => {
                    setTaskForm({ ...taskForm, title: e.target.value });
                  }}
                />
              </div>
              {/* //title */}

              {/* Assigne */}
              <div style={{ display: "flex", marginBottom: "20px" }}>
          <label>Assignee: </label>
          <select
            value={taskForm.Assignee}
            onChange={(e) => {
              // console.log()
              setTaskForm({ ...taskForm, Assignee: e.target.value });
            }}
          >
            <option value="" disabled hidden>
              Select Assignee
            </option>
            <option value="Goda">Goda</option>
            <option value="Nira">Nira</option>
            <option value="Sousannah">Sousannah</option>
            <option value="Hania">Hania</option>
            <option value="Basel">Basel</option>
            <option value="Mohand">Mohand</option>
          </select>
       </div>
              {/* // Assigne */}

              {/* Status options */}
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <label>Status: </label>
                <select
                  value={taskForm.status}
                  onChange={(e) => {
                    // console.log()
                    setTaskForm({ ...taskForm, status: e.target.value });
                  }}
                >
                  <option value="" disabled hidden>
                    Select Status
                  </option>
                  <option value="To Do">To Do</option>
                  <option value="In progress">In progress</option>
                  <option value="Blocked">Blocked</option>
                  <option value="Done">Done</option>
                </select>
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <label>Estimate</label>
                <input
                  value={taskForm.estimate}
                  onChange={(e) => {
                    setTaskForm({ ...taskForm, estimate: e.target.value });
                  }}
                />
              </div>

              <div style={{ display: "flex", marginBottom: "20px" }}>
                <label>Tags</label>
                <input
                  value={taskForm.tag}
                  onChange={(e) => {
                    console.log("tags in create task", e.target.value);

                    setTaskForm({ ...taskForm, tag: e.target.value });
                  }}
                />
              </div>
              {/* Description text area */}
              <label>Description</label>
              <textarea
                rows="4"
                cols="47"
                name="comment"
                form="usrform"
                value={taskForm.Description}
                style={{ width: "100%", height: "100px", padding: "8px" }}
                onChange={(e) => {
                  setTaskForm({ ...taskForm, Description: e.target.value });
                }}
              ></textarea>

              {/*///  Description text area */}

              {/* Sumbit Button */}
              <button
                id="submit-loan-button"
                type="button"
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "10px",
                }}
                onClick={() => handleSaveEditButton()}
              >
                Save
              </button>
              {/* //Sumbit Button */}

              {/* Cancel button */}
              <button
                type="button"
                style={{
                  marginTop: "20px",
                  width: "100%",
                  padding: "10px",
                  Border: "none",
                }}
                onClick={() => setEditDialogue(false)}
              >
                Cancel
              </button>

              {/* //Cancel button */}

              {/* عرض رسالة الخطأ إن وجدت */}
              {/* {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )} */}
            </div>
          </form>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          ></div>
        </div>

        {/* Estimate */}
        <div style={{ display: "flex", marginBottom: "20px" }}>
          <label>Estimate: </label>
          <label>{todo.estimate} h</label>
        </div>
        {/* // Status options */}

        {/* Tags */}

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <label>Tags: </label>
          <label>{todo.tags.map((tag) => ` '${tag}' `)}</label>
          {/* <input
            value={taskForm.tag}
            onChange={(e) => {
              setTaskForm({ ...taskForm, tag: e.target.value });
            }}
          /> */}
        </div>

        {/* //Tags */}

        {/* Description text area */}
        <label>Description:</label>
        <div
          style={{
            width: "300px" /* Set width */,
            height: "150px" /* Set height */,
            padding: "10px" /* Add padding */,
            border: "1px solid #ccc " /* Border to mimic textarea */,
            borderRadius: "4px" /* Rounded corners */,
            backgroundColor: "#f8f8f8" /* Background color */,
            overflowY: "scroll" /* Vertical scrollbar */,
            whiteSpace: "pre-wrap " /* Keep line breaks and spaces */,
          }}
        >
          {" "}
          {todo.description}
        </div>
        {/* <textarea style={{ width: "300px", height: "100px" }}>
          {todo.description}
        </textarea> */}

        {/*///  Description text area */}

        <button
          type="button"
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            Border: "none",
          }}
          onClick={handleEditClick}
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          type="button"
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "10px",
            Border: "none",
          }}
          onClick={handleDeleteClick}
        >
          Delete
        </button>
        {/* // Delete Button */}
      </div>
    </>
  );
}
