import React, { useState } from 'react';;
import CreateForm from './Partials/CreateForm';

const Create = ({roleenum}) => {
  
  return (
    <>
      <CreateForm roleenum={roleenum}  />
    </>
  );
};

export default Create;
