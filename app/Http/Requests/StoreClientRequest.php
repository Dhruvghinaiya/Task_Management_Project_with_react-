<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreClientRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8', 
            'role' => 'required',
            'company_name'=>'required',
            'contact_number'=>'required|numeric|digits:10',

        ];
    }

    
    public function getInsertTableFiel1(){
        return [
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'password' => bcrypt($this->input('password')), 
            'role' => $this->input('role'),
            'created_by' => Auth::user()->id,
            'updated_by' => null,
        ];
    }

    public function getInsertTableField2(){
        
        $lastUser = User::latest()->first();
        $id = $lastUser->id;
        return [
            'id'=>Str::uuid(),
            'user_id'=>$id,
            'company_name'=>$this->input('company_name'),
            'contact_number'=>$this->input('contact_number'),
        ];
    }
}
