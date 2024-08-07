function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
    });

    const container = document.querySelector('.container');

    html2canvas(container).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 255; // Ancho del contenido en el PDF
        const pageHeight = 396; // Altura de la página tamaño carta en puntos
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const heightLeft = imgHeight;
        
        const marginLeft = (doc.internal.pageSize.width - imgWidth) / 2;
        let position = 0;

        doc.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
        doc.save('Formulario_de_Compra.pdf');
    });
}

window.onload = function() {
    const form = document.getElementById('purchaseForm');
    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];
    form.elements['fechaDocumento'].value = formattedDate;
};