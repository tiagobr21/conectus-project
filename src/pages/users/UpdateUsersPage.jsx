import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { InputField, validateField } from "../../components/InputField";

export function UpdateUserPage() {
  const navigate = useNavigate();
    const { id } = useParams();
    
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

  const [form, setForm] = useState({
    name: "",
    email: "",
    matricula: "",
    password: "",
    confirmPassword: "",
  });

  const [focused, setFocused] = useState(null);

  // REGEX (igual create)
  const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const matriculaRegex = /^[A-Za-z0-9]{4,10}$/;
  const passwordRegex = /^.{6,}$/;

  // BUSCAR USUÁRIO AO CARREGAR
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find((u) => u.id === id);

    if (user) {
      setForm({
        ...user,
        confirmPassword: user.password,
      });
    }
  }, [id]);

    function handleChange(e) {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (touched[name]) {
        setErrors({
        ...errors,
        [name]: validateField(name, value, form),
        });
    }
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


function handleBlur(e) {
  const { name, value } = e.target;

  setTouched((prev) => ({
    ...prev,
    [name]: true,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]: validateField(name, value, form),
  }));
}
    
 
  function handleSubmit(e) {
    e.preventDefault();
    if (!isValid()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUsers = users.map((u) =>
      u.id === id
        ? { ...u, ...form } 
        : u
    );

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
            Editar Usuário
          </span>
        </div>

        <h1 className="text-[38px] font-semibold text-[#0D1931]">
          <div onClick={() => navigate("/users")} className="w-4 h-4 inline-block mr-2 cursor-pointer">
            <img src="/arrow-left.svg"  />
          </div>
        
          Editar Usuário
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
              value={form.name}
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
              error={errors.name}
              touched={touched.name}
              handleBlur={handleBlur}           
            />

            <InputField
              name="matricula"
              label="Nº da matrícula"
              description="Mín. 4 caracteres | Máx. 10 caracteres"
              value={form.matricula}
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
              error={errors.matricula}
              touched={touched.matricula}
              handleBlur={handleBlur}  
            />
          </div>

  
          <InputField
            name="email"
            label="E-mail*"
            description="Máx. 30 caracteres"
            value={form.email}
            form={form}
            focused={focused}
            setFocused={setFocused}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
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
              value={form.password}
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
            />

            <InputField
              name="confirmPassword"
              type="password"
              label="Repetir Senha"
              value={form.password}
              form={form}
              focused={focused}
              setFocused={setFocused}
              handleChange={handleChange}
              handleBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
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
              Atualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}