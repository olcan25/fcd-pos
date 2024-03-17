import companyViews from './modules/company-router'
import partnerViews from './modules/partner-router'
import productViews from './modules/product-router'
import saleViews from './modules/sale-router'
import userViews from './modules/user-router'
import reportViews from './modules/report-router'
import homeViews from './modules/home-router'

export const routes = [
  ...companyViews,
  ...partnerViews,
  ...productViews,
  ...saleViews,
  ...userViews,
  ...reportViews,
  ...homeViews
]
