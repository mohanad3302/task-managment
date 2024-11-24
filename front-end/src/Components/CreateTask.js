import { useState, useContext, useRef, useEffect } from "react";
import "../task.css";
import { TodosContext } from "../Contexts/TodosContext";

import { uid } from "uid";

export default function CreateTask({ open, onClose, submit }) {
  const modalRef = useRef();

  async function handleSumbit  () {
    // Transforming tags into an array whose elements separated by space
    let tagsArray = [];
    let tagString = "";
    for (let letter of taskForm.tag) {
      if (letter === " ") {
        tagsArray.push(tagString);
        tagString = "";
      } else {
        tagString += letter;
      }
    }
    // Transforming tags into an array whose elements separated by space

    const newTask = {
      title: taskForm.title,
      description: taskForm.Description,
      assignee: "66f6f2e82dc6a754aa3b330c",
      status: taskForm.status,
      estimate: taskForm.estimate,
      tags: tagsArray,
    };

    await submit(newTask);
  };

  const [taskForm, setTaskForm] = useState({
    title: "",
    Assignee: "",
    status: "",
    estimate: "",
    tag: "",
    Description: "",
  });

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close the modal if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up
    };
  }, []);

  return (
    <form
      ref={modalRef}
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
        <h1 style={{ marginBottom: "20px" }}>Create a task</h1>

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
            <option value="">Select Status</option>
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
            backgroundColor: !(
              taskForm.title &&
              taskForm.Assignee &&
              taskForm.estimate &&
              taskForm.Description
            )
              ? "#ddd"
              : "#4CAF50",
            color: !(
              taskForm.title &&
              taskForm.Assignee &&
              taskForm.estimate &&
              taskForm.Description
            )
              ? "gray"
              : "white",
            cursor: !(
              taskForm.title &&
              taskForm.Assignee &&
              taskForm.estimate &&
              taskForm.Description
            )
              ? "not-allowed"
              : "pointer",
          }}
          disabled={
            !(
              taskForm.title &&
              taskForm.Assignee &&
              taskForm.estimate &&
              taskForm.Description
            )
          }
          onClick={() => handleSumbit()}
        >
          Submit
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
          onClick={onClose}
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
  );
}
