const express = require('express');
const bodyParser = require('body-parser')
const port = 3005
const app = express()
app.use(bodyParser.json())

const trans = [
    {
        id: 0,
        type: "add",
        amount: 40,
        name: "Birthday Money"
    }, {
        id: 1,
        type: "sub",
        amount: 15,
        name: "Gas"
    },


]
let id = 2;
app.get('/api/transactions/', (req, res) => { res.status(200).send(trans) })


app.put('/api/transactions/:idToChange', (req, res) => {
    const { idToChange } = req.params;
    const { amount, name } = req.body;
    for (let i = 0; i < trans.length; i++) {
        console.log('looking for a match')

        if (trans[i].id === +idToChange) {
            console.log('found a match')
            if (req.body.amount) {
                trans[i].amount = amount
            } else if (req.body.name) { trans[i].name = name; }


        }
    }

    return res.status(200).send(trans);
})

app.post('/api/transactions/', (req, res) => {
    const { type, amount, name } = req.body
    let newTrans = {
        id: id += 1,
        type: type,
        amount: amount,
        name: name
    }
    trans.push(newTrans);
    res.status(200).send(trans)
})

app.delete('/api/transactions/:idToDelete', (req, res) => {
    const { idToDelete } = req.params;
    for (let i = 0; i < trans.length; i++) {

        if (trans[i].id === +idToDelete) {
            trans.splice(i, 1)

        }
    }
    res.status(200).send(trans)
})

app.listen(port, () => { console.log(`Releasing ${port} Dragons`) })

