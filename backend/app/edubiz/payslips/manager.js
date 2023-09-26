const { SUCCESS } = require("../../common/exceptions");
const SalarTaxFetchService = require("../../services/salaryTaxFetch");
const SalaryRepository = require("../salaries/Repository")
const numberToWords = require('number-to-words');
const Repository = require("./repository");
const TutorsRepository = require("../tutors/repository");
const DesignationReqpository = require("../designations/repository");


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

                let late_arrivals = ((element.salary.deductions.late_arrivals.days) / 2) * (incrementedSalary / 30)
                let unpaid_leaves = element.salary.deductions.unpaid_leaves.days * (incrementedSalary / 30)
                element.salary.deductions.late_arrivals.amount = late_arrivals
                element.salary.deductions.unpaid_leaves.amount = unpaid_leaves
                let tax = await SalarTaxFetchService.getTaxRateFromFBR(grossSalary)
                let total_deductions = parseFloat(tax.monthly.tax.replace(/,/g, "")) + element.salary.deductions.late_arrivals.amount + element.salary.deductions.unpaid_leaves.amount

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
        }
    }


    static async generatePaySlipsById(id, next) {
        try {
            await Repository.deleteSlip(id)
            // id is tutor id
            const tutSalary = await SalaryRepository.getSalaryByTutorId(id)
            let incrementedSalary = tutSalary.salary.payments.basic_salary
            let grossSalary = incrementedSalary +
                tutSalary.salary.payments.home_allowence +
                tutSalary.salary.payments.utility_allowence +
                tutSalary.salary.payments.bonus +
                tutSalary.salary.payments.encashment

            let late_arrivals = ((tutSalary.salary.deductions.late_arrivals.days) / 2) * (incrementedSalary / 30)
            let unpaid_leaves = tutSalary.salary.deductions.unpaid_leaves.days * (incrementedSalary / 30)
            tutSalary.salary.deductions.late_arrivals.amount = late_arrivals
            tutSalary.salary.deductions.unpaid_leaves.amount = unpaid_leaves
            let tax = await SalarTaxFetchService.getTaxRateFromFBR(grossSalary)
            let total_deductions = parseFloat(tax.monthly.tax.replace(/,/g, "")) + tutSalary.salary.deductions.late_arrivals.amount + tutSalary.salary.deductions.unpaid_leaves.amount

            tutSalary.salary.deductions.icome_tax = parseFloat(tax.monthly.tax.replace(/,/g, ""));
            tutSalary.salary.payments["gross_salary"] = grossSalary

            tutSalary.salary["total_payment"] = grossSalary
            tutSalary.salary["total_deductions"] = total_deductions
            tutSalary.salary["net_income"] = grossSalary - total_deductions

            const payslip = {
                tutorId: tutSalary.tutorId,
                config: tutSalary.salary
            }

            await Repository.insertPaySlip(payslip)


            throw new SUCCESS({ message: "PaySlips Created" })
        } catch (err) {
            next(err)
        }
    }

    static async getPaySlips(next) {
        try {
            const payslips = await Repository.getPaySlips()
            if (!payslips) {
                throw new SUCCESS({ payslips: [] })
            } else {
                const tutors = await TutorsRepository.getAllTutors(false)
                const designations = await DesignationReqpository.getAllDesignation()
                for (const payslip of payslips) {
                    const tutor_name = tutors.find(t => t.id === payslip.tutorId).name
                    const joining_date = tutors.find(t => t.id === payslip.tutorId).joining_date
                    const cnic = tutors.find(t => t.id === payslip.tutorId).cnic
                    const designationId = tutors.find(t => t.id === payslip.tutorId).designationId
                    const designation = designations.find(d => d.id === designationId).name
                    const date = new Date(payslip.createdAt).getMonth() + 1
                    const year = new Date(payslip.createdAt).getFullYear()
                    payslip.dataValues["tutor_name"] = tutor_name
                    payslip.dataValues["designation"] = designation
                    payslip.dataValues["joining_date"] = joining_date
                    payslip.dataValues["cnic"] = cnic
                    payslip.dataValues["month"] = MONTHS.find(m => m.index === date).name + " " + year
                }
                throw new SUCCESS({ payslips })
            }

        } catch (err) {
            next(err)
        }
    }


    static async updatePaySlip(id, payload, next) {
        try {
            const payslips = await Repository.updateSlip(id, payload)
            if (payslips) {
                throw new SUCCESS({ message: "PaySlip Updated" })
            }

        } catch (err) {
            next(err)
        }
    }

    static async getDateRange(next) {
        try {
            const payslips = await Repository.getDateRange()
            const max = payslips[0].max
            const date = new Date(max).getMonth() + 1
            const year = new Date(max).getFullYear()
            const min = payslips[0].min
            const date1 = new Date(min).getMonth() + 1
            const year1 = new Date(min).getFullYear()

            throw new SUCCESS({
                date_range: {
                    max: MONTHS.find(m => m.index === date).name + " " + year
                    , min: MONTHS.find(m => m.index === date1).name + " " + year1
                }
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Manager