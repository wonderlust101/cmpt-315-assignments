function analyzeStudentPerformance(students) {
    if (!students)
        return {}
    
    const allScores = students
        .map(({ scores }) => scores)
        .reduce((scores, studentScores) => scores.concat(studentScores), []);
    
    if (allScores.length === 0 ) {
        return {
            highestScore: 0,
            lowestScore: 0,
            overallAverage: 0,
            studentAverages: 0
        }
    } 
    
    const highestScore = allScores.reduce((max, score) => (score > max ? score : max), allScores[0]);
    const lowestScore = allScores.reduce((min, score) => (score < min ? score : min), allScores[0]);

    const overallAverage = Math.round(allScores.reduce((sum, score) => sum + score, 0) / allScores.length);
    
    const studentAverages = students
        .map(({ name, scores }) => ({
            name, 
            average: scores > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0
        }))
        .sort((a, b) => b.average - a.average);

    return {
        highestScore,
        lowestScore,
        overallAverage,
        studentAverages
    };
}

// Test Case 1: Basic list of students
const students1 = [
    { name: "Alice", scores: [85, 92, 78] },
    { name: "Bob", scores: [80, 84, 76] },
    { name: "Charlie", scores: [95, 90, 88] }
];
console.log(analyzeStudentPerformance(students1));


// Test Case 2: Single Student
const students2 = [
    { name: "Kim", scores: [85, 92, 78] },
];
console.log(analyzeStudentPerformance(students2));


// Test Case 3: Student with no score
const students3 = [
    { name: "Ken", scores: [] },
    { name: "Abel", scores: [50, 60, 70] }
];
console.log(analyzeStudentPerformance(students3));

// Test Case 4: Student with same score
const students4 = [
    { name: "Grace", scores: [75, 75, 75] },
    { name: "Hank", scores: [75, 75, 75] }
];
console.log(analyzeStudentPerformance(students4));

// Test Case 5: No students
const students5 = [];
console.log(analyzeStudentPerformance(students5));


// Test Case 7: Null
const nullStudents = null;
console.log(analyzeStudentPerformance(nullStudents));


// Test Case 8: Undefined
const undefinedStudents = undefined;
console.log(analyzeStudentPerformance(undefinedStudents));