import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputField } from "../../components/InputField";

export function CreateUserPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    matricula: "",
    password: "",
    confirmPassword: "",
  });

  const [focused, setFocused] = useState(null);

  // REGEX
  const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const matriculaRegex = /^[A-Za-z0-9]{4,10}$/;
  const passwordRegex = /^.{6,}$/;

  function handleChange(e) {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "name") {
      newValue = value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    }

    if (name === "matricula") {
      newValue = value.replace(/[^A-Za-z0-9]/g, "");
    }

    setForm({ ...form, [name]: newValue });
  }

  function isValid() {
    return (
      nameRegex.test(form.name) &&
      emailRegex.test(form.email) &&
      matriculaRegex.test(form.matricula) &&
      passwordRegex.test(form.password) &&
      form.password === form.confirmPassword
    );
  }
function handleSubmit(e) {
  e.preventDefault();
  if (!isValid()) return;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const newUser = {
    id: crypto.randomUUID(),
    ...form,
  };

  const updatedUsers = [...users, newUser];

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  navigate("/users");
}

  return (
    <div className="w-full">
      
      {/* HEADER */}
      <div className="mb-6 -mt-8">
        <div className="text-sm text-gray-500 mb-2">
          <span
            className="cursor-pointer hover:text-cyan-600"
            onClick={() => navigate("/users")}
          >
            Usuários
          </span>
          <span className="mx-2">{">"}</span>
          
          <span className="text-gray-700 font-medium">
            Cadastro de Usuário
          </span>
        </div>

        <h1 className="text-[38px] font-semibold text-[#0D1931]">
          <div onClick={() => navigate("/users")} className="w-4 h-4 inline-block mr-2 cursor-pointer">
            <img src="/arrow-left.svg"  />
          </div>
      
          Cadastro de Usuário
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white w-full rounded-lg shadow border border-gray-200 p-6">
        
        <form onSubmit={handleSubmit} className="space-y-4">

        {/* DADOS DO USUÁRIO */}
          
        <div className="-space-y-2">
          <h2 className="text-[13px] font-semibold text-gray-700">
            Dados do Usuário
          </h2>
          <div className="border-t w-25 ml-[120px] border-gray-500"></div>
        </div>

           
          <div className="grid grid-cols-2 gap-6">
            <InputField
              name="name"
              label="Nome completo*"
              description="Máx. 30 caracteres"
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
            />

            <InputField
              name="matricula"
              label="Nº da matrícula"
              description="Mín. 4 caracteres | Máx. 10 caracteres"
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
            />
          </div>

  
          <InputField
            name="email"
            label="E-mail*"
            description="Máx. 30 caracteres"
            form={form}
            focused={focused}
            setFocused={setFocused}
            handleChange={handleChange}
          />

          {/* DADOS DE ACESSO */}

        <div className="-space-y-2">
          <h2 className="text-[13px] font-semibold text-gray-700">
            Dados de acesso
          </h2>
          <div className="border-t w-25 ml-[120px] border-gray-500"></div>
        </div>

   
          <div className="grid grid-cols-2 gap-4">
           <InputField
              name="password"
              type="password"
              label="Senha"
              description=""
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
            />

            <InputField
              name="confirmPassword"
              type="password"
              label="Repetir Senha"
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/users")}
              className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!isValid()}
              className={`px-5 py-2 rounded-lg transition font-medium
                ${
                  isValid()
                    ? "bg-cyan-600 text-white hover:bg-cyan-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }
              `}
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



