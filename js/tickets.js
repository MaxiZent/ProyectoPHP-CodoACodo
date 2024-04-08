let boxMsjUsuario = document.getElementById("msj-usuario");
let formulario = document.getElementById("formulario");
let inputs = document.querySelectorAll("#formulario input");
let btnComprar = document.getElementById("btn-buy");
let btnBorrar = document.getElementById("btn-clear");
let boxTotal = document.querySelector("#total-box");
let buyName = document.querySelector("#nombre");
let buyLastName = document.querySelector("#apellido");
let buyEmail = document.querySelector("#buy-email");
let buyAmount = document.querySelector("#amount");
let buyCategory = document.querySelector("#buy-category");
let totalCost = 0;
let buyTickesModal = document.getElementById('buyTickesModal');
let spinner = document.getElementById("spinner");
let btnHistory = document.getElementById("btn-history");
let boxHistory = document.getElementById("historial-box");

let ticketsCart = [
  { categoria: "General", cantidad: 0, subTotal: 0 },
  { categoria: "Estudiante", cantidad: 0, subTotal: 0 },
  { categoria: "Trainee", cantidad: 0, subTotal: 0 },
  { categoria: "Junior", cantidad: 0, subTotal: 0 }
]

let addTicket = document.getElementById("add-ticket");
let objTickets = {};
let listaCompras = JSON.parse(localStorage.getItem("listaCompras")) || [];

const saludoUsuario = () => {

  if (listaCompras.length == 0) {
    boxMsjUsuario.innerHTML = "¡Bienvenido! 😁";
  } else {
    boxMsjUsuario.innerHTML =`👋 Hola  ${listaCompras[0].nombre}` ;
  }
}

// LISTENER QUE SE ACTIVA CUANDO SE CARGA TODA LA PAGINA
//addEventListener("DOMContentLoaded", saludoUsuario);


// LISTENER QUE SE ACTIVA CUANDO SE CARGA EL MODAL DE COMPRA DE TICKETS
buyTickesModal.addEventListener('shown.bs.modal', () => {
  saludoUsuario();
})

const mostrarBoton = () => {
  buyAmount.value >= 1 ?
    addTicket.disabled = false 
    :
    addTicket.disabled = true 
}

btnHistory.addEventListener("click", renderHistorial);

// FUNCION PARA MOSTRAR EL HISTORIAL DE COMPRAS
function renderHistorial(e) {
  e.preventDefault();
  let listaComprasRender = JSON.parse(localStorage.getItem("listaCompras"))
  console.log(listaComprasRender);
    boxHistory.innerHTML = "";

    if (listaComprasRender == null) {
      boxHistory.innerHTML = `<div class="alert alert-info text-center p-3">NO SE HICIERON COMPRAS AUN</div>`;
      return
    } 

    if (listaComprasRender.length > 0){
      for (let i = 0; i < listaComprasRender.length; i++) { 
        boxHistory.innerHTML+= `
                                <tr>
                                  <th scope="row">
                                    ${listaComprasRender[i].nombre} 
                                    ${listaComprasRender[i].apellido}
                                    </br>
                                    Correo:
                                    </br>
                                    ${listaComprasRender[i].correo}
                                  </th>
                                  <td>
                                    ${listaComprasRender[i].tickets[0].cantidad}x 
                                    ${listaComprasRender[i].tickets[0].categoria} = 
                                    $${listaComprasRender[i].tickets[0].subTotal}
                                    </br>
                                    ${listaComprasRender[i].tickets[1].cantidad}x 
                                    ${listaComprasRender[i].tickets[1].categoria} = 
                                    $${listaComprasRender[i].tickets[1].subTotal}
                                    </br>
                                    ${listaComprasRender[i].tickets[2].cantidad}x 
                                    ${listaComprasRender[i].tickets[2].categoria} = 
                                    $${listaComprasRender[i].tickets[2].subTotal}
                                    </br>
                                    ${listaComprasRender[i].tickets[3].cantidad}x 
                                    ${listaComprasRender[i].tickets[3].categoria} = 
                                    $${listaComprasRender[i].tickets[3].subTotal}
                                  </td>
                                  <td>
                                    ${listaComprasRender[i].total}
                                  </td>
                                </tr>
                              `
      }
    } else {
      boxTotal.innerHTML = "NO SE HICIERON COMPRAS AUN";
    }
}

