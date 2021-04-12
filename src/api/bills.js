export const getBills = async () => {
    let response = await fetch('http://localhost:3001/fiches/all', {
        method: 'GET',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        }
    })
    let bills = await response.json()
    return bills
}
export const postBills = async () => {
let response =await fetch('http://localhost:3001/fiches/idFraisForfait', {
    method: 'POST',
    headers: {
    }
    })
    let bills = await response.json()
    return bills
}


export const postBillsHF = async (billHF) => {
    let response = await fetch('http://localhost:3001/fiches/lignefraishorsforfait/new', {
        method: 'POST',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(billHF)
    })
    let billhf = await response.json()
    return billhf
}

/* 
export const getUsers() => {
    let response = fetch('http://localhost:3001/users', {
        method: 'GET',
        headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
        }
    })
    let users = response.json()
}*/
