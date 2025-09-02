document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    const historialTableBody = document.querySelector('#historialTable tbody');
    const totalAsistenciaSpan = document.getElementById('totalAsistencia');
    const limpiarBtn = document.getElementById('limpiarBtn');
    const limpiarHistorialBtn = document.getElementById('limpiarHistorialBtn');
    
    // Array para obtener los IDs de los campos de asistencia
    const camposAsistencia = ['hermanos', 'hermanas', 'ninos', 'visitas', 'hermanosVisitantes'];

    // Función para calcular y mostrar el total de asistencia en tiempo real
    const calcularTotal = () => {
        let total = 0;
        camposAsistencia.forEach(id => {
            const valor = parseInt(document.getElementById(id).value) || 0;
            total += valor;
        });
        totalAsistenciaSpan.textContent = total;
    };

    // Vincular la función a cada campo de asistencia
    camposAsistencia.forEach(id => {
        document.getElementById(id).addEventListener('input', calcularTotal);
    });

    // -----------------------------------------------------------
    
    // Función para cargar registros del almacenamiento local
    const cargarRegistros = () => {
        // Obtenemos los datos del localStorage y si no existen, devolvemos un array vacío
        const registros = JSON.parse(localStorage.getItem('asistenciaRegistros')) || [];
        // Ordenamos los registros por fecha, del más reciente al más antiguo
        return registros.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    };

    // Función para guardar un nuevo registro
    const guardarRegistro = (registro) => {
        // Cargamos los registros existentes
        const registros = cargarRegistros();
        // Agregamos el nuevo registro al array
        registros.push(registro);
        // Guardamos el array completo de vuelta en el localStorage
        localStorage.setItem('asistenciaRegistros', JSON.stringify(registros));
        // Después de guardar, actualizamos el historial
        mostrarRegistros();
    };

    // Función para mostrar los registros en la tabla
    const mostrarRegistros = () => {
        // Limpiamos la tabla para evitar duplicar registros
        historialTableBody.innerHTML = '';
        const registros = cargarRegistros();

        registros.forEach(registro => {
            const row = document.createElement('tr');
            const totalAsistencia = parseInt(registro.hermanos) + parseInt(registro.hermanas) + parseInt(registro.ninos) + parseInt(registro.visitas) + parseInt(registro.hermanosVisitantes);

            row.innerHTML = `
                <td>${registro.fecha}</td>
                <td>${registro.tipoServicio}</td>
                <td>${registro.dirigente}</td>
                <td>${registro.predicador}</td>
                <td>${registro.hermanos}</td>
                <td>${registro.hermanas}</td>
                <td>${registro.ninos}</td>
                <td>${registro.visitas}</td>
                <td>${registro.hermanosVisitantes}</td>
                <td>${totalAsistencia}</td>
                <td>$${parseFloat(registro.ofrenda).toFixed(2)}</td>
            `;
            historialTableBody.appendChild(row);
        });
    };

    // Manejar el envío del formulario
    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const registro = {
            fecha: document.getElementById('fecha').value,
            dirigente: document.getElementById('dirigente').value,
            predicador: document.getElementById('predicador').value,
            tipoServicio: document.getElementById('tipoServicio').value,
            hermanos: document.getElementById('hermanos').value,
            hermanas: document.getElementById('hermanas').value,
            ninos: document.getElementById('ninos').value,
            visitas: document.getElementById('visitas').value,
            hermanosVisitantes: document.getElementById('hermanosVisitantes').value,
            ofrenda: document.getElementById('ofrenda').value
        };

        // Guardamos el registro y luego reseteamos el formulario
        guardarRegistro(registro);
        registroForm.reset();
        calcularTotal(); // Llamamos a la función para resetear el total a 0
    });

    // Manejar el clic en el botón de limpiar
    limpiarBtn.addEventListener('click', () => {
        registroForm.reset();
        calcularTotal(); // Reseteamos también el contador de asistencia total
    });

    // Manejar el clic en el botón de limpiar historial
    limpiarHistorialBtn.addEventListener('click', () => {
        // Pedimos confirmación al usuario porque es una acción destructiva
        const confirmacion = confirm('¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.');

        if (confirmacion) {
            // Borramos los datos del localStorage
            localStorage.removeItem('asistenciaRegistros');
            // Volvemos a renderizar la tabla (que ahora estará vacía)
            mostrarRegistros();
            alert('El historial ha sido borrado.');
        }
    });

    // Cargamos y mostramos los registros al iniciar la página
    mostrarRegistros();
});