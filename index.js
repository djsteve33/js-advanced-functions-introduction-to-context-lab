// Your code here
let createEmployeeRecord = function(rec) {
    return {
        firstName: rec[0],
        familyName: rec[1],
        title: rec[2],
        payPerHour: rec[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRecData) {
    return employeeRecData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, thatDate) {
    let inEvent = employee.timeInEvents.find(function(e) {
        return e.date === thatDate
    })

    let outEvent = employee.timeOutEvents.find(function(e) {
        return e.date === thatDate
    })

    return (outEvent.hour - inEvent.hour) / 100
}

let wagesEarnedOnDate = function(employee, thatDate) {
    let baseWage = hoursWorkedOnDate(employee, thatDate)
    * employee.payPerHour
    return parseFloat(baseWage.toString())
}

let allWagesFor = function(employee) {
    let allowedDates = employee.timeInEvents.map(function(e) {
    return e.date
    })

    let payable = allowedDates.reduce(function(memo, a) {
        return memo + wagesEarnedOnDate(employee, a)
    }, 0)
    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec) {
        return rec.firstName === firstName
    })
}

let calculatePayroll = function(arrOfEmployeeRecords) {
    return arrOfEmployeeRecords.reduce(function(memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
}

