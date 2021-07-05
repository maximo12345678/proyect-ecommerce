import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import { AddShoppingCart } from '@material-ui/icons'; //se agrega este import solo cuando en el cardActions pones este icono
import accounting from 'accounting' //para darle formato al precio https://www.npmjs.com/package/accounting
import DeleteIcon from '@material-ui/icons/Delete'; //icono tachito de basura

import { actionTypes } from '../reducer'
import {useStateValue} from '../StateProvider'


const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    action: {
        marginTop: "1rem",
    },
    cardActions: {
        display: "flex", //hace que se pongan uno al lado del otro
        justifyContent: "space-between", //esto hace que queden las estrellas de una punta y el tacho de la otra punta
        textAlign: "center"
    },
    cardRating: {
        paddingTop: '8%',
        display: "flex", // LAS ESTRELLAS SE PONEN HORIZONTALMENTE y no una arriba de la otra 
    }

}));


//es igual a PRODUCT, pero cambiandole algunas cosas al CARD. este es el que llamamos en el carrito

export default function CheckOutCard({ product: { id, name, productType, price, rating, imagen, description } }) {//esas propiedades del producto que viene como parametro, las tenemos disponibles para personalizar la tarjeta
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };


    const [{basket}, dispatch] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos
 

    const deleteItem = () => dispatch({ //despachamos el ID del item a eliminar 
        type: actionTypes.REMOVE_ITEM,
        id: id,
    })


    //El componente PRODUCTS llama a PRODUCT y le pasa como parametros las propiedades del objeto producto
    return (
        <Card className={classes.root}>
            <CardHeader
                action={
                    <Typography //esto es equivalente a si escribieramos un H5, le damos una clase con un color
                        className={classes.action}
                        variant="h5"
                        color="textSecondary"
                    >
                        {accounting.formatMoney(price, "$")} {/*el precio del producto*/}
                    </Typography>
                }
                title={name}
                subheader="In stock"
            />
            <CardMedia //aca va la imagen
                className={classes.media}
                image={imagen}
                title={name}
            />


            <CardActions disableSpacing className={classes.cardActions}> {/*creo esa clase de css para darle diseño a esta parte de actions*/}
                <div className={classes.cardRating}>
                    {/*estrellitas de valoracion*/}
                    {Array(rating) //crea un array, lo rellena con ese codigo entre P que representa la estrellita de valoracion, el 4 son 4 estrellitas 
                        .fill()
                        .map((_, i) => (
                            <p>&#11088;</p> //podes cambiar el codigo para que muestre otra cosa
                        ))
                    }
                </div>
                
                <IconButton>
                    <DeleteIcon fontSize="large" onClick={deleteItem} ></DeleteIcon> {/*agrandamos el boton con fontsize, y lo ponemos dentro de un boton para agregarle su funcionalidad*/}
                </IconButton>

        
            </CardActions>

        
        </Card>
    );
}
