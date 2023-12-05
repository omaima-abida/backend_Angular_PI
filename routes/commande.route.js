const express = require('express');
const router = express.Router();
const Commande = require('../models/commande');

// Créer une nouvelle commande
router.post('/', async (req, res) => {
  const nouvelleCommande = new Commande(req.body);
  try {
    const response = await nouvelleCommande.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Afficher la liste des commandes
router.get('/', async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json(commandes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Afficher les détails d'une commande par numero_commande
router.get('/:numero_commande', async (req, res) => {
  try {
    const commande = await Commande.findOne({ numero_commande: req.params.numero_commande });
    res.status(200).json(commande);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Mettre à jour les informations d'une commande par numero_commande
router.put('/:numero_commande', async (req, res) => {
  try {
    const commande = await Commande.findOneAndUpdate(
      { numero_commande: req.params.numero_commande },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer une commande par numero_commande
router.delete('/:numero_commande', async (req, res) => {
  try {
    await Commande.findOneAndDelete({ numero_commande: req.params.numero_commande });
    res.status(200).json({ message: 'Commande supprimée avec succès.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
