    import { Eye, EyeOff } from "lucide-react"
import { useState } from "react";
    


    export function InputField({
    name,
    type = "text",
    label,
    description,
    form ,
    focused,
    setFocused,
    handleChange,
    handleBlur,
    error,
    touched,
    }) {
        const [showPassword, setShowPassword] = useState(false);
        
        console.log(touched);
        console.log(error);
        console.log(handleBlur);
        
 
    const isActive = focused === name;
    const hasValue = form[name];
    const isPassword = type === "password";

    return (
        <div className="w-full space-y-1">
        
        <div className="relative">
            <label
            className={`absolute left-3 transition-all duration-200 pointer-events-none
            ${
                isActive || hasValue
                ? "top-[1px] text-xs text-cyan-600"
                : "top-3 text-gray-400"
            }`}
            >
            {(isActive || hasValue)
            ? label.replace("*", "")
            : label}
            </label>

          <input
            name={name}
            type={isPassword && showPassword ? "text" : type}
            value={form?.[name] || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={() => setFocused(name)}
            className={`w-full rounded-md px-3 pt-3 pb-2 pr-10 outline-none transition
                ${
                touched && error
                    ? "border border-red-500 bg-red-50"
                    : "border border-gray-200 bg-gray-100 focus:border-cyan-600 focus:bg-white"
                }
            `}
                />
          
 
            {/* Ícone de olho */}
            {isPassword && (
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            )}
        </div>
        
            <div >   
                    {/* Exibir erro de não preenchimento do formulário */}
                {touched && error && (
                        <p className="text-red-500 text-xs mt-1">
                            {error}
                        </p>
                    )}
                        
                    {/* Descrição */}
                    {description && (
                        <ul>
                        <li className="text-[10px] text-end text-[#0B2B25]">
                            {description}
                            </li>
                        </ul>
                    )}
            </div>
        </div> 
    );
}


const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const matriculaRegex = /^[A-Za-z0-9]{4,10}$/;
const passwordRegex = /^.{6,}$/;

export function validateField(name, value, form) {
  switch (name) {
    case "name":
      if (!value.trim()) return "Nome é obrigatório";
      if (!nameRegex.test(value)) return "Nome inválido";
      return "";

    case "email":
      if (!value.trim()) return "E-mail é obrigatório";
      if (!emailRegex.test(value)) return "E-mail inválido";
      return "";

    case "matricula":
      if (!value.trim()) return "Matrícula é obrigatória";
      if (!matriculaRegex.test(value)) return "Matrícula inválida";
      return "";

    case "password":
      if (!value.trim()) return "Senha é obrigatória";
      if (!passwordRegex.test(value)) return "Mínimo 6 caracteres";
      return "";

    case "confirmPassword":
      if (!value.trim()) return "Confirmação obrigatória";
      if (value !== form.password) return "Senhas não coincidem";
      return "";

    default:
      return "";
  }
}