// FUNCION PARA MOSTRAR EL CARRITO CON LOS TICKETS PREVIOS A LA COMPRA
const renderCart = () =>{

    boxTotal.innerHTML = `<table class="alert alert-info table table align-middle table-hover">
                            <thead>
                              <tr>
                                <th scope="col">Accion</th>
                                <th scope="col">Cant.</th>
                                <th scope="col">Descripcion</th>
                                <th scope="col" class="text-end">Costo</th>
                              </tr>
                            </thead>
                            <tbody id="tableBody">
                            </tbody>
                          </table>
                        `
    ;

    ticketsCart.forEach(ticket => {
        if ( ticket.cantidad > 0 ) {
            document.getElementById("tableBody").innerHTML+= `
              <tr>
                <td>
                  <button class="rounded-1 p-2 mb-1 text-bg-danger text-decoration-none delTicket">
                    <i class="bi bi-x-lg"></i>
                  </button>
                </td>
                <td>${ticket.cantidad}</td>
                <td>
                  <i class="bi bi-ticket-perforated"></i> 
                  <span class="removeId">${ticket.categoria}</span>
                </td>
                <td class="text-end">SubTotal: $${ticket.subTotal}</td>
              </tr>
            `
        } 
    });

    if (totalCost > 0) {
      document.getElementById("tableBody").innerHTML+= `
          <tr>
            <th class="text-end fs-5 fw-bold" colspan=4 >Total: $ ${totalCost}</th>
          </tr>
        `
    }
    // LE APLICO UN LISTENER A TODOS LOS BOTONES ELIMINAR
    let botonesEliminar = document.querySelectorAll(".delTicket");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener('click', deleteTickets);
    });
    
}

function deleteTickets(e){
  e.preventDefault();
  let removeCategoria = e.target.closest("tr").children[2].lastElementChild.innerHTML;

  switch (removeCategoria) {
    case "General":
      totalCost = totalCost - parseInt(ticketsCart[0].subTotal);
      ticketsCart[0].cantidad = 0; 
      ticketsCart[0].subTotal = 0;
      break;
    case "Estudiante":
      totalCost = totalCost - parseInt(ticketsCart[1].subTotal);
      ticketsCart[1].cantidad = 0;
      ticketsCart[1].subTotal = 0;
      break;
    case "Trainee":
      totalCost = totalCost - parseInt(ticketsCart[2].subTotal);
      ticketsCart[2].cantidad = 0;
      ticketsCart[2].subTotal = 0;
      break;
    case "Junior":
      totalCost = totalCost - parseInt(ticketsCart[3].subTotal);
      ticketsCart[3].cantidad = 0;
      ticketsCart[3].subTotal = 0;
      break;
  }
  console.log(ticketsCart);

  renderCart();
  activarBtnComprar();

  if (totalCost == 0) {
    boxTotal.innerHTML = ``
  }
}

const reservar = (e) => {
    e.preventDefault();

    switch (buyCategory.value) {
        case "General":
            ticketsCart[0].cantidad = ticketsCart[0].cantidad + parseInt(buyAmount.value); 
            ticketsCart[0].subTotal = ticketsCart[0].subTotal + parseInt(buyAmount.value)*200;
            break;
        case "Estudiante":
            ticketsCart[1].cantidad = ticketsCart[1].cantidad + parseInt(buyAmount.value);
            ticketsCart[1].subTotal = ticketsCart[1].subTotal + parseInt(buyAmount.value)*40;
            break;
        case "Trainee":
            ticketsCart[2].cantidad = ticketsCart[2].cantidad + parseInt(buyAmount.value);
            ticketsCart[2].subTotal = ticketsCart[2].subTotal + parseInt(buyAmount.value)*100;
            break;
        case "Junior":
            ticketsCart[3].cantidad = ticketsCart[3].cantidad + parseInt(buyAmount.value);
            ticketsCart[3].subTotal = ticketsCart[3].subTotal + parseInt(buyAmount.value)*170;
            break;
    }

    // DESACTIVO EL BOTON ADDTICKET
    addTicket.disabled = true ;

    // QUITO LA CLASE DE VALIDACION DEL INPUT CANTIDAD
    buyAmount.classList.remove("is-valid");

    // RESETEO EL VALOR DEL INPUT CANTIDAD
    buyAmount.value = "";

    // INICIO UN ACUMULADOR PARA SUMAR LOS SUBTOTALES
    let acumulador = 0;

    // SUMO LOS SUBTOTALES DE TODAS LAS CATEGORIAS
    ticketsCart.forEach(element => {
      acumulador = element.subTotal + acumulador;
    });

    // INTRODUZCO EN EL TOTAL TODOS LOS SUBTOTALES ACUMULADOS
    totalCost = acumulador;

    renderCart();

    activarBtnComprar();

}

