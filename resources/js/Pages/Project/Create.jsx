import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import ProjectForm from './Partials/ProjectForm';

const Create = ({ clients, employees }) => {
 
  return (
    <ProjectForm clients={clients} employees={employees} />
  );
};

export default Create;
