import React from 'react'
import './BillsList.css';
import * as fromBillsApi from '../../api/bills'
import Modal from 'react-bootstrap4-modal'
class BillsList extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      bills: [],
      visible: false,
      rows: [],
      nightsQty:"",
      Kilometrage:"",
      Repas:"",
      dateHF : "",
	    libelleHF : "",
	    montantHF : "",
    }
  }
  handleChange(e){
    e.preventDefault()
    let name = e.target.name
    this.setState({
      [name]: e.target.value 
    })
  }
  async postFiche(){
    let Kilometrage = await fromBillsApi.postBills({idutilisateur: 'a131' , mois:'202101', idFraisForfait:'KM', quantite:this.state.Kilometrage})
    let Repas = await fromBillsApi.postBills({idutilisateur: 'a131', mois:'202101', idFraisForfait:'REP', quantite:this.state.Repas})
    let nightsQty = await fromBillsApi.postBills({idutilisateur: 'a131', mois:'202101', idFraisForfait:'NUI', quantite:this.state.nightsQty})
}
  handleRowsChange(e,i){
    let {name,value} = e.target
    let rows = [...this.state.rows]
    rows[i] = {
      ...rows[i],
      [name]:value
    }
    this.setState({
      rows: rows
    }, () => console.log(this.state.rows))
  }
  async componentDidMount() {
    let bills = await fromBillsApi.getBills()
    this.setState({ bills: bills.result }, () => console.log(this.state))
  }
  showModal() {
    this.setState({
      visible: !this.state.visible
    })
  }

  addRow() {
    this.setState({
      rows:[...this.state.rows,{name:'',date:'',qty:'',files:''}]
    })
  }

  removeRow(i) {
  let newRows = this.state.rows
  newRows.splice(i,1)
  this.setState({
    rows:newRows
  })
}

  render() {
    return (

      <main class="flex-shrink-0">
        <div class="container">
          <h1 class="mt-5 " >Bienvenue sur votre espace personnel</h1>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>id Utilisateur</th>
                <th>Mois</th>
                <th>Justificatifs</th>
                <th>Montant</th>
                <th>Date de modification</th>
                <th>Etat</th>
                <th>Action</th>






              </tr>
            </thead>
            <tbody>
              {
                this.state.bills.map((bill, i) => {
                  return (
                    <tr>
                      
                      <th scope="row">1</th>
                      <td>{bill.mois}</td>
                      <td>{bill.nbJustificatifs}</td>
                      <td>{bill.montantValide}</td>
                      <td>{bill.dateModif}</td>
                      <td>{bill.idEtat}</td>
                      <td>
                      <button type="button" class="btnmodifier" onClick={() => this.showModal()} > <img src="edit.png" alt=""/>MODIFIER</button>
                      </td>
                    </tr>
                    
                  )
                })
              }
            </tbody>
            </table>
                    <Modal dialogClassName="ok" visible={this.state.visible} onClickBackdrop={() => this.showModal()}>
                        <div className="modal-header">
                            <h5 className="modal-title">MODIFICATION EN COURS</h5>
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
                                            <td><input className="form-control form-control-sm" type="number" placeholder="Nombre De Repas" name="Repas" value={this.state.Repas} onChange={(e) => this.handleChange(e)} /></td>
                                            <td>29€</td>
                                            <td>{this.state.Repas * 29}€</td>
                                            
                                        </tr>
                                        <tr>
                                            <th scope="row">Kilométrage</th>
                                            <td><input className="form-control form-control-sm" type="number" placeholder="Kilometres" name="Kilometrage" value={this.state.Kilometrage} onChange={(e) => this.handleChange(e)} /></td>
                                            <td>0,8€</td>
                                            <td>{this.state.Kilometrage * 0.8}€</td>
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
                            <h5 className="modal-title">FRAIS HORS FORFAIT</h5>
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
                                    this.state.rows.map((r,i) => {
                                      return (
                                        <tr key={i}>
																				<th scope="row"><input type="date" name="date" value={this.state.rows[i].date} onChange={(e) => this.handleRowsChange(e,i)} /> </th>
																				<td><input className="form-control form-control-sm" type="text" name="libelleHF" placeholder="Libelle" value={this.state.rows[i].libelleHF} onChange={(e) => this.handleRowsChange(e,i)}/> </td>
																				<td><input type="number" step="0,01" name="montantHF" placeholder="Montant" value={this.state.rows[i].montant} onChange={(e) => this.handleRowsChange(e,i)} /><span class="input"> €</span></td>
																				<td><input type="file" /></td>
																				<td><button className="btn btn-danger btn-sm" onClick={() => this.removeRow(i)}> x </button> </td>

																			</tr>
                                      )
                                  })
                                } 

                                    </tbody>
                                </table>

                        <div className="modal-footer">
                        <button className="btn btn-primary" onClick={() => this.addRow()}>Ajouter frais hors forfait
                                  </button>
                            <button type="button" className="btn btn-primary" onClick={this.postFiche()}>
                                Enregistrer
                             </button>
                            <button type="button" className="btn btn-secondary"onClick={() => this.showModal()} >
                                Annuler
                           </button>
                           
                        </div>
                    </Modal>
                </div>
                
            </main>


    )
  }
}

export default BillsList;
