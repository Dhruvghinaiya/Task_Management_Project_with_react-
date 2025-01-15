import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react'
import ReactSelect from '@/Components/ReactSelect';
import Header from '@/Components/Header';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import CreateForm from '../ClientDetail/Partials/CreateForm';

const Create = ({roleenum}) => {
  
  return (
    <>
      <CreateForm roleenum={roleenum} type={'user'} />
    </>
  );
};

export default Create;
