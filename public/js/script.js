
//menu hamburguesa

const hamburguerButton = document.querySelector(".hamburguer-button");
const menu = document.querySelector(".menu");

const headerTable = document.querySelector(".styled-table thead tr");

hamburguerButton.addEventListener("click", () => {
    menu.classList.toggle("active");
});


//validacion front-end formulario registro

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input") 


const expresiones = {
    nombreUsuario: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    dniUsuario: /^\d{7,9}$/,
    emailUsuario: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    passwordUsuario: /^(?=.*[A-Z])(?=.*\d).{8,}$/
}

const campo = {
    nombreUsuario: false,
    dniUsuario: false,
    emailUsuario: false,
    passwordUsuario: false
}



const validarFormulario = ((e) =>{
        switch (e.target.name){
            case "nombreUsuario":
                validarCampo(expresiones.nombreUsuario, e.target , "nombreUsuario")
            break;
            case "dniUsuario":
                validarCampo(expresiones.dniUsuario, e.target , "dniUsuario")
            break;
            case "emailUsuario":
                validarCampo(expresiones.emailUsuario, e.target , "emailUsuario")
            break;
            case "passwordUsuario":
                validarCampo(expresiones.passwordUsuario, e.target , "passwordUsuario")
            break;
        }
});


function validarCampo(expresion, input, campo){
    if(expresion.test(input.value)){
        document.getElementById(`input-${campo}`).classList.remove("formulario-input-incorrecto");
        document.getElementById(`input-${campo}`).classList.add("formulario-input-correcto")
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.remove("formulario-input-error-activo")
        campos [campo] = true;
    } else {
        document.getElementById(`input-${campo}`).classList.add("formulario-input-incorrecto")
        document.getElementById(`input-${campo}`).classList.remove("formulario-input-correcto")
        document.querySelector(`#grupo-${campo} .formulario-input-error`).classList.add("formulario-input-error-activo")
        campos [campo] = false;
        document.querySelector(`#input-${campo} .element-form input` ).style.marginBottom = "0";
    }
}


inputs.forEach((input) =>{
    input.addEventListener("keyup", validarFormulario) // al soltar una tecla
    input.addEventListener("blur", validarFormulario) // al perder el foco del input
});


formulario.addEventListener("submit", (e) =>{   
    if(!(campos.nombreUsuario && campos.dniUsuario && campos.emailUsuario && campos.passwordUsuario)){
        e.preventDefault();
    }
});