// FUNCION PARA QUE NO DEJE INGRESAR MAS DE 10 TICKETS EN LA CANTIDAD DE ENTRADAS A COMPRAR
const controlarCantidad = () => {
  if (buyAmount.value > 10 || buyAmount.value < 0 ) {
    buyAmount.value = "";
  }
}

// FUNCION PARA ACTIVAR BOTON COMPRAR
const activarBtnComprar = () => {
  // SI LOS INPUTS SON VALIDOS Y SE CARGARON TICKETS AL CARRITO ACTIVO EL BOTON COMPRAR
  if (( campos.nombre && campos.apellido && campos.correo ) && (totalCost > 0)) {
    btnComprar.disabled = false ;
  } else {
    btnComprar.disabled = true ;
  }
}

// LISTENER PARA MONITOREAR CUANDO EL USUARIO INGRESA UNA CANTIDAD INVALIDA DE TICKETS
buyAmount.addEventListener("keyup", controlarCantidad)

buyAmount.addEventListener("change", mostrarBoton);

addTicket.addEventListener("click", reservar);

class Compra{
  constructor(nombre, apellido, correo, tickets, total){
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.tickets = tickets;
    this.total = total;
  }
}

// GUARDO LA COMPRA EN EL LOCALSTORAGE
const guardarCompra = () => {
	let nombre = document.querySelector("#nombre").value;
	let apellido = document.querySelector("#apellido").value;
	let correo = document.querySelector("#correo").value;
	let total = totalCost;
	let tickets = Object.assign({}, ticketsCart);
	let compraNueva = new Compra (nombre, apellido, correo, tickets, total );
	listaCompras.push(compraNueva);
	localStorage.setItem("listaCompras", JSON.stringify(listaCompras));
}

// EXPRESIONES REGULARES PARA VALIDAR LOS INPUTS
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
  apellido: /^[a-zA-ZÀ-ÿ\s]{4,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

const campos = { 
	nombre: false,
	apellido: false,
  correo: false,
  cantidad: false
}

// VALIDAMOS LOS INPUTS
const validarFormulario = (e) => {

  activarBtnComprar();

  switch (e.target.name){
    case "buy-name":
      validarCampo(expresiones.nombre, e.target, "nombre");
    break;
    case "buy-lastname":
      validarCampo(expresiones.apellido, e.target, "apellido");
    break;
    case "buy-email":
      validarCampo(expresiones.correo, e.target, "correo");
    break;
    case "buy-amount":
      validarCantidad();
      mostrarBoton();
    break;
  }
}

const validarCampo = (expresion, input, campo) => {
  if(expresion.test(input.value)){
    document.querySelector(`#${campo}`).classList.add("is-valid");
    document.querySelector(`#${campo}`).classList.remove("is-invalid");
    document.querySelector(`#grupo__${campo} .msjError`).classList.add("d-none");
    campos[campo] = true ;
  } else {
    document.querySelector(`#${campo}`).classList.add("is-invalid");
    document.querySelector(`#${campo}`).classList.remove("is-valid");
    document.querySelector(`#grupo__${campo} .msjError`).classList.remove("d-none");
    campos[campo] = false ;
  }
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); // EVENTO QUE SE EJECUTA LUEGO DE PRESIONAR UNA TECLA
	input.addEventListener('blur', validarFormulario); // EVENTO QUE SE EJECUTA CUANDO HAGO CLICK FUERA DEL INPUT
});

