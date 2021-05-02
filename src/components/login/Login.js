import './Login.css'
import React from 'react'
import {withRouter} from 'react-router-dom'
import {getToken} from '../../api/auth'
import Modal from "react-bootstrap4-modal"
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
    ShowModal() {
        this.setState({
            visible: !this.state.visible
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
} catch (err){
    this.setState({
        visible: !this.state.visible
    })
}

}
    render() {
        return (
          <main class="row">

          <section class="col-md-6" id="panel-left">
              <div class="container align-self-center">
                  <div class="row">
                      <h1 class="col-8 text-center">Bienvenue sur GSB Galaxy Swiss Bourdin</h1>
                      
                  </div>


  
              </div>
          </section>
  
  
          <section class="col-md-6" id="panel-right">
              <div class="container">
                  <div class="row mb-5">
                      <h2 class="col-12 text-center">Se connecter</h2>
                  </div>
                  <div class="row">                    

                            
                          <div class="form-group">
                          
                          <input name ="login" class="form-control text-center " placeholder="Pseudo" onChange={(e) =>this.handleChange(e)} />
                          </div>
                          <div class="form-group">
                          <input type="password" name="mdp" class="form-control text-center" placeholder="Mot De Passe"onChange={(e) =>this.handleChange(e)}  />
                          </div>
                          

                          <div class="form-group text-center pt-4">
                          <button className="btn btn-primary" type="submit" id="bouton1" onClick={() => this.login()}>Se connecter</button>
                          </div>
                      
                  </div>
                  <div class="row mt-5">
                      <div class="col-12 links text-center">
                          <div>
                              <a href="#">Mot De Passe Oublié</a>
                          </div>
                          <Modal visible={this.state.visible} dialogClassName="" role="alert" onClickBackdrop={() => this.ShowModal()}>

<div className="modal-body alert alert-danger">
    
    <h6 className="centrer">Votre mot de passe ou votre identifiant est incorrect.</h6>
   
  
</div>                  
  

    </Modal>
                      </div>
                  </div>
              </div>
          </section>
      </main>

        
        )
        }
    }

    


export default withRouter(Login);
