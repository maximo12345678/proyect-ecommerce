import React from 'react'
import accounting from "accounting"
import { Button, makeStyles } from '@material-ui/core'

//import {getBasketTotal} from '../reducer'
import {useStateValue} from '../StateProvider'

//import Checkout from './CheckOutFormulario/Checkout'

import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex", //hace que se pongan uno al lado del otro
        flexDirection: "column", //texto apilado y el boton abajo
        justifyContent: "center",
        alignItems: "center", //deja mas chico el boton de ancho
        height: "20vh" //altura del componente
    },
    button: {
        //maxWidth: "", //si el boton se amplia mucho aca lo limitas, pero en este caso no es necesario por ser un boton de material UI, tiene una altura maxima por defecto capaz
        marginTop: "2rem" //separa el boton del total items
    }
}))


const Total = () =>{

    const classes = useStyles()

    const [{basket}, dispatch] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos

    const getBasketTotal = (basket) =>{
        let acumulador = 0;
        basket.map(item =>{
            acumulador = acumulador + item.price
        })

        return acumulador;
    }


    return (
        <div className={classes.root}>
            <h5>Total Items: {basket?.length} </h5> {/*con el ? nos protejemos de que no se rompa la app al cargar el componente. optional changued*/}
            <h5> {accounting.formatMoney(getBasketTotal(basket), "€")} </h5> {/*en lugar de un valor fijo, llamamos a esta funcion que en REDUCER calcula el monto*/}

            <Link to='checkOut'>
                <Button className={classes.button} variant="contained" color="secondary" >Check Out</Button>
            </Link>
            
        </div>
    )
}


export default Total;