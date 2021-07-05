import './App.css';
import Products from './componentes/Products.js'
import Product from './componentes/Product.js'
import Navbar from './componentes/Navbar'
import CheckOutPage from './componentes/CheckOutPage'
import SignIn from './componentes/SignIn'
import SignUp from './componentes/SignUp'

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { useEffect } from 'react';
import {auth} from './firebase'

import { actionTypes } from './reducer'
import {useStateValue} from './StateProvider'

import Checkout from './componentes/CheckOutFormulario/Checkout'




// npm run build -> construimos una carpeta que se llama build, que tiene todo lo que necesitas para publicar optimizado, se desprende
//de todo lo utilizado durante el desarrollo, esta optimizado y podes arrastrarla a ... https://www.netlify.com/ y publicar






function App() {

  const [{user}, dispatch] = useStateValue();//hacer el destructory para obtener el basket que ahora esta vacio, y la funcion dispatch que usamos para despachar los datos

  //ESTO LO HACEMOS ACA, asi no lo tenemos que modificar cuando se loguea y cuando se registra. esto se va a ejecutar siempre
  useEffect(()=>{
    //metodo para ver si el usuario cambio en algun momoento
    auth.onAuthStateChanged((authUser)=>{
      console.log(authUser)
      if (authUser){
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      }
    })

  },[]) //2 parametros, una funcion flecha y un array vacio, si esta vacio el array la funcion flecha se va a ejecutar solo 1 vez, si tiene una variable el array, la flecha se ejecutara esa N cant de veces


  return (
    <div className="App">

      <Router>

        <Navbar></Navbar>

        <Switch>

          <Route exact path='/'>
            <Products></Products>
          </Route>

          <Route path='/checkout-page'>
            <CheckOutPage></CheckOutPage>
          </Route>

          <Route path='/signIn'>
            <SignIn></SignIn>
          </Route>

          <Route path='/signUp'>
            <SignUp></SignUp>
          </Route>
        
          <Route path='/checkOut'>
            <Checkout></Checkout>
          </Route>

        </Switch>

      </Router>
      
    </div>
  );
}

export default App;
