const axios = require('axios')
const FormData = require('form-data')
class SalarTaxFetchService {
    static async getTaxRateFromFBR(salaryAmount) {
        try {
            const postData = new FormData()
            postData.append("action", "calculate")
            postData.append("income", salaryAmount)
            postData.append("incomeType", "Monthly")

            const salary = await axios.post('https://taxcalculatorpakistan.com/wp-admin/admin-ajax.php', postData)
            return salary.data.calculation

        } catch (err) {
            // next(err)
        }
    }
}

module.exports = SalarTaxFetchService