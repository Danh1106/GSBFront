import React from 'react'
import './BillsList.css';
import * as fromBillsApi from '../../api/bills'
import Modal from 'react-bootstrap4-modal'
import moment from 'moment'
class BillsList extends React.Component {


  constructor(props) {
    super(props)

    this.state = ({
        idFraisForfait: ['KM' , 'NUI', 'REP'],
        visible: false,
        quantite:'',
        mois:'',
        bills: [],
        users:[],
        fraishorsforfait: [],
        kmQty:0,
        nightsQty:0,
        repasQty:0,
        profileImg:''
    })

}

showModal() {
  this.setState({
    visible: !this.state.visible
  })
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

ShowModal() {
  
  this.setState({
      visible: !this.state.visible
  })
}

async getLignes(mois) {
 
  let id = localStorage.getItem('id')
  let ligneff = await fromBillsApi.getLigneFraisForfait(id, mois)
  let lignefhf = await fromBillsApi.getLigneFraisHorsForfait(id,mois)
  lignefhf.result.map((ligne,i) => {

      ligne.date = moment(ligne.date).format("YYYY-MM-DD")
  })
  
  this.setState({
      kmQty: ligneff.result[0].quantite,
      nightsQty: ligneff.result[1].quantite,
      repasQty: ligneff.result[2].quantite,
      fraishorsforfait: lignefhf.result,
      mois: mois

  })

}


async update() {
  let idUser = localStorage.getItem('id')
  
  await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[0],this.state.kmQty)
  await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[1],this.state.nightsQty)
  await fromBillsApi.putLigneFraisForfait(idUser, this.state.mois, this.state.idFraisForfait[2],this.state.repasQty)
  
  this.state.fraishorsforfait.map(async (f,i) => {
      let horsforfait = await fromBillsApi.putLigneFraisHorsForfait(f.id, {idutilisateur : idUser, mois: this.state.mois, libelle : f.libelle, date : f.date, montant : f.montant})
  })

  
  this.setState({
      visible : !this.state.visible
  })
}
addRows() {
        
  this.setState({
      fraishorsforfait: [...this.state.fraishorsforfait, {date: '' , libelle: '', montant: '', justificatif: ''}]
  })
}
removeRows(i){
  let row = this.state.fraishorsforfait
  row.splice(i,1)
  this.setState({
      fraishorsforfait:row
  })
}

async componentDidMount() {
  let id = localStorage.getItem('id')
  let bills = await fromBillsApi.getBills(id)
  this.setState({ 
      bills: bills.result,
      
  })

  
}

render() {
    return (

      <main class="flex-shrink-0">
        <div class="background3">
        <div class="container">

        <br></br> <br></br> <br></br>
          <h1 class="mt-5 " >Bienvenue sur votre de modification de fiche de frais</h1>
          <table class="table table-hover">
          
            <thead>
              <tr>
                <th>id utilisateur</th>
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
                      <button type="button" class="btnmodifier" data-action="update" onClick={() => {this.showModal(); this.getLignes(bill.mois)}} > <img src="edit.png" alt=""/>MODIFIER</button>
                      </td>
                    </tr>
                    
                  )
                })
              }
            </tbody>
            </table>
            
                    <Modal dialogClassName="ok" visible={this.state.visible} onClickBackdrop={() => this.showModal()}>
                        <div className="modal-header">
                            <h5 className="modal-title">MODIFICATION DE FRAIS</h5>
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
                            <h5 className="modal-title">MODIFICATION DE FRAIS HORS FORFAIT</h5>
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
                                    this.state.fraishorsforfait.map((f, i) => {
                                      return (
                                        <tr key={i}>
																				<th scope="row"><input type="date" name="date" value={this.state.fraishorsforfait[i].date} onChange={(e) => this.handleRowsChange(e,i)} /> </th>
																				<td><input className="form-control form-control-sm" type="text" name="libelle" placeholder="Libelle" value={this.state.fraishorsforfait[i].libelle} onChange={(e) => this.handleRowsChange(e,i)}/> </td>
																				<td><input type="number" step="0,01" name="montant" placeholder="Montant" value={this.state.fraishorsforfait[i].montant} onChange={(e) => this.handleRowsChange(e,i)} /><span class="input"> €</span></td>
                                        <td><input type="file" name="justificatif" value={this.state.fraishorsforfait[i].justificatif} onChange={(e) => this.handleRowsChange(e,i)}/></td>
																				<td><button className="btn btn-danger btn-sm" onClick={() => this.removeRows(i)}> x </button> </td>
                                        <td>

                                                            </td>
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
                            <button type="button" className="btn btn-secondary"onClick={() => this.showModal()} >
                                Annuler
                           </button>
                           
                        </div>
                    </Modal>
                </div>



</div>
            </main>


    )
  }
}

export default BillsList;
