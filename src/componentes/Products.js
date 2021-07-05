// PRODUCTS contiene todos los PRODUCT

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Product from './Product'

import products from '../product-data'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(7), //un espacio entre el borde de la pantalla y las cards
  },

}));

export default function Products() {
  const classes = useStyles();
    //los breakpoints nos dan una facilidad antes que usar puro css, tendiras que darle un compotamiento especifico a cada resolucion y es mas lio. ahora esto es mas facil
  return (
    <div className={classes.root}>

      <Grid container spacing={5}> {/* spacing es como el pading entre los cards */}
 
        {
          products.map(product =>(
            <Grid item xs={12} sm={6} md={4} lg={3}>{/* cuando sea pequeño que ocupe todo, un poco mas grande solo la mitad de la tarjeta, un poco mas grande que cada tarjeta ocupe 1/3 de la pantalla, cuando sea grande que cada tarjeta ocupe 1/4 de la pantalla              este breakpoint dice que pase lo que pae con el tamaño de la resolucion, este card ocupa toda la columna igual .  XS extra small, SM small. el numero es la cantidad e columnas  -  poniendole a todos lo mismo todos se comportan igual*/}
              <Product key={product.id} product={product}/> {/* le pasamos el identificador unico y el objeto completo*/}
            </Grid>
          ))

        }
      </Grid>
    </div>
  );
}


