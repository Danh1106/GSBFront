import React from 'react'
import '../../src/App.css';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Createbill from '../components/createBill/CreateBill'
class CreateBill extends React.Component {
  constructor(props){
    super(props)
  }
  render () {
    return (
      <div class="d-flex flex-column h-100">
      <Header />
      <CreateBill />
      <Footer />
      </div>
    )
  }
}

export default CreateBill;
