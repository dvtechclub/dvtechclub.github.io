const assessmentWeight = document.getElementById("aWeight");
const courseworkWeight = document.getElementById("cWeight");
const gradeTable = document.getElementById("gradeTable");
const gradeTemplate = document.getElementById("row");
let round = true;

document.getElementById("calcbtn").addEventListener("click", calc);
document.getElementById("addRow").addEventListener("click", addGrade);
document.getElementById("copypaste").addEventListener("click", copyPaste);
document.getElementById("reset").addEventListener("click", resetGrade);
document.getElementById("round").addEventListener("change", checkRound);

function calc(){
    
   let assessCount = 0
   let courseCount = 0;
   
   let gradeAssess = [];
   let finalAssess = [];
   
   let gradeCourse = [];
   let finalCourse = [];
   
   const grades = document.querySelectorAll(".calc");
   
   for(let i = 0; i < grades.length; i++)
   {
       let num = grades[i].querySelector(".value").value
       let val = grades[i].querySelector(".weight").value;

       const {numerator, denominator} = fractionCheck(num);
       
       const numTotal = numerator
       const denTotal = denominator
       console.log(val);
       console.log(num);
       if(num != "")
       {
           if(val == "Assessment")
           {
               assessCount +=1;
               gradeAssess.push(numTotal);
               finalAssess.push(denTotal);
           }
           else
           {
               courseCount +=1;
               gradeCourse.push(numTotal);
               finalCourse.push(denTotal);
           }
        
       }
       
       
   }
   
   let weightCourse = courseworkWeight.value;
   let weightAssess = assessmentWeight.value;
   
   let numAssess;
   let denAssess;
   let numCourse;
   let denCourse;
   
   if(assessCount > 0)
   {
       numAssess = gradeAssess.reduce(calcGrades);
       denAssess = finalAssess.reduce(calcGrades);
   }
   else
   {
       weightAssess = 0;
       weightCourse = 100;
       numAssess = 1;
       denAssess = 1;
   }
   if(courseCount > 0)
   {
       numCourse = gradeCourse.reduce(calcGrades);
       denCourse = finalCourse.reduce(calcGrades);
   }
   else
   {
       weightAssess = 100;
       weightCourse = 0;
       numCourse = 1;
       denCourse = 1;
   }
   
       
   const total = ((numCourse/denCourse) * 100) * (weightCourse/100)
   const total2 = ((numAssess/denAssess) * 100) * (weightAssess/100)
 
   
   let lastTotal = (total + total2)
   
   if(round == true)
   {
       lastTotal = Math.round(lastTotal);
   }
   
   const display = lastTotal + "%";
   
   document.getElementById("grade").innerHTML = display;
  
}


function calcGrades(x, y){
    return x + y
}

function fractionCheck(num){
    const findSlash = num.indexOf("/");
    const numerator = Number(num.substring(0,findSlash));
    const denominator = Number(num.substring(findSlash + 1, num.length));
    
    return { numerator, denominator } 
    
}

function copyPaste(){
    let weight = [];
    let grade = [];
    let name = [];
    
    let school = document.getElementById("school").value;
    while(school != ""){
        const findWeight = school.substring(11, 21)
        const findName = school.substring(22, school.indexOf("collected"));
        
        const view = school.indexOf("View");
        const newSchool = school.substring(view - 25, view);
        
        const {numOne, numTwo} = findFraction(newSchool);
        
        if(numOne == undefined || school[11] == "P")
        {
               
        }
        else
        {
            const fraction = numOne + "/" + numTwo;
            grade.push(fraction);
            weight.push(findWeight);
            name.push(findName);
        }
        
        school = school.substring(view + 5, school.length);
    }
    
    addGrade(grade, weight, name);
}

function addGrade(points, type, name){
    if(Array.isArray(points) == false && Array.isArray(type) == false){
        const clone = gradeTemplate.content.cloneNode(true);
        gradeTable.appendChild(clone);
    }
    else
    {
        const length = points.length;
        for(let i = 0; i < length; i++){
            
            const clone = gradeTemplate.content.cloneNode(true);
            const cloneGrade = clone.querySelector(".value");
            const cloneWeight = clone.querySelector(".weight");
            const cloneName = clone.querySelector(".name");
            
            cloneGrade.value = points[i];
            cloneWeight.value = type[i];
            cloneName.value = name[i];
            
            gradeTable.appendChild(clone);
        }
        
    }
    
}

function findFraction(text){
    console.log(text);
    const containsWhitespace = (str) => /\s/.test(str);
    let firstNum = "";
    let secondNum = "";
    
    let thirdNum = "";
    let fourthNum = "";
    
    let numTwo;
    let numOne;
    const slash = text.indexOf("/");
    
    if(text.indexOf("--") != -1)
    {
        return({undefined, undefined})
    }
    else
    {
        for(let i = 0; i < text.length; i++)
        {
            if(Number.isFinite(Number(text[i])) && firstNum == "" && containsWhitespace(text[i]) != true)
            {
                if(i == slash - 1)
                {
                    secondNum = i;
                }
                firstNum = i;
            }
            else if(Number.isFinite(Number(text[i])) && secondNum == "")
            {
                if(i == slash - 1)
                {
                    secondNum = i;
                }
            }
        }
        for(let i = slash; i < text.length; i++)
        {
            if(Number.isFinite(Number(text[i])) && thirdNum == "")
            {
                if(containsWhitespace(text[i + 1]))
                {
                    fourthNum = i;
                }
                thirdNum = i;
            }
            else if(Number.isFinite(Number(text[i + 1])) && fourthNum == "")
            {
                
                if(containsWhitespace(text[i + 1]))
                {
                    fourthNum = i;
                }
            }
        }
       
        numOne = text.substring(firstNum, secondNum + 1);
        numTwo = text.substring(thirdNum, fourthNum + 1);
        return {numOne, numTwo};
    }
}

function resetGrade(){
    const grades = document.querySelectorAll(".calc");
    document.getElementById("grade").innerHTML = "0";
   
    for(let i = 0; i < grades.length; i++)
    {
        let num = grades[i].querySelector(".value");
        let val = grades[i].querySelector(".weight");
        let nam = grades[i].querySelector(".name");
        
        num.value= null;
        val.value = "Assessment";
        nam.value = null;
   }
   
   for(let i = 0; i < grades.length - 2; i++)
   {
       grades[i].remove();
   }
    
}

function checkRound()
{
    const roundBox = document.getElementById("round");
    if(roundBox.checked == true)
    {
        round = true;
    }
    else
    {
        round = false;
    }
}