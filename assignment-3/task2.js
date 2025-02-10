function getTopPerformers(employees, criteria) {
    if (!employees)
        return []
    
    return employees
        .filter(employee =>
            employee.department === criteria.department &&
            employee.performanceRating >= criteria.minPerformance &&
            employee.yearsOfExperience >= criteria.minExperience &&
            employee.salary < criteria.maxSalary
        )
        .sort((a, b) => {
            if (b.performanceRating !== a.performanceRating) {
                return b.performanceRating - a.performanceRating;
            }
            return a.salary - b.salary;
        });
}

const employees = [
    { id: 1, name: "Alice", department: "IT", salary: 76000, yearsOfExperience: 5, performanceRating: 67 },
    { id: 2, name: "Bob", department: "IT", salary: 76000, yearsOfExperience: 4, performanceRating: 79 },
    { id: 3, name: "Charlie", department: "HR", salary: 75000, yearsOfExperience: 6, performanceRating: 87 },
    { id: 4, name: "Kim", department: "Sales", salary: 45000, yearsOfExperience: 4, performanceRating: 71 },
    { id: 5, name: "Mike", department: "HR", salary: 76000, yearsOfExperience: 2, performanceRating: 87 },
    { id: 6, name: "Jesse", department: "Sales", salary: 96000, yearsOfExperience: 8, performanceRating: 94 },
    { id: 7, name: "Sally", department: "IT", salary: 76000, yearsOfExperience: 7, performanceRating: 68 },
    { id: 8, name: "Jeremy", department: "Design", salary: 68000, yearsOfExperience: 5, performanceRating: 82 },
    { id: 9, name: "Sydney", department: "HR", salary: 56000, yearsOfExperience: 4, performanceRating: 94 },
    { id: 10, name: "Connor", department: "Sales", salary: 45000, yearsOfExperience: 8, performanceRating: 60 },
    { id: 11, name: "Tyson", department: "IT", salary: 76000, yearsOfExperience: 12, performanceRating: 86 },
    { id: 12, name: "Kendrick", department: "Design", salary: 86000, yearsOfExperience: 10, performanceRating: 82 },
    { id: 13, name: "Ken", department: "Design", salary: 76000, yearsOfExperience: 4, performanceRating: 82 },
    { id: 14, name: "Eve", department: "Sales", salary: 56000, yearsOfExperience: 2, performanceRating: 54 }
];

// Test Case 1: Basic criteria matching multiple employees 
const criteria1 = {
    department: "Sales",
    minPerformance: 60,
    minExperience: 2,
    maxSalary: 90000
};
console.log(getTopPerformers(employees, criteria1));


// Test Case 2: No matching employees for criteria 
const criteria2 = {
    department: "Finance",
    minPerformance: 85,
    minExperience: 4,
    maxSalary: 80000
};
console.log(getTopPerformers(employees, criteria2));


// Test Case 3: All employees of a department match the criteria 
const criteria3 = {
    department: "IT",
    minPerformance: 0,
    minExperience: 0,
    maxSalary: 100000
};
console.log(getTopPerformers(employees, criteria3));


// Test Case 4: Employees with equal performance rating
const criteria4 = {
    department: "Design",
    minPerformance: 80,
    minExperience: 3,
    maxSalary: 90000
};
console.log(getTopPerformers(employees, criteria4));


// Test Case 5: Employees with equal salary
const criteria5 = {
    department: "IT",
    minPerformance: 0,
    minExperience: 0,
    maxSalary: 100000
};
console.log(getTopPerformers(employees, criteria5));


// Test Case 6: No criteria given
const criteria6 = {};
console.log(getTopPerformers(employees, criteria6));


// Test Case 7: No employee or criteria given
const noEmployees = []

const criteria7 = {};
console.log(getTopPerformers(noEmployees, criteria7));


// Test Case 8: Null
const criteria8 = null;
const nullEmployees = null;
console.log(getTopPerformers(nullEmployees, criteria8));


// Test Case 9: Undefined
const criteria9 = undefined;
const undefinedEmployees = undefined;
console.log(getTopPerformers(criteria9, undefinedEmployees));