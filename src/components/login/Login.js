import './Login.css'
import React from 'react'
import {withRouter} from 'react-router-dom'
import {getToken} from '../../api/auth'

class Login extends React.Component {
    constructor(props) {
        super (props)
        this.state = {
            mdp : '',
            login :''
        }

    }
    handleChange(e){
        let {name,value} =e.target
        this.setState({
            [name]:value
        })
    }

    async login() {
        try {
          let {decoded, token} = await getToken({login: this.state.login, mdp: this.state.mdp})

          if(decoded) {
              console.log(decoded)
        localStorage.setItem('id',decoded.id)
        localStorage.setItem('token',token) 
        this.props.history.push('/Accueil')
    }
  }catch (e) {
      console.error(e)
  }


    }

    render() {
        return (

            <main class="form-signin">

<center>
    
    
<div class="background"></div>

    <div class='overlay'>    
    <div class="titre">
          <h1 class="h3">Connexion</h1>
    </div>
          <label for="inputEmail" class="visually-hidden">Email address</label>
          <div class="col-6 col-sm-4 form-group">
          <input name ="login" class="form-control text-center" placeholder="Pseudo" onChange={(e) =>this.handleChange(e)} />
          </div>
          <label for="inputPassword" class="visually-hidden">Password</label>
          <div class="col-6 col-sm-4 text-center form-group"  >
          <input type="password" name="mdp" class="form-control text-center" placeholder="Mot De Passe"onChange={(e) =>this.handleChange(e)}  />
          </div>
          <div class="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me"/> Enregistrer le mot de passe
            </label>
          </div>

          <div class="boutonlogin">
          <div className="modal-footer">
        <button className="btn btn-primary" type="submit" id="bouton1" onClick={() => this.login()}>Se connecter</button>
        <button class="w-1000 btn  btn-primary" type="submit" id ="bouton1" onClick={() => window.alert("Avez vous oublié votre mot de passe ? ")}>Mot De Passe Oublié</button>
                        </div>
        </div>
        </div>
          <div class='overlay2'>          </div>     
          </center>

      </main>

        
        )
        }
    }



export default withRouter(Login);
