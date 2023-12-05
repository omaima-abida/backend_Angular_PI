const  mongoose  =require("mongoose")
// const Fournisseur =require("./fournisseur.js");

const fournisseurSchema=mongoose.Schema({

    id_frs:{ type: String, required: true,unique:true },
    raison_sociale:{ type: String, required: true,unique:true },
    adresse:{ type: String, required: true,unique:true },
    telephone : { type: String, required: true,unique:true },
    })
    module.exports=mongoose.model('fournisseur',fournisseurSchema)