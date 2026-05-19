import React, { useState } from 'react';
import './ReportsLayout.css';

const reports = [
    { id: 1, name: "Blood Test Report", date: "2026-05-01", type: "Lab Report", file: "/patient_report.pdf" },
    { id: 2, name: "X-Ray Report", date: "2026-04-20", type: "Radiology", file: "/patient_report.pdf" },
    { id: 3, name: "General Checkup", date: "2026-04-10", type: "Consultation", file: "/patient_report.pdf" },
];

const ReportsLayout = () => {
    const [selectedReport, setSelectedReport] = useState(null);

    return (
        <div className="reports-page">
            <div className="reports-container">
                <div className="reports-header">
                    <h2>📋 Your Reports</h2>
                    <p>View and download your medical reports</p>
                </div>

                <table className="reports-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Report Name</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>View</th>
                            <th>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports.map((report) => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.name}</td>
                                <td><span className="report-type-badge">{report.type}</span></td>
                                <td>{report.date}</td>
                                <td>
                                    <a href={report.file} target="_blank" rel="noreferrer"
                                        className="view-btn">View</a>
                                </td>
                                <td>
                                    <a href={report.file} download="patient_report.pdf"
                                        className="download-btn">Download</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ReportsLayout;
