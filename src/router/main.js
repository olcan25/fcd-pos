import homeViews from './modules/home-router'
import companyViews from './modules/company-router'
import partnerViews from './modules/partner-router'
import productViews from './modules/product-router'
import saleViews from './modules/sale-router'
import userViews from './modules/user-router'

export const routes = [
  ...homeViews,
  ...companyViews,
  ...partnerViews,
  ...productViews,
  ...saleViews,
  ...userViews
]
