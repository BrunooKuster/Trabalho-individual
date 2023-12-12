import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function CalendarioHorarios() {
  const [abrirPaginaDoCalendario, setAbrirPaginaDoCalendario] = useState(false);
  const [desafios, setDesafios] = useState([]);

  // Função para buscar os desafios do localStorage
  const buscarDesafios = () => {
    const desafiosSalvos = JSON.parse(localStorage.getItem('desafio')) || [];
    setDesafios(desafiosSalvos);
  };

  // Chamando a função para buscar desafios ao abrir o modal
  const handleClose = () => {
    setAbrirPaginaDoCalendario(false);
    buscarDesafios();
  };
  const handleShow = () => setAbrirPaginaDoCalendario(true);

  // UseEffect para buscar desafios ao montar o componente
  useEffect(() => {
    buscarDesafios();
  }, []);

  const renderCalendarioHorarios = () => {
    const diasDaSemana = ['Qua', 'Qui', 'Sex', 'Sáb', 'Dom', 'Seg', 'Ter'];
    const primeiroDia = new Date(2023, 10, 1); // Novembro é o mês 10 (0-indexed)
    const ultimoDia = new Date(2023, 10, 30);

    const diasDoMes = [];
    let diaAtual = new Date(primeiroDia);

    // Adiciona dias da semana no topo
    const headerRow = diasDaSemana.map((dia) => <th key={dia}>{dia}</th>);
    diasDoMes.push(<tr key="header">{headerRow}</tr>);

    // Preenche o calendário
    while (diaAtual <= ultimoDia) {
      const semana = [];
      for (let i = 0; i < 7; i++) {
        const dia = diaAtual.getDate();

        // Obter desafios associados ao dia atual
        const desafiosDoDia = desafios.filter((desafio) => {
          const dataFimDesafio = new Date(desafio.dataFim);
          return diaAtual >= new Date(desafio.dataInicio) && diaAtual <= dataFimDesafio;
        });

        // Estilo condicional para marcar o dia com desafio
        const estiloDia = desafiosDoDia.length > 0 ? { backgroundColor: 'yellow' } : {};

        // Renderizar o conteúdo do dia
        const conteudoDia = desafiosDoDia.map((desafio, index) => (
          <div key={index}>
            <p>Horário: {desafio.horario}</p>
            <p>Professor: {desafio.professor}</p>
            <p>Sala: {desafio.sala}</p>
          </div>
        ));

        semana.push(
          <td key={dia} style={estiloDia} onClick={() => console.log(`Clicou no dia ${dia}`)}>
            <div>
              <strong>{dia}</strong>
            </div>
            {conteudoDia}
          </td>
        );

        diaAtual.setDate(diaAtual.getDate() + 1);
      }
      diasDoMes.push(<tr key={`semana${diaAtual.getDate() - 7}`}>{semana}</tr>);
    }

    return (
      <Table responsive bordered>
        <tbody>{diasDoMes}</tbody>
      </Table>
    );

  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Calendário de Horários
      </Button>

      <Modal show={abrirPaginaDoCalendario} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Calendário de Horários</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Adicionando a lista de desafios ao modal */}
          {desafios.length > 0 ? (
            <ul>
              {desafios.map((desafio, index) => (
                <li key={index}>
                  {/* Aqui, exiba os detalhes dos desafios */}
                  {/* Exemplo: */}
                  <p>Nome do Desafio: {desafio.nomeDoDesafio}</p>
                  {/* ... Outros detalhes do desafio */}
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum desafio cadastrado.</p>
          )}

          {/* Renderizando o calendário */}
          {renderCalendarioHorarios()}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CalendarioHorarios;
