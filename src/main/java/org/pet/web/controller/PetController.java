package org.pet.web.controller;

import org.pet.model.Pet;
import org.pet.model.PetRequestWrapper;
import org.pet.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("pets")
public class PetController {

    private PetService petService;

    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    public Map<String, ?> view() throws Exception {
        try {
            List<Pet> pets = petService.getAllPets();
            return getMap(pets);
        } catch (Exception e) {
            return getModelMapError("Error retrieving Pets from database.");
        }
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, ?> viewOne(@PathVariable("id") Integer id) throws Exception {
        try {
            Pet pet = petService.getPetById(id);
            return getMap(Collections.singletonList(pet));
        } catch (Exception e) {
            return getModelMapError("Error retrieving Pets from database.");
        }
    }

    @RequestMapping(method = RequestMethod.POST)
    @ResponseBody
    public Map<String, ?> create(@RequestBody PetRequestWrapper data) throws Exception {

        try {
            petService.addPet(data.getData());
            return getMap(Collections.singletonList(data.getData()));
        } catch (Exception e) {
            return getModelMapError("Error while creating pet.");
        }
    }

    @RequestMapping(value = "{id}", method = RequestMethod.PUT)
    @ResponseBody
    public Map<String, ?> update(@PathVariable("id") Integer id, @RequestBody PetRequestWrapper data) throws Exception {
        try {
            data.getData().setId(id);
            petService.updatePet(data.getData());
            return getMap(Collections.singletonList(data.getData()));

        } catch (Exception e) {

            return getModelMapError("Error while updating pet.");
        }
    }

    @RequestMapping(value = "{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Map<String, ?> delete(@PathVariable("id") Integer id) throws Exception {
        try {
            petService.deletePet(id);
            Map<String, Object> modelMap = new HashMap<String, Object>(3);
            modelMap.put("success", true);
            return modelMap;
        } catch (Exception e) {
            return getModelMapError("Error deleting pet.");
        }
    }

    private Map<String, Object> getMap(List<Pet> pets) {

        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        modelMap.put("total", pets.size());
        modelMap.put("data", pets);
        modelMap.put("success", true);

        return modelMap;
    }

    private Map<String, Object> getModelMapError(String msg) {

        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("message", msg);
        modelMap.put("success", false);

        return modelMap;
    }

    @Autowired
    public void setPetService(PetService petService) {
        this.petService = petService;
    }

}
