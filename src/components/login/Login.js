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
        this.props.history.push('/bills')
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

          <h1 class="h3 mb-3 fw-normal">Connexion</h1>
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
              <input type="checkbox" value="remember-me"/> Remember me
            </label>
          </div>
          <div class="col-6 col-sm-2 form-group">
          <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={() => this.login()}>Sign in</button>
          </div>
          <br></br>
          <div class="col-6 col-sm-2 form-group">
          <button class="w-100 btn btn-lg btn-primary" type="submit" onClick={() => window.alert("Avez vous oublié votre mot de passe ? ")}>Mot De Passe Oublié</button>
          
          </div>
          </div>
          


          </center>
      </main>

        
        )
        }
    }



export default withRouter(Login);
