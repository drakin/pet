package org.pet.model;

import java.io.Serializable;

public class PetRequestWrapper implements Serializable {

    private Pet data;

    public Pet getData() {
        return data;
    }

    public void setData(Pet data) {
        this.data = data;
    }

}
