function updatePaymentFields() {
    const paymentMethod = document.getElementById('pago').value;
    const efectivoField = document.getElementById('efectivoField');
    const creditoField = document.getElementById('creditoField');

    if (paymentMethod === 'efectivo') {
        efectivoField.style.display = 'block';
        creditoField.style.display = 'none';
    } else if (paymentMethod === 'credito') {
        efectivoField.style.display = 'none';
        creditoField.style.display = 'block';
    } else {
        efectivoField.style.display = 'none';
        creditoField.style.display = 'none';
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
    });

    const container = document.querySelector('.container');
    const button = document.getElementById('download-btn');
    const timestamp = document.getElementById('timestamp');

    // Ocultar el botón
    button.style.display = 'none';

    // Mostrar el timestamp
    const now = new Date();
    const formattedTimestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    timestamp.textContent = `Generado el: ${formattedTimestamp}`;

    html2canvas(container).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = doc.internal.pageSize.getWidth() * 0.75; // 75% del ancho de la página
        const pageHeight = doc.internal.pageSize.getHeight(); // Altura de la página tamaño carta
        const imgHeight = canvas.height * imgWidth / canvas.width;

        const marginLeft = (doc.internal.pageSize.width - imgWidth) / 2; // Centrado
        let position = (pageHeight - imgHeight) / 2; // Centrado vertical

        doc.addImage(imgData, 'PNG', marginLeft, position, imgWidth, imgHeight);
        doc.save('Formulario_de_Compra.pdf');

        // Mostrar el botón nuevamente
        button.style.display = 'block';
    });
}

window.onload = function() {
    const now = new Date();
    const formattedTimestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
   
