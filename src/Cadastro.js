import React from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

let contatos = []; 
let identificador = 0; 

export default class AgendaContatos extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            nome: '',
            email :'',
            telefone: '',
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = e => {
      e.preventDefault(); 
      contatos.push(this.state);
      console.log(contatos[identificador]); 
      identificador += 1;
      this.setState({
        id: identificador,
        nome: "",
        telefone: "",
        email: "",
      });

      document.getElementById('nome').value='';
      document.getElementById('email').value='';
      document.getElementById('telefone').value='';
    }

    handleDelete(id) {
        if(id === 0) contatos.shift(); // Remove no início
        else if(id === contatos.length-1) contatos.pop(); 
        else { // Remove no meio
            contatos.splice(id, 1);
            for(let i = id; i < contatos.length; i++) {
                contatos[i].id -= 1;
            } 
        }
        identificador--;
        this.setState({nome : "", email : "", telefone : ""});
    }

    handleUpdate(id) {
        contatos[id].nome = prompt("Novo nome");
        contatos[id].email = prompt("Novo email");
        contatos[id].telefone = prompt("Novo telefone");
        this.setState({nome : "", email : "", telefone : ""});
    }

    render() {
        return (
            <div id="cadastro">
                <aside>
                    <strong>Agenda de Contatos</strong>

                    <form onSubmit={this.handleSubmit}>
                        <div className="input-block">
                        <label htmlFor="nome">Nome</label>
                        <input 
                            name="nome"
                            id="nome"
                            placeholder="Nome completo" 
                            onChange={(e) => this.setState({ nome: e.target.value })}
                            required
                        />
                        </div>
                        <div className="input-block">
                        <label htmlFor="email">Email</label>
                        <input 
                            name="email"
                            id="email"
                            placeholder="Digite um e-mail válido"
                            onChange={(e) => this.setState({ email: e.target.value })}
                            required
                        />
                        </div>
                        <div className="input-block">
                        <label htmlFor="telefone">Telefone</label>
                        <input 
                            name="telefone" 
                            id="telefone" 
                            placeholder="Digite um telefone válido" 
                            onChange={(e) => this.setState({ telefone: e.target.value })}
                            required
                        />
                        </div>
                        <button type="submit">Adicionar</button>
                    </form>
                </aside>
                
                <main>
                    <div>
                        <ol>
                            {contatos.map((contato, identificador) => (
                                <li>
                                    <p>
                                        <strong>ID: </strong>{identificador}<br/> 
                                        <strong>Nome: </strong>{contato.nome}<br/>
                                        <strong>Email: </strong>{contato.email}<br/>
                                        <strong>Telefone: </strong>{contato.telefone}<br/>
                                    
                                        <div>
                                            <button onClick={() => this.handleDelete(identificador)}>Apagar</button> 
                                            <button onClick={() => this.handleUpdate(identificador)}>Editar</button>
                                        </div>
                                    </p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </main>
            </div>
        );
    }
}
