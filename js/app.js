
// 1 Recuerda que el DOMContentLoaded es para que se ejecute cuando todo el documento sea descargado
document.addEventListener('DOMContentLoaded', function () {

    /// 7 Creamos un objeto 7

    const email = {
        email: '',
        asunto: '',
        mensaje: '',
    }
    
    // 2 Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    // 10 - crear constante para el boton de enviar
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    
    // PARTE DEL RETO CREAR UN CC QUE SEA OPCIONAL, PERO EN ACOS DE QUE TENGA TEXTO VALIDAR LA INFORMACION
    const inputCc = document.querySelector('#cc');

    //Asignamos evento con su funcion

    inputCc.addEventListener('input', function (e) {
        
        if (e.target.value !== '' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = ''; // 9.2 - ESto es para que devuelva un string vacio en caso de que borremos algo, esto es para que cuando el codigo pase por comprobarEmail pueda desabilitar el boton
            comprobarEmail();
            return;
        }
        limpiarAlerta(e.target.parentElement);
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
}); 

    console.log(inputCc);








   

    //3 ASIGNAR EVENTOS

    //El blur es un evento que se ejecuta cuado estas en un campo y vas hacia otro AUNQUE AL FINAL PONEMOS INPUT ES MEJOR MAS RAPIDO
    inputEmail.addEventListener('input', validar); 
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    //Creamos el evento
    formulario.addEventListener('submit', enviarEmail); // 11 Vamos a escuchar mediante el evento SUBMIT Y CREAMOS UNA FUNCION, QUE VA A SER UN POCO GRANDE LA CREAMOS ABAJO

    //11 asignamos evento
    btnReset.addEventListener('click', function (e) {
        e.preventDefault();

        //Reiniciar el objeto
        resetFormulario();
        
        
        limpiarAlerta();
        
        
 


    });

    //11.1 - CREAMOS LA FUNCION DE enviarEmail();

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');


        //Para que el spinner se quite despues de 3 segundos usamos un setTimeot que ayda para que despues de 3000ms o 3g que es lo mismo haga una accion, en este caso hacemos lo contrario de arriba para que se oculte y haga la ilusion
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            
            //Reiniciar el objeto
            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';
            formulario.appendChild(alertaExito);
            
            
            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
    
            
        },3000);

    }


    // 4 - Funcion de validar para hacer el codigo mas reutilizable
    // 5 - if para saber si esta vacio o no el input
    function validar(e) {
        //TIP .trim es necesario en los formularios porque elimina los espacios en blanco para evitar errores
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement); 
            email[e.target.name] = '';
            comprobarEmail();
            return;
        } 
        
        if (e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = ''; // 9.2 - ESto es para que devuelva un string vacio en caso de que borremos algo, esto es para que cuando el codigo pase por comprobarEmail pueda desabilitar el boton
            comprobarEmail();

            return;
        }

        limpiarAlerta(e.target.parentElement);


        // - 8 asignar los valores a un objeto se llenan con corchetes como si fuese un string, se pone e.target.name porque tiene el mismo nombre que la key que le asignamos al objeto, entonces de esta manera a esa key le agregamos el valor de e.target.velue.trim.toLowerCase para eliminar espacios y poner todo en minusculas

        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //- 9 Comprobar el objeto de email-- Se va a crear la funcion abajo
        comprobarEmail();
    }



    //6 funcion para mostrar alerta
    function mostrarAlerta(mensaje, referencia) {
        //Comprueba si ya existe una alerta
        limpiarAlerta(referencia);




        //Generar alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
        


        // Inyectar el error al formulario
        referencia.appendChild(error);

        //Porque no usar innerHtml, porque en vez de ponerlo al final como appendChil, innerHtml emplaza todo el contenido

       
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }
    
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email); //se utiliza un emtodo .test que devuelve un boolean
        return resultado
    }


    // 9.1 usaremos el Object.values(email) que es para que nos retorne un array de los valores de las keys de los objetos, ahora, se le agregaria tambien .includes(''); con un string vacio para que nos de true cuando hay un string vacio
    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;
            /*Para que cambien le quitamos el opacity y le quitamos el false**/
        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;
    }

    //Reiniciar el objeto o formulario
    function resetFormulario() {
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        formulario.reset(); //Ese reset se lo podemos asignar luego con un metodo
        comprobarEmail();
        
    }

        
    
});

