const  mongoose  =require("mongoose")
const Article =require("./article.js");

const ligne_de_commandeSchema=mongoose.Schema({

    
    numero_commande:{ type: String, required: true,unique:true },
    reference:{ type: String, required: true,unique:true },
    quantite:{ type: Number, required: false },


    })

    module.exports=mongoose.model('ligne_de_commandee',ligne_de_commandeSchema)