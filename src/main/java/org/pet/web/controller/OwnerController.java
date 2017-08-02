package org.pet.web.controller;

import org.pet.model.Owner;
import org.pet.service.OwnerService;
import org.pet.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;
import java.util.Map;

@Controller
@RequestMapping("owners")
public class OwnerController {

    private OwnerService ownerService;

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, ?> viewOne(@PathVariable("id") Integer id) throws Exception {
        try {
            Owner owner = ownerService.getPetById(id);
            return Util.getMap(Collections.singletonList(owner));
        } catch (Exception e) {
            return Util.getModelMapError("Error retrieving Owners from database.");
        }
    }

    @Autowired
    public void setOwnerService(OwnerService ownerService) {
        this.ownerService = ownerService;
    }

}
