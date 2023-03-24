
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let campoCarnet = document.querySelector('#carnet').value;
    let campoPassword = document.querySelector('#password').value;
    
    if(campoCarnet == "Admin" && campoPassword == "Admin"){
        window.location.href = "../ventana-admin.html";
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Datos incorrectos. Verificalos y vuelve a intentar.',
          })
    }

});