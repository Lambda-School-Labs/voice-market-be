const express = require('express');
const router = express.Router();

const TalentProfiles = require('./talentProfileModel.js');

// /api/talents endpoint

// FIXME: Add auth for all endpoints and verify user is the owner

// Insert talent profile into db
router.post('/', async ( req, res ) => {
    const profileData = req.body;
    
    try {
        await TalentProfiles.addTalentProfile(profileData);
        res.status(201).json({message: "Added talent profile."})
    }
    catch(error) {
        res.status(500).json({message: "Could not add talent profile", error: error})
    }
})

// Update existing talent profile
router.put('/:id', async ( req, res ) => {
    const profileData = req.body;
    const { id } = req.params;

    try {
        const updatedData = await TalentProfiles.updateTalentProfile(id, profileData);
        res.status(201).json(updatedData)
    }
    catch(error) {
        res.status(500).json({message: "Talent profile could not be updated", error: error})
    }
})

// Remove talent profile
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
      const deletedProfile = await TalentProfiles.deleteTalentProfile(id);
  
      if (deletedProfile) {
        res.status(201).json(deletedProfile);
      }
      else {
        res.status(404).json({ message: 'Could not delete talent profile.' });
      }
    }
    
    catch (error) {
      res.status(500).json({ message: 'Could not delete talent profile.', error: error });
    }
});

// Get all talent profiles
router.get('/', async (req, res) => {
  try {
    const talentProfiles = await TalentProfiles.getTalentProfiles();
    res.json(talentProfiles);
  }
  catch (err) {
    res.status(500).json({ message: 'Could not find talent profiles' });
  }
});

// Get talent profile by user id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const selectedTalentProfile = await TalentProfiles.getTalentProfileByUserId(id);

    if (selectedTalentProfile) {
      res.json(selectedTalentProfile);
    } else {
      res.status(404).json({ message: 'Could not find talent profile.' })
    }
  } catch (err) {
    res.status(500).json({ message: 'Could not find talent profile.' });
  }
});

module.exports = router;