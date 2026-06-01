package com.ipearrow.aem.core.models;

import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;

@Model(
    adaptables = { SlingHttpServletRequest.class, Resource.class },
    defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL
)
public class TenantHelper {

    @SlingObject
    private SlingHttpServletRequest request;

    public String getBrand() {
        String serverName = request != null ? request.getServerName() : "arrow.com";

        if (serverName.contains("ip.arrow.com")) {
            return "ipe";
        } else if (serverName.contains("medical.com")) {
            return "medical";
        } else {
            return "arrow";
        }
    }

    public String getClientlibName() {
        return "clientlib-" + getBrand();
    }

    public String getReactClientlibCategory() {
        return "ipe-arrow.react." + getBrand();
    }
}
