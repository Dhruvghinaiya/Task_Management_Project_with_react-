import React, { use, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import UserForm from "./Partials/UserForm";

const Edit = ({ user, clients, errors }) => {

    return (
        <UserForm user={user} clients={clients}  errors={errors}/>
    );
};

export default Edit;
