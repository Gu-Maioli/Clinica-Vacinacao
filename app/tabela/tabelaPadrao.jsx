import React, { useState } from "react";

const TableWithPagination = ({ columns, data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcula o índice inicial e final dos itens a serem exibidos na página atual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtém os dados da página atual
  const currentData = data.slice(startIndex, endIndex);

  // Função para lidar com a troca de página
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <table className="table table-striped table-hover">
        {/* Renderiza o cabeçalho da tabela */}
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.Header}>{column.Header}</th>
            ))}
          </tr>
        </thead>
        {/* Renderiza os dados da página atual */}
        <tbody>
          {currentData.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
              <tr>
                <td>teste</td>
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Renderiza os controles de paginação */}
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={endIndex >= data.length}
        >
          Próxima
        </button>
      </div>
    </div>
  );
};

export default TableWithPagination;
