const express = require('express');
const router = express.Router();
const LigneDeCommande = require('../models/ligne_de_commande');

// Créer une nouvelle ligne de commande
router.post('/', async (req, res) => {
  const nouvelleLigneDeCommande = new LigneDeCommande(req.body);
  try {
    const response = await nouvelleLigneDeCommande.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Afficher la liste des lignes de commande
router.get('/', async (req, res) => {
  try {
    const lignesDeCommande = await LigneDeCommande.find();
    res.status(200).json(lignesDeCommande);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Afficher les détails d'une ligne de commande par numero_commande
router.get('/:numero_commande', async (req, res) => {
  try {
    const lignesDeCommande = await LigneDeCommande.find({ numero_commande: req.params.numero_commande });
    res.status(200).json(lignesDeCommande);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Mettre à jour les informations d'une ligne de commande par numero_commande et reference
router.put('/:numero_commande/:reference', async (req, res) => {
  try {
    const ligneDeCommande = await LigneDeCommande.findOneAndUpdate(
      { numero_commande: req.params.numero_commande, reference: req.params.reference },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(ligneDeCommande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer une ligne de commande par numero_commande et reference
router.delete('/:numero_commande/:reference', async (req, res) => {
  try {
    await LigneDeCommande.findOneAndDelete({ numero_commande: req.params.numero_commande, reference: req.params.reference });
    res.status(200).json({ message: 'Ligne de commande supprimée avec succès.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
