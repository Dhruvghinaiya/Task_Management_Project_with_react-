<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
class StoreProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
            return [
                'name'=>'required|unique:projects,name',
                'description'=>'required',
                'client_id'=>'required|exists:users,id',
                'start_date'=>'required',
                'end_date'=>'required|after_or_equal:start_date',
                'employee_ids' => 'required|array',
                'employee_ids.*' => 'exists:users,id',
            ];
           
    }

    public function messages()
    {
        return [
            'employee_ids'=>'Select one or more employees'
        ];
    }

    public function getInsertTableField(){
        return [
            'name' => $this->input('name'),
            'description' => $this->input('description'),   
            'client_id' => $this->input('client_id'),
            'created_by' => Auth::user()->id,  
            'updated_by' => Auth::user()->id, 
            'start_date' => $this->input('start_date'),
            'end_date' => $this->input('end_date'),
        ];
    }

}
