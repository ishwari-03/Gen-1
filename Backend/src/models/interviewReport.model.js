const mongoose= require('mongoose');

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: [ true, "Day is required" ]
    },
    focus: {
        type: String,
        required: [ true, "Focus is required" ]
    },
    tasks: [ {
        type: String,
        required: [ true, "Task is required" ]
    } ]
}, {
    _id: false
})

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [ true, "Job description is required" ]
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String,
    },
    title: {
        type: String,
        required: [ true, "Title is required" ]
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },
    technicalQuestions: [ {
        question: { type: String, required: [ true, 'Question text is required' ] },
        intention: { type: String, required: [ true, 'Intention is required' ] },
        answer: { type: String, required: [ true, 'Model answer is required' ] }
    } ],
    behavioralQuestions: [ {
        question: { type: String, required: [ true, 'Question text is required' ] },
        intention: { type: String, required: [ true, 'Intention is required' ] },
        answer: { type: String, required: [ true, 'Model answer is required' ] }
    } ],
    skillGaps: [ {
        type: String,
        required: true
    } ],
    preparationPlan: [ preparationPlanSchema ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})


const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;  