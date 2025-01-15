import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import ReactSelect from "@/Components/ReactSelect";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import PrimaryButtonLink from "@/Components/PrimaryButtonLink";
import UserForm from "../ClientDetail/Partials/UserForm";

const Edit = ({ user, errors, roleenum }) => {
    

    return (
        <UserForm  user={user} errors={errors} roleenum={roleenum} role={"client"}/>
    );
};

export default Edit;
