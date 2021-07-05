export const initialState = {//para que se pueda consumir en index.js
    basket: [], //definimos este array vacio
    user: null, //creamos un usuario que empieza siendo null, este lo podemos usar en todo el codigo
} 

//basicamente, cuando en el catalogo de productos se aprieta el boton de agregar al carrito un producto, llamamos al checkoutpage mandandole un objeto agregado al array BASKET
//para que se mustre en el carrito

//aca se escucha esta accion ADDTOBASKET que sucede en PRODUCT cuando se aprieta el boton de añadir al carrito, modifica el estado añadiendo el item recibido al array. cualquier componente con USESTATEVALUE pueden consumir ese cambio de estado

export const actionTypes = {
    ADD_TO_BASKET: "ADD_TO_BASKET", //esta accion
    REMOVE_ITEM: "REMOVE_ITEM",
    SET_USER: "SET_USER",
    EMPTY_BASKET: "EMPTY_BASKET",
}


//esta funcion reductora, admite un acumulator y currenvalue y lo sumas. acumulator va acumulando, current value primero es 1, despues 2, y asi.
//usando una funcion REDUCE() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce  de javascript. la exportamos para poder consumirla en el componente total o en cualquiera 
// export const getBasketTotal = (basket) =>{// esta funcion recibe el array basket como parametro y suma esto:  basket[item1.price, item2.price, item2.price] eso hay q sumarlo1
//     //basket?.reduce((amount, item) => item.price + amount, 0) //0 porqe empieza desde 0
//     // const reducer = (acumulador, item) => item.price + acumulador;
//     // basket.reduce(reducer, 0)
//     const acumulador = 0;
//     basket.map(item =>{
//         acumulador = acumulador + item.price
//     })

// }


const reducer = (state, action) =>{
    //console.log(action)
    switch(action.type){
        case "ADD_TO_BASKET": //si alguien desde algun componente envia una accion de este tipo
            return { //tenemos que retornar esto. cambiamos el estado inicial
                ...state, //deja esto igual
                basket: [...state.basket, action.item], //pero en basket agrega al array lo que estemos inyectando, ese item
            };

        case "REMOVE_ITEM": //NO PODES ELIMINAR exatamente por ID. si agregaste 3 zapatillas iguales con el mismo ID  y solo queres borrar 1, te va a borrar las 3 por q tienen el mismo ID 
            const index = state.basket.findIndex(basketItem => basketItem.id === action.id) //esta variable indice, toma la posicion del array de aquiel id que pasaron por component. findIndex te da un basketItem y su ID es igual al ID que te pasaron por el componente. si el id es 3, y ese ID se encuentra en la posicion del array 2, se eliminara esa posicion
            let newBasket = [...state.basket] //copia del basket
            if (index>=0){  //si encontraste el indice de la posicion del ID q se paso como parametro
                newBasket.splice(index, 1) //este metodo de javascript busca el indice y elimina el elemento que encuentre con ese indice. el 1 es para que elimine 1 
            } else{ console.log("Cant remove product!!") }
            return {
                ...state, //retornamos todo el estado
                basket: newBasket, //el basket le asignamos el nuevo array que no contiene el que se quiso eliminar
            }

        case "SET_USER"://desde login llenamos este con el dispatch
            return{
                ...state,
                user: action.user
            }
        
        case "EMPTY_BASKET":
            return{
                ...state, //retornamos el state
                basket: action.basket //el actionbasket trae un array vacio que lo vaciamos en CloseSesion
            }

        default: return state; //en caso de default solo retornamos el state
    }

}

export default reducer;
