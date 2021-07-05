import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
//import MenuIcon from '@material-ui/icons/Menu';
import logo from "../assets/logopage.png" //lo importamos el logo, no IMG SRC="../" como estmos acostumbrados

import { ShoppingCart } from '@material-ui/icons' //para el icono del carrito

import { Badge } from '@material-ui/core' //esto es para poder ponerle el numero de la cantidad de articulos agrregados al carrito, en el icono del carrito

import CheckOutPage from './CheckOutPage'
import {Link, useHistory} from 'react-router-dom'

import {useStateValue} from '../StateProvider' //para poder acceder a basket

import {auth} from '../firebase'
import { actionTypes } from '../reducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "7rem",
  },
  appBar: {
    backgroundColor: "whitesmoke",
    boxShadow: "none",
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginLeft: theme.spacing(2), //separa del icono hasta la otra punta el boton LOGIN
  },
  image: {
    marginRight: "10px",//se usa camelCase para escribir las propiedades
    height: "4rem"
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const [{basket, user}, dispatch] = useStateValue();//esto y el IMPORT de useStateValue es necesario en todos los componentes donde yo quiera acceder al array basket

  const historia = useHistory()

  const closeSesion = () => {
    if (user){
      auth.signOut() //cierra la sesion por firebase
      //hay que informarle a reducer que se cierra sesion
      dispatch({
        type: actionTypes.EMPTY_BASKET,
        basket: [], //vaciamos el carrito de compra 
      });
      dispatch({
        type: actionTypes.SET_USER,
        user: null,
      })
      historia.push("/") //empujamos al usuario cuando se pulsa el boton de cerrar sesion al INICIO
    }
    
  }

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position="fixed"> {/* static estaba, con fixed cuando hacemos scroll y bajamos se pone arriba de todo */}
        <Toolbar>
         <Link to='/' > {/* para que cuando se toque el logo te lleve al inicio */}
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <img src={logo} className={classes.image}></img>
          </IconButton>
         </Link>

          {/*con este div decis, que el logo ocupe lo que tnga que ocupar, y luego lo siguiente que viene, boton, login, etc ocupen lo que quieran pero todo el espacio que hay entre medio crezca lo mas que pueda */}
          <div class={classes.grow}></div>

          


          <Typography variant="h6" color="textPrimary" component="p"> {/* como parrafo asi no se ve tan grande*/}
            Hello {user ? user.email : "Guest"} {/*condicion, si eciste, mostramos el email. sino el guest*/}
          </Typography>

          <div className={classes.button}>
            {
              user ? 
              (
                <Button variant="outlined" onClick={closeSesion}>
                  <strong>Close Sesion</strong>
                </Button>

              )
              :
              (
                <Link to='signIn'>
                  <Button variant="outlined"> {/* outlined le da el estilo al boton, podria ser filled*/}
                      <strong>Sign In</strong>
                  </Button>
                </Link> 
              )
            }


            <Link to='/checkout-page'> {/* para que cuando se toque el icono del carrito te lleve al carrito con tus produtos agregados */}
              <IconButton aria-label="show cart items" color="inherit">
                  <Badge badgeContent={basket?.length} color="secondary"> {/*basket?.length nos da la cantidad de productos añadidos al carrito, para la notificacion del carrito del navegador*/}
                      <ShoppingCart fontSize="large" color="primary"/>
                  </Badge>              
              </IconButton>
            </Link>

                
            

          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
