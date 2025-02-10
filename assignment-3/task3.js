function regionalSalesSummary(salesRecords) {
    if (!salesRecords)
        return {}
    
    const summary = salesRecords.reduce((summary, record) => {
        const {region, salesPerson, salesAmount} = record;

        // Get each region unique summary
        if (!summary[region]) {
            summary[region] = {
                totalSales  : 0,
                averageSales: [],
                salesPeople : []
            };
        }

        summary[region].totalSales += salesAmount;
        
        summary[region].averageSales.push(salesAmount)

        if (!summary[region].salesPeople.includes(salesPerson))
            summary[region].salesPeople.push(salesPerson)

        return summary;
    }, {});
    
    // Calculate averageSales for each region
    for (let region in summary) {
        summary[region].averageSales = summary[region].totalSales / summary[region].averageSales.length;
    }

    return summary;
}

// Test Case 1: Multiple Record
const salesRecords = [
    {region: 'North', salesPerson: 'John', salesAmount: 5000, dateStyle: '2024-01-15'},
    {region: 'South', salesPerson: 'Alice', salesAmount: 7000, dateStyle: '2024-01-20'},
    {region: 'North', salesPerson: 'John', salesAmount: 3000, dateStyle: '2024-02-10'},
    {region: 'North', salesPerson: 'Doe', salesAmount: 4000, dateStyle: '2024-03-05'},
]
console.log(regionalSalesSummary(salesRecords))


// Test Case 2: Empty input
const salesRecords2 = [];
console.log(regionalSalesSummary(salesRecords2));


// Test Case 3: Single Record
const salesRecords3 = [
    {region: 'North', salesPerson: 'John', salesAmount: 5000, dateStyle: '2024-01-15'},
]
console.log(regionalSalesSummary(salesRecords3))


// Test Case 4: Same Sales Person
const salesRecords4 = [
    {region: 'North', salesPerson: 'John', salesAmount: 5000, dateStyle: '2024-01-15'},
    {region: 'North', salesPerson: 'John', salesAmount: 7000, dateStyle: '2024-02-20'},
]
console.log(regionalSalesSummary(salesRecords4))


// Test Case 4: Different Regions
const salesRecords5 = [
    {region: 'North', salesPerson: 'John', salesAmount: 5000, dateStyle: '2024-01-15'},
    {region: 'South', salesPerson: 'Smith', salesAmount: 1000, dateStyle: '2024-02-20'},
    {region: 'East', salesPerson: 'Sally', salesAmount: 2000, dateStyle: '2024-01-15'},
    {region: 'West', salesPerson: 'Mike', salesAmount: 8000, dateStyle: '2024-02-20'},
    {region: 'West', salesPerson: 'Kim', salesAmount: 12000, dateStyle: '2024-01-15'},
    {region: 'South', salesPerson: 'Mike', salesAmount: 2000, dateStyle: '2024-02-20'},
    {region: 'South', salesPerson: 'Kim', salesAmount: 4000, dateStyle: '2024-01-15'},
    {region: 'North', salesPerson: 'Smith', salesAmount: 5000, dateStyle: '2024-02-20'},
]
console.log(regionalSalesSummary(salesRecords5))

// Test Case 6: Empty array
const emptySalesRecords = [];
console.log(regionalSalesSummary(emptySalesRecords));


// Test Case 7: Null
const nullSalesRecords = null;
console.log(regionalSalesSummary(nullSalesRecords));


// Test Case 8: Undefined
const undefinedSalesRecords = undefined;
console.log(regionalSalesSummary(undefinedSalesRecords));