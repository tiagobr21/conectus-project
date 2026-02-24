import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { generateUsers } from "../../utils/generateUsers";

export function UsersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]); // vazio inicialmente
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
     
  console.log("location.state:", location.state);
     
  // Carregar usuários do localStorage quando o componente montar
  
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
        if (storedUsers) {
          setUsers(JSON.parse(storedUsers));
        }
   }, []);
  
  useEffect(() => {
    const fakeUsers = generateUsers(15);
    setUsers(fakeUsers);
  }, []);
        

  const usersPerPage = 5;

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );
 

  function confirmDelete() {
  if (!userToDelete) return;

  const updatedUsers = users.filter(
    (user) => user.id !== userToDelete.id
  );

  setUsers(updatedUsers);
  localStorage.setItem("users", JSON.stringify(updatedUsers));

  setUserToDelete(null);
}
  

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div>
      {/* HEADER DA PÁGINA */}
      <div className="flex justify-between items-center mb-6">
        {/* BUSCA */}
          <div className="mb-4 relative">
        <img
          src="search.svg"
          alt="Search"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
        />

        <input
          type="text"
          placeholder="Pesquisa"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 pl-10 pr-4 py-2 rounded-lg shadow border border-gray-200 focus:outline-none"
        />
      </div>

        <button
          onClick={() => navigate("/users/create")}
          className="bg-cyan-600  text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-cyan-700 transition"
        >
          <img src="add_user.svg" alt="Add User" className="w-5 h-5" /> Cadastrar Usuário
        </button>
      </div>

       {/* CARD PRINCIPAL */}
      <div className="min-h-[500px] flex flex-col">

        {/* CONTEÚDO */}
        <div className="flex-1">

                {filteredUsers.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-6 min-h-[400px] justify-center items-center  flex flex-col">
              <div className="flex h-full flex-col text-center">
                <p className="text-lg font-semibold text-[#0D1931]">
                  Nenhum Usuário Registrado
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Clique em “Cadastrar Usuário” para começar a cadastrar.
                </p>
                    </div>
            </div>        
          ) : (
            <div className="w-full">

              {/* HEADER DA TABELA */}
              <div className="bg-[#0D1931] text-white rounded-md px-6 h-[48px] flex items-center justify-between text-[16px] font-medium">
                <span>Nome</span>
                <span>Ações</span>
              </div>

              {/* LISTA DE USUÁRIOS */}
              <div className="mt-3 space-y-3">
                {filteredUsers
                  .slice((page - 1) * usersPerPage, page * usersPerPage)
                  .map((user, index) => (
                    <div
                      key={index}
                      className="bg-[#fff] border border-gray-200 shadow rounded-md px-8 h-[50px] flex items-center justify-between text-[16px] text-[#0B2B25]"
                    >
                      <span>{user.name}</span>

                      <div className="flex items-center gap-4">
                        <img src="/eye.svg" className="w-5 h-5 cursor-pointer hover:opacity-70 transition" onClick={() => setSelectedUser(user)}/>
                        <button onClick={() => navigate(`/users/edit/${user.id}`)}> <img src="/edit.svg" className="w-5 h-5 cursor-pointer hover:opacity-70 transition" /> </button>
                        <button onClick={() => setUserToDelete(user)}> <img src="/delete.svg" className="w-5 h-5 cursor-pointer hover:opacity-70 transition" /> </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* MODAL DE VISUALIZAÇÃO DAS INFORMAÇÕES DO USUÁRIO */}

                {selectedUser && (
                <>

                <div
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                  onClick={() => setSelectedUser(null)}
                />

                    <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl z-50 p-6 overflow-y-auto animate-slide-in">

               
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-[#0D1931]">
                          Visualizar Usuário
                        </h2>

                        <button
                          onClick={() => setSelectedUser(null)}
                          className="text-gray-500 hover:text-gray-800 text-xl"
                        >
                          ✕
                        </button>
                      </div>

                      
                        <div className="space-y-6 text-[15px] text-[#0B2B25]">
                              <div className="-space-y-2">
                                <h2 className="text-[13px] font-semibold text-gray-700">
                                  Dados do Usuário
                                </h2>
                                <div className="border-t w-25 ml-[120px] border-gray-500"></div>
                          </div>
                        
                            <div className="grid grid-cols-2 gap-4 text-[14px] text-[#0B2B25] font-bold">
                        
                              <div>
                                  <p className="text-gray-500 text-sm">Nome</p>
                                  <p >{selectedUser.name}</p>
                              </div>
                            
                              
                            {selectedUser.matricula && (
                              <div>
                                <p className="text-gray-500 text-sm">Matrícula</p>
                                <p >{selectedUser.matricula}</p>
                              </div>
                            )}

                              <div>
                                <p className="text-gray-500 text-sm">E-mail</p>
                                <p >{selectedUser.email}</p>
                              </div>
                          </div>  


                         
                        <div className="-space-y-2">
                          <h2 className="text-[13px] font-semibold text-gray-700">
                            Detalhes
                          </h2>
                          <div className="border-t w-25 ml-[65px] border-gray-500"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-[14px] text-[#0B2B25] font-bold">

                          <div>
                             <p className="text-gray-500 text-sm">Data de criação</p>
                             <p>{selectedUser.createdAt || "Não informado"}</p>
                          </div>
                        

                            <div>
                             <p className="text-gray-500 text-sm">última Edição</p>
                             <p>{selectedUser.updatedAt || "Nenhum"}</p>
                          </div>
                         </div>

                      </div>
                    </div>
                  </>
                )}

                {/* MODAL PARA DELETAR USUÁRIO */}

                {userToDelete && (
                  <>
                
                    <div
                      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-center justify-center"
                      onClick={() => setUserToDelete(null)}
                    >
           
                      <div
                        className="bg-white w-[420px] rounded-xl shadow-2xl p-8 text-center z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h2 className="text-2xl font-semibold text-[#0D1931] mb-4">
                          Deseja excluir?
                        </h2>

                        <p className="text-gray-600 mb-8">
                          O usuário será excluído.
                        </p>

                        <div className="flex justify-center gap-6">
                          <button
                            onClick={() => setUserToDelete(null)}
                            className="px-8 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
                          >
                            Não
                          </button>

                          <button
                            onClick={confirmDelete}
                            className="px-8 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
                          >
                            Sim
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                

            </div>
          )}
          

        </div>

        {/* PAGINAÇÃO FIXA EMBAIXO */}
        <div className="mt-6 pt-4 flex justify-between items-center text-sm text-gray-500">
          <span>Total de itens {filteredUsers.length}</span>

          <div className="flex items-center gap-3">
            <span>Itens por página 15</span>

            <button onClick={() => setPage(1)}>{"<<"}</button>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
              {"<"}
            </button>

            <span className="bg-cyan-600 text-white px-3 py-1 rounded">
              {page}
            </span>

            <button
              onClick={() =>
                setPage((p) => Math.min(p + 1, totalPages || 1))
              }
            >
              {">"}
            </button>

            <button onClick={() => setPage(totalPages || 1)}>
              {">>"}
            </button>

            <span>de {totalPages || 1}</span>
          </div>
        </div>

      </div>

      </div>
   
  );
  

  

}


