import { getAllInterviewReports, generateInterviewReport, getInterviewReportById, generateResumePdf } from "../services/interview.api"
import { useContext, useEffect } from "react"
import { InterviewContext } from "../interview.context"
import { useParams } from "react-router-dom"

export const useInterview = () => {

    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const { loading, setLoading, report, setReport, reports, setReports } = context

    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setLoading(true)
        try {
            const response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setReport(response.interviewReport)
            return response.interviewReport
        } catch (error) {
            console.log(error)
            throw error // Re-throw so caller can handle it
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        let response = null
        try {
            response = await getInterviewReportById(interviewId)
            setReport(response.interviewReport)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
        return response.interviewReport
    }

    const getReports = async () => {
        setLoading(true)
        let response = null
        try {
            response = await getAllInterviewReports()
            setReports(response.interviewReports || [])
        } catch (error) {
            console.error("Error fetching reports:", error)
            setReports([]) // Set empty array on error
        } finally {
            setLoading(false)
        }

        return response?.interviewReports || []
    }

    const getResumePdf = async (interviewReportId) => {
        setLoading(true)
        try {
            console.log("Downloading resume for report:", interviewReportId)
            const response = await generateResumePdf({ interviewReportId })
            console.log("Resume PDF response received, size:", response?.byteLength || "unknown")

            if (!response || response.byteLength === 0) {
                throw new Error("Empty PDF response")
            }

            const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `tailored_resume_${interviewReportId}.pdf`)
            document.body.appendChild(link)
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)

            console.log("Resume PDF download initiated")
        } catch (error) {
            console.error("Resume download error:", error)
            alert(`Failed to generate resume PDF: ${error.message}. Please try again.`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        // Safety check to avoid double fetching in strict mode or re-renders
        if (interviewId) {
            if (!report || report._id !== interviewId) {
                getReportById(interviewId)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getReports, getResumePdf }

}   