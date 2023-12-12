import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function CadastroDeDesafio() {
  const [abrirPaginaDoDesafio, setAbrirPaginaDeDesafio] = useState(false);
  const [dadosFormulario, setDadosFormulario] = useState({
    nomeDoDesafio: '',
    periodos: '',
    professor: '',
    dataInicio: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    dataFim: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`,
    diaDaSemana: '',
    horario: '',
    sala: ''
  });
  const [listaDeDesafios, setListaDeDesafios] = useState([]);
  const [desafioSelecionado, setDesafioSelecionado] = useState(null);

  useEffect(() => {
    // Carregar os dados do localStorage quando o componente for montado
    const dadosLocalStorage = JSON.parse(localStorage.getItem('desafio')) || [];
    setListaDeDesafios(dadosLocalStorage);
  }, []);

  const handleClose = () => {
    setAbrirPaginaDeDesafio(false);
    setDesafioSelecionado(null);
  };
  const handleShow = () => setAbrirPaginaDeDesafio(true);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDadosFormulario({ ...dadosFormulario, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (desafioSelecionado === null) {
      // Adicionar novo desafio
      if (localStorage.getItem('desafio') != null) {
        let valorFinal = JSON.parse(localStorage.getItem('desafio'))
        valorFinal.push(dadosFormulario)
        localStorage.setItem('desafio', JSON.stringify(valorFinal))
      } else {
        localStorage.setItem('desafio', JSON.stringify([dadosFormulario]))
      }
    } else {
      // Atualizar desafio existente
      const desafiosAtualizados = listaDeDesafios.map((desafio, index) => (
        index === desafioSelecionado ? dadosFormulario : desafio
      ));
      localStorage.setItem('desafio', JSON.stringify(desafiosAtualizados));
    }

    // Atualizar a lista de desafios
    setListaDeDesafios(JSON.parse(localStorage.getItem('desafio')));


    let listaDeProfessor = JSON.parse(localStorage.getItem('professor'))
    listaDeProfessor
      .filter(professor => professor.nomeDoProfessor === dadosFormulario.professor)
      .forEach(professor => professor.desafioAssociado = dadosFormulario.nomeDoDesafio)
    localStorage.setItem("professor", JSON.stringify(listaDeProfessor))

    let listaDePeriodos = JSON.parse(localStorage.getItem('periodos'))
    listaDePeriodos
      .filter(periodos => periodos.numeroDoPeriodo === dadosFormulario.periodos)
      .forEach(periodos => periodos.desafioAssociado.push(dadosFormulario))
    localStorage.setItem("periodos", JSON.stringify(listaDePeriodos))
    

    setDadosFormulario({
      nomeDoDesafio:'',
      periodos:'',
      professor:'',
      dataInicio: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
      dataFim: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() + 1}`,
      diaDaSemana:'',
      horario:'',
      sala:''
    });

    setDesafioSelecionado(null);
  }

  const handleEditarDesafio = (index) => {
    setDesafioSelecionado(index);
    setAbrirPaginaDeDesafio(true);
    setDadosFormulario(listaDeDesafios[index]);
  }

  const handleExcluirDesafio = (index) => {
    const desafiosAtualizados = listaDeDesafios.filter((desafio, i) => i !== index);
    localStorage.setItem('desafio', JSON.stringify(desafiosAtualizados));
    setListaDeDesafios(desafiosAtualizados);
  }
  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Cadastro de Desafio
      </Button>

      <Modal show={abrirPaginaDoDesafio} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de Desafio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} className="cadastroDeDesafio"> 
          <Form.Group controlId="nomeDoDesafio">
              <Form.Label>Nome do Desafio</Form.Label>
              <Form.Control onChange={handleInputChange} name="nomeDoDesafio" value={dadosFormulario.nomeDoDesafio} type="text"/>
            </Form.Group>
            <Form.Group controlId="periodos">
              <Form.Label>Periodos</Form.Label>
              <Form.Select onChange={handleInputChange} name="periodos">
                <option>Selecione um dos Períodos disponíveis</option>
                {
                  localStorage.getItem("periodos") != null &&
                    JSON.parse(localStorage.getItem("periodos"))
                      .map((periodos) => (
                        <option value={periodos.numeroDoPeriodo}>{periodos.numeroDoPeriodo}</option>
                      ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId= "professor">
              <Form.Label>Professor</Form.Label>
              <Form.Select onChange={handleInputChange} name="professor">
                <option>Selecione um dos Professores disponíveis</option>
                {
                  localStorage.getItem("professor") != null &&
                    JSON.parse(localStorage.getItem("professor"))
                      .filter((professor) => professor.desafioAssociado === null)
                      .map((professor) => {
                        console.log(professor)
                        return (
                          <option value={professor.nomeDoProfessor}>{professor.nomeDoProfessor}</option>
                        )
                    })
                }
              </Form.Select>
            </Form.Group>
            <Form.Group controlId= "dataInicio">
              <Form.Label>Data Início</Form.Label>
              <Form.Control onChange={handleInputChange} name="dataInicio" value={dadosFormulario.dataInicio} type="date"/>
            </Form.Group>
            <Form.Group controlId= "dataFim">
              <Form.Label>Data Fim</Form.Label>
              <Form.Control onChange={handleInputChange} name="dataFim" value={dadosFormulario.dataFim} type="date"/>
              </Form.Group>
            <Form.Group controlId="diaDaSemana">
              <Form.Label>Dia da semana</Form.Label>
              <Form.Select onChange={handleInputChange} name="diaDaSemana">
                <option>Selecione um dia da semana</option>
                <option value="segunda">Segunda-feira</option>
                <option value="terca">Terça-feira</option>
                <option value="quarta">Quarta-feira</option>
                <option value="quinta">Quinta-feira</option>
                <option value="sexta">Sexta-feira</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId= "horario">
              <Form.Label>Horário</Form.Label>
              <Form.Control onChange={handleInputChange} name="horario" value={dadosFormulario.horario} type="text"/>       
            </Form.Group>  
            <Form.Group controlId= "sala">
              <Form.Label>Salas</Form.Label>
              <Form.Select onChange={handleInputChange} name="sala">
                <option>Selecione uma sala</option>
                {
                  localStorage.getItem("salas") != null &&
                    JSON.parse(localStorage.getItem("salas")).map(
                      salas => (
                        <option value={salas.andar}>Andar:{salas.andar} Número:{salas.numero}</option>
                      )
                    )
                }
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">enviar</Button>
          </Form>
          {/* Exibir dinamicamente os desafios salvos */}

        </Modal.Body>
      </Modal>

      
      <div>
        <h1>Desafios Salvos</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome do Desafio</th>
              <th>Períodos</th>
              <th>Professor</th>
              <th>Data Início</th>
              <th>Data Fim</th>
              <th>Horário</th>
              <th>Ações</th>
              <th></th>
              {/* Adicione outras colunas conforme necessário */}
            </tr>
          </thead>
          <tbody>
            {listaDeDesafios.map((desafio, index) => (
              <tr key={index}>
                <td>{desafio.nomeDoDesafio}</td>
                <td>{desafio.periodos}</td>
                <td>{desafio.professor}</td>
                <td>{desafio.dataInicio}</td>
                <td>{desafio.dataFim}</td>
                <td>{desafio.horario}</td>
                <td>
                  <Button variant="info" onClick={() => handleEditarDesafio(index)}>Editar</Button>
                  <Button variant="danger" onClick={() => handleExcluirDesafio(index)}>Excluir</Button>
                </td>
                {/* Adicione outras colunas conforme necessário */}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CadastroDeDesafio;