import React from 'react'
import './CreateBill.css'
import * as fromBillsApi from '../../api/bills'
import {withRouter } from "react-router-dom";
class CreateBill extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      fraishorsforfait: [],
      nightsQty:0,
      repasQty:0,
      kmQty:0,
      date:'',
      anneeMois:''            
  }

}
handleChange(e){
	e.preventDefault()
	let name = e.target.name
	this.setState({
		[name]: e.target.value
	})
}
handleRowsChange(e, i){
  e.preventDefault()
  let {name, value } = e.target
  let fraishorsforfait = [...this.state.fraishorsforfait]
  fraishorsforfait[i] = {
      ...fraishorsforfait[i],
      [name] : value
  }
  this.setState({
      fraishorsforfait : fraishorsforfait    
  }, () => console.log(this.state.fraishorsforfait))
}

addRows() {
  this.setState({
      fraishorsforfait: [...this.state.fraishorsforfait, {date: '', libelle: '', montant: '', justificatif: '' }]
  })
}

removeRows(i){
  let row = this.state.fraishorsforfait
  row.splice(i,1)
  this.setState({
      fraishorsforfait:row
  })
}

async postFiche(){
  let idUser = localStorage.getItem('id')
  let fiche = await fromBillsApi.postAddFiche({idutilisateur : idUser, mois: this.state.anneeMois, nbJustificatifs : '5', montantValide : '70.00', dateModif : '2021-04-04', idEtat : 'CR'})
  let km = await fromBillsApi.postLigneFraisForfait({idutilisateur : idUser, mois: this.state.anneeMois, idFraisForfait : 'KM', quantite : this.state.kmQty})
  let night = await fromBillsApi.postLigneFraisForfait({idutilisateur : idUser, mois: this.state.anneeMois, idFraisForfait : 'NUI', quantite : this.state.nightsQty})
  let meals = await fromBillsApi.postLigneFraisForfait({idutilisateur : idUser, mois: this.state.anneeMois, idFraisForfait : 'REP', quantite : this.state.repasQty})
  this.state.fraishorsforfait.map(async (f,i) => {
      let horsforfait = await fromBillsApi.postLigneFraisHorsForfait({idutilisateur : idUser, mois: this.state.anneeMois, libelle : f.libelle, date : f.date, montant : f.montant})

  })
  this.props.history.push('/bills')
  
}



async componentDidMount() {
  let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  let numMonth = new Date().getMonth()
  let year = new Date().getFullYear()
  let monthText
  months.map((month, i) => {
      if(i == numMonth) monthText = month
  })


  let tabMois = ['01','02', '03', '04', '05', '06','07','08','09','10','11','12',]
  let numMois = new Date().getMonth()
  let mois 
  tabMois.map((num, i) => {
      if (i == numMois) mois = num
  })
      
  this.setState({
      date : ` de ${monthText} ${year}`,
      anneeMois : year + mois
  })

}


  render() {
    return (

      <main class="flex-shrink-0">
        <div class="background3">
        <div class="container">

        <br></br> <br></br> <br></br>
          <h1 class="mt-5 " >Bienvenue sur votre espace de creation de fiche de frais</h1>


                 
                        <div className="modal-header">
                            <h5 className="modal-title">AJOUT DE FRAIS</h5>
                        </div>
                        <div className="modal-body">
                        <div className="row">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Type</th>
                                            <th scope="col">Quantite</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">Nuitées</th>
                                            <td><input className="form-control form-control-sm" type="number" placeholder="0" name="nightsQty" value={this.state.nightsQty} onChange={(e) => this.handleChange(e)}/></td>
                                            <td>80€</td>
                                            <td>{this.state.nightsQty * 80}€</td>
                                           
                                        </tr>
                                        <tr>
                                            <th scope="row">Repas</th>
                                            <td><input className="form-control form-control-sm" type="number" placeholder="Nombre De Repas" name="repasQty"value={this.state.repasQty} onChange={(e) => this.handleChange(e)} /></td>
                                            <td>25€</td>
                                            <td>{this.state.repasQty * 25}€</td>
                                            
                                        </tr>
                                        <tr>
                                            <th scope="row">Kilométrage</th>
                                            <td><input className="form-control form-control-sm" type="number" placeholder="Kilometres" name="kmQty" value={this.state.kmQty} onChange={(e) => this.handleChange(e)} /></td>
                                            <td>0,62€</td>
                                            <td>{this.state.kmQty * 0.62}€</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="row">
                              <div className ="col-12">
                                <div className="fraishorsforfait">
                     

                                  </div>
                                  </div>
                                </div>
                              </div>
                              <div className="modal-header">
                            <h5 className="modal-title">AJOUT DE FRAIS HORS FORFAIT</h5>
                        </div>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Libelle</th>
                                            <th scope="col">Montant</th>
                                            <th scope="col">Justificatifs</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                      {
                                    this.state.fraishorsforfait.map((f,i) => {
                                      return (
                                        <tr key={i}>
																				<th scope="row"><input type="date" name="date" value={this.state.fraishorsforfait[i].date} onChange={(e) => this.handleRowsChange(e,i)} /> </th>
																				<td><input className="form-control form-control-sm" type="text" name="libelle" placeholder="Libelle" value={this.state.fraishorsforfait[i].libelle} onChange={(e) => this.handleRowsChange(e,i)}/> </td>
																				<td><input type="number" step="0,01" name="montant" placeholder="Montant" value={this.state.fraishorsforfait[i].montant} onChange={(e) => this.handleRowsChange(e,i)} /><span class="input"> €</span></td>
																				<td><input type="file" name="justificatif" value={this.state.fraishorsforfait[i].justificatif} onChange={(e) => this.handleRowsChange(e,i)}/></td>
																				<td><button className="btn btn-danger btn-sm" data-action="delete" onClick={() => this.removeRows(i)}> x </button> </td>

																			</tr>
                                      )
                                  })
                                } 

                                    </tbody>
                                </table>

                                <div className="modal-footer">
                                <button className="btn btn-primary" onClick={() => this.addRows()}>Ajouter frais hors forfait
                                  </button>
                            <button type="button" className="btn btn-primary" onClick={() => this.update()}>
                                Enregistrer Frais 
                             </button>
 
                             <div class="col text-center">
                                    <button type="submit" class="btn btn-primary mt-3 mb-3" onClick={() => this.postFiche()}>Créer la fiche</button>
                                </div>
                           
                        </div>

                </div>



</div>
            </main>


    )
  }
}

export default withRouter(CreateBill);
