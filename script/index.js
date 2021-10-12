//1. capturar formulario
const formProductos = document.querySelector('#registro');
//10. capturar listaProductos
const listaProductos = document.querySelector('#listaProductos');
//6. se crea un arreglo e inicia en vacio
let array = [];

//2. controlar el evento
formProductos.addEventListener('submit', e => {
    e.preventDefault();

    //3. capturar valor de lo que ingresa y almacenarlo en variable
    let codi = document.getElementById('codigo').value;
    let refe = document.getElementById('refer').value;
    let nom = document.getElementById('name').value;
    let img = document.getElementById('imgpro').value;
    //4. se crea la función y se envia por parametro las variables capturadas
    crearRegistro(codi,refe,nom,img);
    //9. llamar a la fun
    guardarRegistro();
})

//5. dentro de la fun se crea un objeto con los atributos 
const crearRegistro = (codi, refe, nom, img) => {
    let registro = {
        codigo: codi,
        referencia: refe,
        nombre: nom, 
        imagen: img
    }
    //7. se add el obj al arreglo
    array.push(registro);
    console.log(array);
}

//8. guardar y almacenar 
const guardarRegistro = () => {
    localStorage.setItem('Producto', JSON.stringify(array));
    //14. llamar fun
    listarProductos();
}

//paso 11
const listarProductos = () => {
    //12. asignar string vacio
    listaProductos.innerHTML = '';
    //13. guardar la info almacenada en LS
    array = JSON.parse(localStorage.getItem('Producto'));
    //15. recorrer para pintar
    array.forEach(element => {
        const {codigo, referencia, nombre, imagen} = element;
        listaProductos.innerHTML += `
        <div class="alert alert-primary" 
        role="alert"><i class="material-icons float-left mr-2">accessibility</i>
        <b><span>${codigo}</span></b></br>
        <span>${referencia}</span></br>
        <span>${nombre}</span></br>
        <img src="${imagen}"/></br>
        <i class="material-icons">delete</i></span></div></div>
        `
    });
}
//16. llamar fun cuando document inicial cargado
document.addEventListener('DOMContentLoaded',listaProductos);

//17. call event y capture element to delete
listaProductos.addEventListener('click', (e) => {
    let regpro = e.path[1].childNodes[2].innerHTML;

    if(e.target.innerHTML === 'delete'){
        eliminarRegistro(regpro);
    }
})
//18. enviar por parametro lo q se va a eliminiar
const eliminarRegistro = (codigo) => {
    let indexArray;
    array.forEach((elemento,index) => {
        if(elemento.referencia === codigo){
            indexArray = index;
        }
    })

    array.splice(indexArray,1);
    //19. call fun
    guardarRegistro();

}