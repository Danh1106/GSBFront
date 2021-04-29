import React from 'react'
import '../App.css';
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Footer2 from '../components/footer/Footer2'

class Accueil extends React.Component {

  constructor(props){
    super(props)
  }

  render () {
    return (
      <body class="d-flex flex-column h-100">
    <Footer2 />
      <Header />

      <Footer />
      

      </body>
    )
  }
}

export default Accueil;