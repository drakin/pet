package org.pet.service;

import org.pet.dao.PetDAO;
import org.pet.model.Pet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PetService {

    private PetDAO petDAO;

    @Transactional(readOnly = true)
    public Pet getPetById(Integer id) {
        return petDAO.selectPet(id);
    }

    @Transactional(readOnly = true)
    public List<Pet> getAllPets() {
        return petDAO.getAllPets();
    }

    @Transactional
    public void addPet(Pet pet) {
        petDAO.addPet(pet);
    }

    @Transactional
    public Pet updatePet(Pet pet) {
        petDAO.updatePet(pet);
        return petDAO.selectPet(pet.getId());
    }

    @Transactional
    public void deletePet(Integer id) {
        petDAO.deletePet(id);
    }

    @Autowired
    public void setPetDAO(PetDAO petDAO) {
        this.petDAO = petDAO;
    }
}
