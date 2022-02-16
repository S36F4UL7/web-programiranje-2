const req = require('express/lib/request')
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var SerieSchema = new Schema({
    title: {type: String, required: true},
    year: {type: Number, required: false},
    season: {type: Number, required: true},
    episode: {type: String, required: true},
    creatorId: {type: String, required: true}
})

var SerieModel = mongoose.model('serie', SerieSchema)

SerieModel.sacuvaj = function sacuvaj(reqSerie)
{
    var serie = new SerieModel({
        title: reqSerie.title,
        year: reqSerie.year,
        season: reqSerie.season,
        episode: reqSerie.episode,
        creatorId: reqSerie.creatorId
    })

    serie.save((err)=>{
        if (err)
            console.log(err.stack)
    })

    return serie
}


module.exports = SerieModel