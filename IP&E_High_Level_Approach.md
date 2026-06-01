# IP&E Multi-Tenant Frontend High-Level Approach

## 1. Overview
This document outlines the approach for implementing a multi-tenant frontend architecture with clientlib separation for Arrow.com, IP.arrow.com, and medical.com.

## 2. Architecture
- **Clientlib Separation**: Each tenant gets its own clientlib (`clientlib-arrow`, `clientlib-ipe`, `clientlib-medical`)
- **Tenant Detection**: Tenant is detected based on the request's server name (handled server-side in Sling Model)
- **Clientlib Inclusion**: Page component conditionally includes the appropriate tenant-specific clientlib

## 3. File Structure
```
ui.apps/src/main/content/jcr_root/apps/ipe-arrow/
├── clientlibs/
│   ├── clientlib-arrow/
│   │   └── .content.xml
│   ├── clientlib-ipe/
│   │   └── .content.xml
│   └── clientlib-medical/
│       └── .content.xml
└── components/
    └── page/
        ├── customheaderlibs.html
        └── customfooterlibs.html

core/src/main/java/com/ipearrow/aem/core/models/
└── TenantHelper.java
```

## 4. Clientlib Generation
The `clientlib.config.js` in `ui.frontend` is configured to generate all three tenant clientlibs during build time.

## 5. Tenant Helper Model
The `TenantHelper` Sling Model:
- Detects tenant from `request.getServerName()`
- Returns appropriate clientlib name
- Returns appropriate clientlib category

## 6. How It Works
1. Request comes in to AEM
2. `TenantHelper` model determines tenant from server name
3. Page component includes correct clientlib via `data-sly-call="${clientlib.css @ categories=tenantHelper.reactClientlibCategory}"`
4. Correct React bundle is loaded for the tenant

## 7. Technologies Used
- AEM (Adobe Experience Manager)
- HTL (HTML Template Language)
- Sling Models
- aem-clientlib-generator
