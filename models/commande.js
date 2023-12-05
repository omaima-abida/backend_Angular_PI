const  mongoose  =require("mongoose")
const Fournisseur =require("./fournisseur.js");
const commandeSchema=mongoose.Schema({

    numero_commande:{ type: String, required: true,unique:true },
    date_commande:{ type: Date, required: true },
    id_frs:{ type: String, required: true,unique:true },

    })
    module.exports=mongoose.model('commande',commandeSchema)