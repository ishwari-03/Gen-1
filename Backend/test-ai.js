const { generateInterviewReport } = require('./src/services/ai.service');

async function testAI() {
    try {
        const result = await generateInterviewReport({
            resume: "John Doe is a full-stack developer with 3 years of experience. He has worked with React, Node.js, Express, MongoDB, and JavaScript. He has built web applications and APIs.",
            selfDescription: "I am passionate about web development and enjoy solving complex problems. I have experience with modern JavaScript frameworks and enjoy learning new technologies.",
            jobDescription: "We are looking for a full-stack developer with experience in React, Node.js, and database management. The role involves building scalable web applications and working with REST APIs.",
            title: "Full Stack Developer"
        });

        console.log("Test Result:");
        console.log("Match Score:", result.matchScore);
        console.log("Technical Questions:", result.technicalQuestions.length);
        console.log("Behavioral Questions:", result.behavioralQuestions.length);
        console.log("Skill Gaps:", result.skillGaps.length);
        console.log("Preparation Plan:", result.preparationPlan.length);

    } catch (error) {
        console.error("Test failed:", error.message);
    }
}

testAI();