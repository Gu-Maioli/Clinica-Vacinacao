import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

export default function fornecedorPDF(fornecedores) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const reportTitle = [
    {
      text: "Vendas por Fornecedor",
      fontSize: 15,
      bold: true,
      margin: [15, 20, 0, 45],
    },
  ];

  const dados = fornecedores.map((fornecedor) => {
    return [
      { text: fornecedor.id, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: fornecedor.nome, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: fornecedor.nomeFornecedor, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: fornecedor.descricao, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: "R$: " + fornecedor.precoUni + ",00",
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
      { text: fornecedor.quantidade, fontSize: 9, margin: [0, 2, 0, 2] },
      {
        text: "R$: " + fornecedor.total + ",00",
        fontSize: 9,
        margin: [0, 2, 0, 2],
      },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ["auto", "*", "*", "auto", "auto", "auto", "auto"],
        body: [
          [
            { text: "Id", style: "tableHeader", fontSize: 9 },
            { text: "Vacina", style: "tableHeader", fontSize: 9 },
            { text: "Fornecedor", style: "tableHeader", fontSize: 9 },
            { text: "Descrição", style: "tableHeader", fontSize: 9 },
            { text: "Preço", style: "tableHeader", fontSize: 9 },
            { text: "Quantidade", style: "tableHeader", fontSize: 9 },
            { text: "Total", style: "tableHeader", fontSize: 9 },
          ],
          ...dados,
        ],
      },
      layout: "headerLineOnly",
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + " / " + pageCount,
        alignment: "right",
        fontSize: 9,
        margin: [0, 10, 20, 0],
      },
    ];
  }

  const docDefinitions = {
    pageSize: "A4",
    pageMargins: [15, 50, 15, 40],

    header: [reportTitle],
    content: [details],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitions).download();
}
