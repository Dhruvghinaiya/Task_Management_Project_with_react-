<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
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
           'name'=>'required',
            'email'=>'required|email',Rule::unique('users'),
            'company_name'=>'required',
            'contact_number'=>'required',
        ];
    }

    
    public function getInsertTableFiel1(){
        return [
            'name' => $this->input('name'),
            'email' => $this->input('email'),Rule::unique('users')->ignore(route('admin.client.index')),
            'created_by' => $this->input('created_by'),
            'updated_by' => Auth::id(),
        ];
    }
    
    public function getInsertTableField2(){        
        return [
            'company_name'=>$this->input('company_name'),
            'user_id'=>$this->input('user_id'),
            'contact_number'=>$this->input('contact_number'),
        ];
    }
    // public function editname(){
    //     return [
    //         'name'=>$this->input('name')
    //     ];
    // }
}
