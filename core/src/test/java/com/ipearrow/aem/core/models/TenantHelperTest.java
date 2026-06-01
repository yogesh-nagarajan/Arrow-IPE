package com.ipearrow.aem.core.models;

import io.wcm.testing.mock.aem.junit5.AemContext;
import io.wcm.testing.mock.aem.junit5.AemContextExtension;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(AemContextExtension.class)
public class TenantHelperTest {

    private final AemContext context = new AemContext();

    @BeforeEach
    public void setUp() {
    }

    @Test
    public void testGetClientlibName_Arrow() {
        context.request().setServerName("arrow.com");
        TenantHelper tenantHelper = context.request().adaptTo(TenantHelper.class);
        assertNotNull(tenantHelper);
        assertEquals("clientlib-arrow", tenantHelper.getClientlibName());
    }

    @Test
    public void testGetClientlibName_Ipe() {
        context.request().setServerName("ip.arrow.com");
        TenantHelper tenantHelper = context.request().adaptTo(TenantHelper.class);
        assertNotNull(tenantHelper);
        assertEquals("clientlib-ipe", tenantHelper.getClientlibName());
    }

    @Test
    public void testGetClientlibName_Medical() {
        context.request().setServerName("medical.com");
        TenantHelper tenantHelper = context.request().adaptTo(TenantHelper.class);
        assertNotNull(tenantHelper);
        assertEquals("clientlib-medical", tenantHelper.getClientlibName());
    }

    @Test
    public void testGetReactClientlibCategory_Arrow() {
        context.request().setServerName("arrow.com");
        TenantHelper tenantHelper = context.request().adaptTo(TenantHelper.class);
        assertNotNull(tenantHelper);
        assertEquals("ipe-arrow.react.arrow", tenantHelper.getReactClientlibCategory());
    }

    @Test
    public void testGetReactClientlibCategory_Ipe() {
        context.request().setServerName("ip.arrow.com");
        TenantHelper tenantHelper = context.request().adaptTo(TenantHelper.class);
        assertNotNull(tenantHelper);
        assertEquals("ipe-arrow.react.ipe", tenantHelper.getReactClientlibCategory());
    }

    @Test
    public void testGetReactClientlibCategory_Medical() {
        context.request().setServerName("medical.com");
        TenantHelper tenantHelper = context.request().adaptTo(TenantHelper.class);
        assertNotNull(tenantHelper);
        assertEquals("ipe-arrow.react.medical", tenantHelper.getReactClientlibCategory());
    }
}
