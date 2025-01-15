import React, { useState, useEffect } from "react";
import TaskForm from "./Partials/TaskForm";

const Create = ({ projects, role, statuses = "null" }) => {

    return (
        <TaskForm projects={projects} role={role} statuses={statuses}/>
      
    );
};

export default Create;
