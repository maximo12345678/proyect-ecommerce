import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

//import products from '../product-data'

import CheckOutCard from './CheckOutCard'

import Total from './Total';//componente total

import {useStateValue} from '../StateProvider'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(7), //un espacio entre el borde de la pantalla y las cards
    },

}));


const CheckOutPage = () => {
    const classes = useStyles();

    const [{basket}, dispatch] = useStateValue();//esto y el IMPORT de useStateValue es necesario en todos los componentes donde yo quiera acceder al array basket

    function FormRow() {//es un GRID anidado, porque en un grid llamamos a este funcion que muestra otro grid
        return (
            <React.Fragment>
                {
                    basket?.map(item => ( //recorremos el array basket, pero con el signo de pregunta para que solo si es verdadero (si contiene algo) lo mostremos. sino si entras al carrito sin haber agregado ningun producto se rompe todo
                        <Grid item xs={12} sm={8} md={6} lg={4}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}
                            <CheckOutCard key={item.id} product={item} /> {/* le pasamos el identificador unico y el objeto completo*/}
                        </Grid>
                    ))

                }
            </React.Fragment>
        )
    }



    return (
        <div className={classes.root}>

            <Grid container spacing={5}> {/* spacing es como el pading entre los cards */}
                <Grid item xs={12}>
                    <Typography align='center' gutterBottom variant='h4'>
                        Shopping Cart {/*Este texto, sea la resolucion que sea, siempre permanecera en el centro */}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8} md={9} container spacing={2}>
                    <FormRow></FormRow> {/*llamamos a la funcion que nos muestra todos los productos,*/}
                </Grid>

                <Grid item xs={12} sm={4} md={3} >
                    <Typography align='center' gutterBottom variant='h4'>
                        <Total></Total> 
                    </Typography>
                </Grid>
                
            </Grid>
        </div>
    );
}


export default CheckOutPage;