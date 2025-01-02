<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Enum;

class RegisterUserRequest extends FormRequest
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
            // 'role' => 'required',new Enum(RoleEnum::class),
            'role' => 'required',
        ];

    }
    public function getinsertTableField():array
    {
        return [
            'name' => $this->input('name'),
            'email' => $this->input('email'),
            'password' => bcrypt($this->input('password')), 
            'role' => $this->input('role'),
            'created_by' => Auth::user()->id,
            'updated_by' => null,
        ];
    }
}
