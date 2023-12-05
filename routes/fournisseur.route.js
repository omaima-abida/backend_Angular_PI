const express = require('express');
const router = express.Router();
const Fournisseur = require('../models/fournisseur');

// Créer un nouveau fournisseur
router.post('/', async (req, res) => {
  const nouveauFournisseur = new Fournisseur(req.body);
  try {
    const response = await nouveauFournisseur.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Afficher la liste des fournisseurs
router.get('/', async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.status(200).json(fournisseurs);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Afficher les détails d'un fournisseur par id_frs
router.get('/:id_frs', async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOne({ id_frs: req.params.id_frs });
    res.status(200).json(fournisseur);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Mettre à jour les informations d'un fournisseur par id_frs
router.put('/:id_frs', async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findOneAndUpdate(
      { id_frs: req.params.id_frs },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(fournisseur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un fournisseur par id_frs
router.delete('/:id_frs', async (req, res) => {
  try {
    await Fournisseur.findOneAndDelete({ id_frs: req.params.id_frs });
    res.status(200).json({ message: 'Fournisseur supprimé avec succès.' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
