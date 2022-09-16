document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
    scrollNav();
    navegacionFija();
}

//Función para añadir las imagenes de la galería desde 
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    //galeria.textContent = 'vamos a crear la galería';

    //Ciclo para añadir 12 imagenes
    for(let i = 1; i <= 12; i++){
        const imagen = document.createElement('picture');
        //Copiamos tal cual la etiqueta de imagenes que tenemos desde el html solo cambiando la ruta de las imagenes y especificando que se inserten de acuerdo a la iteración del ciclo
        imagen.innerHTML = `
            <img  loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen de galería">
        `;

        //detectar a qué imagen se da click
        imagen.onclick = function(){
            //mostrar el indice de la imagen
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

//Función para establecer el nav fijo
function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        if( sobreFestival.getBoundingClientRect().bottom < 0 ){
            //Cuando se haga scroll en el posicionamiento de un elemento se le agregará una clase fijo al header
            barra.classList.add('fijo');
            body.classList.add('body-scroll');

        } else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll')
        }
    })
}

//Asignamos id como parámetro
function mostrarImagen(id){
    //console.log("mostrando...,", id);
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <img  loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen de galería">
    `;

    //Para oscurecer un poco el fondo de la pantalla cuando se visualice la imagen en mayor tamaño a fin de lograr efecto de enfoque
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    //Para que la imagen se cierre al dar click en cualquier otro lado
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Añadir botón para cerrar la imgaen añadida
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    //Lo añade al overlay, por tanto al html también
    overlay.appendChild(cerrarModal);
    //Función para cerrar la imagen con el evento click del botón
    cerrarModal.onclick = function(){
        //Para que elimine la clase fijar-body y permita nuevamente el desplazamiento una vez que la imagen se cierre
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }


    //Se crea una constante body a fin de agregar al body las imagenes seleccionadas, es decir, las añade al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    //Para fijar el body y no hacer scroll cuando una imagen esté abierta
    body.classList.add('fijar-body');
}

//Añadir un suavizado al redirigirnos a las secciones de la página
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e){
            //Prevenimos la opción por defecto para que la configuración de ScrollIntoView tenga efecto
            e.preventDefault();

            //Guardamos en una constante lo que se desea mostrar con la función click en las opciones del nav
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll)
            //Opción que permite modificar el comportamiento por defecto del método scrollIntoView
            seccion.scrollIntoView({behavior: 'smooth'});
        })
    });
}