// FUNCION PARA VALIDAR EL INPUT DE CANTIDAD
const validarCantidad = () =>  {
  if (totalCost == 0 ){
    if (buyAmount.value >= 1) {
      buyAmount.classList.add("is-valid");
      buyAmount.classList.remove("is-invalid");
      document.querySelector("#grupo__amount .msjError").classList.add("d-none");
    } else {
      buyAmount.classList.add("is-invalid");
      buyAmount.classList.remove("is-valid");
      document.querySelector("#grupo__amount .msjError").classList.remove("d-none");
    }
  }
}

// FUNCION PARA RESETEAR LOS CAMPOS LUEGO DE HACER UNA RESERVA
const resetCampos = () => {
	campos.nombre = false;
	campos.apellido = false;
	campos.correo = false;
	campos.cantidad = false;
}

// FUNCION PARA RESETEAR LOS MENSAJES DE ERROR
const resetMensajes = () => {
	document.querySelectorAll(".msjError").forEach((icono)=>{
		icono.classList.add("d-none");
	});
}

// RESETEO LOS TICKETS DEL CARRITO
const resetCart = () => {
  ticketsCart.forEach((categoria)=>{
    categoria.subTotal = 0;
    categoria.cantidad = 0;
  });
}

// FUNCION PARA EL BOTON COMPRAR
btnComprar.addEventListener("click", function(e){
  e.preventDefault();
  
  if ( campos.nombre && campos.apellido && campos.correo ){
    // GUARDAMOS LOS DATOS DE LA COMPRA EN NUESTRO ARRAY
    guardarCompra();

    // RESETEAMOS LOS CAMPOS DEL FORMULARIO
    formulario.reset();

    addTicket.disabled = true ;
    
    // MUESTRO SPINNER PARA SIMULAR PROCESOS DEL BACK
    spinner.classList.remove("d-none");

    setTimeout(() => {
      // LUEGO DE 2 SEGUNDOS DESACTIVO EL SPINNER Y MUESTRO MSJ DE EXITO
      spinner.classList.add("d-none");
      document.getElementById("msj__box-valid").classList.remove("d-none");
    }, "2000");

    // LUEGO DE 5 SEGUNDOS QUITO EL MENSAJE DE COMPRA
    setTimeout(() => {
        document.getElementById("msj__box-valid").classList.add("d-none");
    }, "5000");

    // DESACTIVO TODOS LOS ICONOS DE LAS VALIDACIONES
    document.querySelectorAll(".is-valid").forEach((icono)=>{
      icono.classList.remove("is-valid");
    });

    // VACIO LA CAJA DONDE SE MUESTRA EL TOTAL Y LA DESCRIPCION DE LA COMPRA
    boxTotal.innerHTML = "";

    // RESETEO TODOS LOS CAMPOS PARA QUE NO SE PUEDAN SEGUIR ENVIANDO PETICIONES LUEGO DE ENVIAR UNA Y TODOS LOS CAMPOS SEAN VALIDOS
    resetCampos();

    // RESETEO EL CARRITO 
    resetCart();

    // DESACTIVO EL BOTON COMPRAR NUEVAMENTE
    btnComprar.disabled = true;

  } else {
    document.getElementById("msj__box-error").classList.remove("d-none");

    // LUEGO DE 5 SEGUNDOS QUITO EL MENSAJE DE ERROR
    setTimeout(() => {
      document.getElementById("msj__box-error").classList.add("d-none");
    }, "5000");
  }
});

btnBorrar.addEventListener("click", function(e){
  e.preventDefault();
  formulario.reset();
  activarBtnComprar();

  resetCart();

  // RESETEO LOS CAMPOS PARA QUE NO SE PUEDA COMPRAR CON LOS INPUTS VACIOS LUEGO DE BORRAR
  resetCampos();

  // DESACTIVO EL BOTON COMPRAR NUEVAMENTE
  btnComprar.disabled = true;

  // DESACTIVO TODOS LOS ICONOS DE LAS VALIDACIONES
  document.querySelectorAll(".is-valid").forEach((icono)=>{
    icono.classList.remove("is-valid");
  });
  document.querySelectorAll(".is-invalid").forEach((icono)=>{
    icono.classList.remove("is-invalid");
  });

  // ELIMINO LOS MSJ DE VALIDACION SI QUEDO ALGUNO ACTIVO
  resetMensajes();

  // RESETEO LA CAJA DONDE MUESTRO EL TOTAL 
  boxTotal.innerHTML = "";
});
