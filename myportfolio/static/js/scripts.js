function obtenerDatosUsuario(username) {
    const userUrl = `https://api.github.com/users/${username}`;

    fetch(userUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los datos del usuario.');
            }
            return response.json();
        })
        .then(userData => {
            console.log(userData);

            //Biografía
            document.getElementById('bio').textContent = userData.bio || 'Biografía no disponible';
            document.getElementById('repository').textContent = userData.public_repos;

            // Obtener la foto de perfil (avatar)
            const avatarUrl = userData.avatar_url;

            // Mostrar la foto de perfil
            const avatarImage = document.getElementById('avatar');
            avatarImage.src = avatarUrl; // Asignar la URL del avatar al src
            avatarImage.alt = `${username}'s avatar`;
        })
        .catch(error => {
            console.log('Error al obtener datos del usuario: ', error);
        });
}

// Invocar la función con el nombre de usuario
obtenerDatosUsuario('KevinParker02');


// --------------------------------------------------- Obtener datos del formulario.
let name = document.getElementById("name");
let nombreERROR = document.getElementById("nombreERROR");

let message = document.getElementById("message");

let email = document.getElementById("email");
let correoERROR = document.getElementById("correoERROR");

//(Parte del Login)
let user = document.getElementById("username");
let userERROR = document.getElementById("userERROR");

let password = document.getElementById("password");
let contraERROR = document.getElementById("contraERROR");

// Para el formulario (Agarra todo el contenido)
let form = document.getElementById("myForm");

// Prevenimos que se envíe el formulario con campos sin rellenar
form.addEventListener("submit", function(event){
    event.preventDefault(); //Prevenir recarga automática del formulario.
    validarFormulario();
});
// ---------------- (Validamos los datos del formulario)
function validarFormulario(){
    //Eliminamos los textos de error
    nombreERROR.textContent="";
    correoERROR.textContent="";

    //Validamos los inputs
    if(name.value === null|| name.value.trim()===""){
        nombreERROR.textContent="Por favor ingrese su nombre."
    };

    //Validamos el email
    const inputValue2 = email.value.trim();
    const allowedChars2 = /[a-zA-Z@ . 0-9\ _ ]/;
        //sanitizedValu2 (Variable) obtendrá el valor depurado, es decir, que una vez ingrese en el ciclo ELIMINARA cualquier caracter que no sea válido.
    let sanitizedValu2 = '';
    for (let i = 0; i < inputValue2.length; i++) {
        if (allowedChars2.test(inputValue2[i])) {
            sanitizedValu2 += inputValue2[i];
        }
    };
        //Finalmente actualizamos el registro obtenido en el imput y lo comparamos en los IF
        email.value = sanitizedValu2;

        if (inputValue2 === "") {
            correoERROR.textContent = "Debe ingresar un correo.";
        } else if (inputValue2 !== sanitizedValu2 || !inputValue2.includes('@') || !inputValue2.includes('.')) {
            correoERROR.textContent = "Debe ingresar un correo válido.";
        } else {
            correoERROR.textContent = "";
        }

    if(nombreERROR.textContent==="" && correoERROR.textContent===""){
        //Código para enviar un formulario.
        form.submit();
    };

};

// Prevenimos que se INICIE SESIÓN con campos sin rellenar
form.addEventListener("submit", function(event){
    event.preventDefault();
    validarLogin();
});
// ---------------- (Validamos los datos del LOGIN)
function validarLogin() {
    userERROR.textContent = "";
    contraERROR.textContent = "";

    //Validamos el usuario
    const inputValue2 = user.value.trim();
    const allowedChars2 = /[a-zA-Z@ . 0-9\ _ ]/;
        //sanitizedValu2 (Variable) obtendrá el valor depurado, es decir, que una vez ingrese en el ciclo ELIMINARA cualquier caracter que no sea válido.
    let sanitizedValu2 = '';
    for (let i = 0; i < inputValue2.length; i++) {
        if (allowedChars2.test(inputValue2[i])) {
            sanitizedValu2 += inputValue2[i];
        }
    };
        //Finalmente actualizamos el registro obtenido en el imput y lo comparamos en los IF
        user.value = sanitizedValu2;

        if (inputValue2 === "") {
            userERROR.textContent = "Debe ingresar un usuario.";
        } else if (inputValue2 !== sanitizedValu2 || !inputValue2.includes('_')) {
            userERROR.textContent = "Debe ingresar un usuario válido.";
        } else {
            userERROR.textContent = "";
        }

    // Validación de la contraseña
    const passwordValue = password.value.trim();

    if (passwordValue === "") {
        contraERROR.textContent = "Debe ingresar una contraseña.";
    } else {
        contraERROR.textContent = "";
    }

    if (userERROR.textContent === "" && contraERROR.textContent === "") {
        form.submit();
    }

}
