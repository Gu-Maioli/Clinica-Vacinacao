import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

export default function pacientesPDF(pacientes){
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    const reportTitle = [{
        text: 'Vendas por Pacientes',
        fontSize: 15,
        bold: true,
        margin: [15, 20, 0, 45]
    }];

    const dados = pacientes.map((paciente) => {
        return [
            {text: paciente.pacienteNome, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: paciente.nomeVacina, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: paciente.precoUniVenda, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: paciente.qtdeVenda, fontSize: 9, margin: [0, 2, 0, 2]},
            {text: paciente.total, fontSize: 9, margin: [0, 2, 0, 2]}
        ]
    })

    const details = [{
        table:{
            headerRows: 1,
            widths: ['*', '*', 'auto', 'auto', 'auto'],
            body: [
                [
                    {text: 'Nome', style: 'tableHeader', fontSize: 9},
                    {text: 'Vacina', style: 'tableHeader', fontSize: 9},
                    {text: 'Preço', style: 'tableHeader', fontSize: 9},
                    {text: 'Quantidade', style: 'tableHeader', fontSize: 9},
                    {text: 'Total', style: 'tableHeader', fontSize: 9}
                ],
                ...dados
            ]
        },
        layout: 'headerLineOnly'
    }];

    function Rodape(currentPage, pageCount){
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const docDefinitions = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],
        
        header: [reportTitle],
        content: [details],
        footer: Rodape
    }

    pdfMake.createPdf(docDefinitions).download();
}