const pdfParse = require("pdf-parse");
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")




/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    console.log("🔥 CONTROLLER HIT");

    try {
        console.log("Uploaded file:", req.file?.originalname);

        let resumeText = "";

        if (req.file && req.file.buffer) {
            try {
                const data = await pdfParse(req.file.buffer);
                resumeText = data.text || "";

                console.log("========== DEBUG ==========");
                console.log("FILE NAME:", req.file?.originalname);
                console.log("RESUME LENGTH:", resumeText.length);
                console.log("RESUME PREVIEW:", resumeText.slice(0, 300));
                console.log("===========================");
            } catch (pdfError) {
                console.error("PDF parsing error:", pdfError);
                resumeText = "";
            }
        }

        const { selfDescription, jobDescription } = req.body;
        const title = req.body.title || "Interview Report";

        const effectiveResume =
            resumeText && resumeText.trim().length > 0
                ? resumeText
                : selfDescription || "No resume provided";

        console.log("Sending to AI:");
        console.log("Resume length:", effectiveResume.length);
        console.log("Job desc length:", jobDescription?.length);
        console.log("Self desc length:", selfDescription?.length);

        const interViewReportByAi = await generateInterviewReport({
            resume: effectiveResume,
            title,
            selfDescription,
            jobDescription
        });

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            title,
            resume: resumeText,
            selfDescription,
            jobDescription,
            ...interViewReportByAi
        });

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        });

    } catch (error) {
        console.error("Error in generateInterViewReportController:", error);

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message
        });
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewReportId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    try {
        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=tailored_resume_${interviewReportId}.pdf`
        })

        res.send(pdfBuffer)
    } catch (error) {
        console.error("Resume PDF generation error:", error)
        res.status(500).json({
            message: "Failed to generate resume PDF",
            error: error.message
        })
    }
}

module.exports = { generateInterViewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generateResumePdfController }