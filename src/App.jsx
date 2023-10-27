import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

// components
import { TextInput, Button, Banner, Checkbox } from "flowbite-react";
import { BiSolidAddToQueue, BiTrash } from "react-icons/bi";
import { HiX } from 'react-icons/hi';
import { MdAnnouncement } from 'react-icons/md';

const App = () => {
  const [taskTitle, setTaskTitle] = useState("");

  const [Tasks, setTasks] = useState([
    { id: 1, title: "Clean the house", completed: false },
    { id: 2, title: "Buy Groceries!", completed: false },
  ]);

  const addTask = (newTitle) => {
    if (newTitle) {
      const newTask = {
        id: uuidv4(),
        title: newTitle,
        completed: false,
      };

      setTasks([...Tasks, newTask]);
      setTaskTitle("");
    }
  };

  const removeTask = (id) => {
    const updatedTasks = Tasks.filter((existingTask) => existingTask.id !== id);
    setTasks(updatedTasks);
  };

  const setCompleted = (id) => {
    const updatedTasks = [...Tasks];
    const taskToToggle = updatedTasks.find((task) => task.id === id);
    taskToToggle.completed = !taskToToggle.completed;
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(taskTitle);
    }
  };

  const renderTasks = (tasks) => {
    if (tasks.length !== 0) {
      return tasks.map((task, index) => (
        <div
          className="rounded-md shadow-md flex items-center py-6 hover:py-8 hover:shadow-lg duration-300"
          key={task.id}
        >
          <Checkbox
            className="ml-2 mr-4 w-6 h-6"
            checked={task.completed}
            onChange={() => setCompleted(task.id)}
          />
          <h2
            className={
              "text-center text-lg font-semibold" +
              (task.completed ? " line-through" : "")
            }
          >
            {task.title}
          </h2>
          <Button
            className="ml-auto mr-6 group"
            color="failure"
            outline
            onClick={() => removeTask(task.id)}
          >
            <BiTrash className="text-red-700 group-hover:text-white w-4 h-4 group" />
          </Button>
        </div>
      ));
    }
  };

  return (
    <>
      <div className="min-h-screen">
        {/* todo */}
        <div className="flex flex-col gap-2">
        <Banner>
          <div className="fixed top-0 left-0 z-50 flex justify-between w-full p-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center mx-auto">
              <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                <MdAnnouncement />
                <span>
                  Tasks will reset on page refresh
                </span>
              </p>
            </div>
            <Banner.CollapseButton
              color="gray"
              className="border-0 bg-transparent px-0"
            >
              <HiX className="h-4 w-4" />
            </Banner.CollapseButton>
          </div>
        </Banner>
          <header>
            <h1 className="text-center text-4xl font-bold py-4">My ToDo List</h1>
          </header>
          <div className="flex gap-2 border-b border-slate-900 p-4 mx-6 sm:mx-12 md:mx-18 lg:mx-24 justify-center">
            <TextInput
              size="sm"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="w-full"
              onKeyDown={handleKeyPress}
              placeholder="Your Task"
            />
            <Button
              size="sm"
              onClick={() => addTask(taskTitle)}
              className="w-8/12 md:w-4/12 lg:w-2/12"
            >
              <BiSolidAddToQueue className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </div>
          <div className="flex flex-col gap-4 justify-center mx-6 sm:mx-12 md:mx-18 lg:mx-24">
            {renderTasks(Tasks)}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
