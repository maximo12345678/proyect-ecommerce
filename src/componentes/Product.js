import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
//import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
//import FavoriteIcon from '@material-ui/icons/Favorite'; corazon que no usamos 
//import ShareIcon from '@material-ui/icons/Share';  icono de compartir
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import MoreVertIcon from '@material-ui/icons/MoreVert'; puntos verticales de menu
import { AddShoppingCart } from '@material-ui/icons'; //se agrega este import solo cuando en el cardActions pones este icono

import accounting from 'accounting' //para darle formato al precio https://www.npmjs.com/package/accounting

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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Product({product: {id, name, productType, price, rating, imagen, description}}) {//esas propiedades del producto que viene como parametro, las tenemos disponibles para personalizar la tarjeta
  const classes = useStyles();

  const [{basket}, dispatch] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos
  
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  


  //funcion que se llama cuando se aprieta el boton de agregar al carrito un producto
  const addToBasket = () =>{ //hace el dispatch del item que se clickeo y lo mete en la manguera de datos. 
    dispatch({
      type: actionTypes.ADD_TO_BASKET, //el tipo de accion que inyectamos en ala cada de datos es agregar al basket,
      item: { //le pasamos el producto como objeto con todos sus caracteristicas
        id: id,
        name: name,
        productType: productType,
        imagen: imagen,
        price: price,
        rating: rating,
        description: description
      } 
    }) 
  }
  

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
        image = {imagen}
        title = {name}
      />

      <CardContent> {/**/}
        <Typography variant="body2" color="textSecondary" component="p">
          {productType}
        </Typography>
      </CardContent>

      <CardActions disableSpacing> 
        <IconButton aria-label="Add to Cart" onClick={addToBasket}>
          {/*icono carrito*/}
          <AddShoppingCart fontSize="large"/>
        </IconButton>

      
        {/*estrellitas de valoracion*/}
        {Array(rating) //crea un array, lo rellena con ese codigo entre P que representa la estrellita de valoracion, el 4 son 4 estrellitas 
            .fill()
            .map((_, i)=>(
                <p>&#11088;</p> //podes cambiar el codigo para que muestre otra cosa
            ))
        }

        {/*aca esta la animacion de que se abre para abajo tipo ver mas o ver menos la descripcion*/}
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon /> {/*boton tipo flechita para mostrar + o - info*/}
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography> {/*dentro de lo anterior, ponemos el texto que viene por parametro de la descripcion del producto*/}
        </CardContent>
      </Collapse>
    </Card>
  );
}
