import { createContext, useState, useEffect } from "react"

/*foi necessário o ignore pois a máquina de desenvolvimento
trabalhou com recursos antigos para o desenvolvimento, gerando problemas na
instalação da dependencia do react route*/
// @ts-ignore
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { auth, firebase } from './services/firebase';

import { AuthContextProvider } from './contexts/AuthContext'
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

function App() {


  return (
      <BrowserRouter>
        <AuthContextProvider>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/rooms/new" component={NewRoom}/>
            <Route path="/rooms/:id" component={Room}/>
            <Route path="/admin/rooms/:id" component={AdminRoom}/>
          </Switch>
        </AuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
