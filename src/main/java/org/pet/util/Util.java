package org.pet.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Util {

    public static Map<String, Object> getMap(List<?> objects) {

        Map<String, Object> modelMap = new HashMap<String, Object>(3);
        modelMap.put("total", objects.size());
        modelMap.put("data", objects);
        modelMap.put("success", true);

        return modelMap;
    }

    public static Map<String, Object> getModelMapError(String msg) {

        Map<String, Object> modelMap = new HashMap<String, Object>(2);
        modelMap.put("message", msg);
        modelMap.put("success", false);

        return modelMap;
    }

}
