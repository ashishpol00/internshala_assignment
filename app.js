const axios = require('axios');
const express = require('express');
var bodyParser = require('body-parser');
const { Int32 } = require('mongodb');
const app = express();

var port = process.env.PORT || 3000;
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
    var config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-tpuka/endpoint/data/v1/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'E8IsW88uWUImdaX1GLgf1fNHqMx28BxCiWlYxB1UUFfVx5RwzQDhTKxMTjTrUQvY'
        },
        data: JSON.stringify({
            "collection": "train_source_and_destination",
            "database": "train_data",
            "dataSource": "Cluster0"
        })
    };
    axios(config).then((response) => {
        // console.log(JSON.stringify(response.data));
        res.render(__dirname + '/home.ejs', {
            train_data_documents_mongoDB: response.data.documents
        });
    }).catch((error) => {
        console.log(error);
    });
});

app.post('/', urlencodedParser, (req, res) => {
    // console.log(req.body);
    let config = {
        method: 'post',
        url: 'https://data.mongodb-api.com/app/data-tpuka/endpoint/data/v1/action/insertOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'E8IsW88uWUImdaX1GLgf1fNHqMx28BxCiWlYxB1UUFfVx5RwzQDhTKxMTjTrUQvY'
        },
        data: JSON.stringify({
            "collection": "train_source_and_destination",
            "database": "train_data",
            "dataSource": "Cluster0",
            "document": {
                "train_number": Int32(req.body.tno),
                "train_name": String(req.body.tname),
                "source_code": String(req.body.scode),
                "destination_code": String(req.body.dcode)
            }
        })
    };
    axios(config).then((response) => {
        // console.log(JSON.stringify(response.data));
        res.redirect('/');
    }).catch((error) => {
        // console.log(error);
    });
});

app.listen(port, () => {
    // console.log('running on: http://localhost:' + port + '/');
});