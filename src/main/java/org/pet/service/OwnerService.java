package org.pet.service;

import org.pet.dao.OwnerDAO;
import org.pet.model.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OwnerService {

    private OwnerDAO ownerDAO;

    @Transactional(readOnly = true)
    public Owner getPetById(Integer id) {
        return ownerDAO.selectOwner(id);
    }

    @Autowired
    public void setPetDAO(OwnerDAO ownerDAO) {
        this.ownerDAO = ownerDAO;
    }

}
