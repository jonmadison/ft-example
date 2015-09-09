"use strict";

var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/flowerthing_dev';

exports.index = {
  json: function getJson(req,res) {
    pg.connect(conString,function(err,client,done){
      if(err) {
        return res.status(500).json({ error:err });
      }
      var plants = []

      var query = client.query('SELECT * from PLANTS order by name ASC limit 100');
      query.on('row', function(row) {
        plants.push(row);
      });

      query.on('end',function(){
        done(); //release to pool
        var results = { plants: plants };
        // console.log(results);
        return res.status(200).json(results);
      })
    })
  }
}