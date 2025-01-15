import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import ReactSelect from "@/Components/ReactSelect";
import Header from "@/Components/Header";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import TextArea from "@/Components/TextArea";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import ProjectForm from "./Partials/ProjectForm";

const Edit = ({ clients, employees, project, projectEmployees }) => {


    return (
        <ProjectForm clients={clients} employees={employees} project={project} projectEmployees={projectEmployees}/>
        );
};

export default Edit;
