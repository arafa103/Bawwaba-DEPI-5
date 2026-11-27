const gradePoints = {
    A: 4.0,
    B: 3.0,
    C: 2.0,
    D: 1.0,
    F: 0.0
};

export function calculateQualityPoints (credits , grade){
    if (typeof(grade) !== "string"){
        throw new Error("Grade Must be String!");
    }

    if (!Number.isFinite(credits) || credits <= 0) {
    throw new Error("Credits must be a positive number!");
}

    grade = grade.trim().toUpperCase();

    if (gradePoints[grade] === undefined){
        throw new Error("You entered invalid grade!");
    }


    return credits * gradePoints[grade];
    
}




export function calculateTermGpa(results, term){
    const termResults = results.filter(result => result.term === term)

    const totalTermQualityPoints = termResults.reduce(
    (acc, course) => acc + calculateQualityPoints(course.credits, course.grade),
    0
);

    const totalTermCredits = termResults.reduce((acc, course) => acc + course.credits ,0 )

    if (totalTermCredits === 0) return 0;

    return totalTermQualityPoints / totalTermCredits ; 

}



export function calculateCumulativeGpa(results) {
    const totalQualityPoints = results.reduce((acc,course)=>acc + calculateQualityPoints(course.credits,course.grade) ,0)
    const totalCredits = results.reduce((acc,course)=>acc + course.credits ,0)
    if (totalCredits === 0) return 0;
    return totalQualityPoints / totalCredits

}