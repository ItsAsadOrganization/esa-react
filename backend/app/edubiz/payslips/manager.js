const { SUCCESS } = require("../../common/exceptions");
const SalarTaxFetchService = require("../../services/salaryTaxFetch");
const SalaryRepository = require("../salaries/Repository")
const numberToWords = require('number-to-words');
const Repository = require("./repository");
const TutorsRepository = require("../tutors/repository");


const MONTHS = [
    { index: 1, name: "JANUARY" },
    { index: 2, name: "FEBRUARY" },
    { index: 3, name: "MARCH" },
    { index: 4, name: "APRIL" },
    { index: 5, name: "MAY" },
    { index: 6, name: "JUNE" },
    { index: 7, name: "JULY" },
    { index: 8, name: "AUGUST" },
    { index: 9, name: "SEPTEMBER" },
    { index: 10, name: "OCTOBER" },
    { index: 11, name: "NOVEMBER" },
    { index: 12, name: "DECEMBER" },
]

class Manager {

    static async generatePaySlips(next) {
        try {
            const salaries = await SalaryRepository.getSalaries()

            for (const element of salaries) {
                let increment = (element.salary.payments.increment / 100) * element.salary.payments.basic_salary
                let incrementedSalary = element.salary.payments.basic_salary + increment

                let grossSalary = incrementedSalary +
                    element.salary.payments.home_allowence +
                    element.salary.payments.utility_allowence +
                    element.salary.payments.bonus +
                    element.salary.payments.encashment

                let tax = await SalarTaxFetchService.getTaxRateFromFBR(grossSalary)
                let total_deductions = parseFloat(tax.monthly.tax.replace(/,/g, "")) + element.salary.deductions.late_arrivals + element.salary.deductions.unpaid_leaves

                // console.log("\n\n\n", { increment, incrementedSalary, grossSalary, tax })
                element.salary.deductions.icome_tax = parseFloat(tax.monthly.tax.replace(/,/g, ""));
                element.salary.payments["gross_salary"] = grossSalary

                element.salary["total_payment"] = grossSalary
                element.salary["total_deductions"] = total_deductions
                element.salary["net_income"] = grossSalary - total_deductions

                const payslip = {
                    tutorId: element.tutorId,
                    config: element.salary
                }

                await Repository.insertPaySlip(payslip)

            }

            throw new SUCCESS({ message: "PaySlips Created" })
        } catch (err) {
            next(err)
            console.log("\n\n\n", { err })
        }
    }

    static async getPaySlips(next) {
        try {
            const payslips = await Repository.getPaySlips()
            if (!payslips) {
                throw new SUCCESS({ payslips: [] })
            } else {
                const tutors = await TutorsRepository.getAllTutors(false)
                for (const payslip of payslips) {
                    const tutor_name = tutors.find(t => t.id === payslip.tutorId).name
                    const date = new Date(payslip.createdAt).getMonth() + 1
                    const year = new Date(payslip.createdAt).getFullYear()
                    payslip.dataValues["tutor_name"] = tutor_name
                    payslip.dataValues["month"] = MONTHS.find(m => m.index === date).name + " " + year
                }
                throw new SUCCESS({ payslips })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = Manager