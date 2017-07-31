package org.pet.dao;

import org.pet.model.Pet;

import java.util.List;

public interface PetDAO {

    Pet selectPet(int id);

    List<Pet> getAllPets();

    int addPet(Pet pet);

    void updatePet(Pet pet);

    void deletePet(Integer id);
}
