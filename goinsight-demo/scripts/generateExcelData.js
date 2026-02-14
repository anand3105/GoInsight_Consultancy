const XLSX = require('xlsx');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, '..', 'public', 'data');

// Create data directory if it doesn't exist
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// ============================================
// 1. RETAIL ANALYTICS DATA
// ============================================
function createRetailData() {
  const workbook = XLSX.utils.book_new();

  // Monthly Revenue Data
  const revenueData = [
    ['Month', 'Actual Revenue', 'Target Revenue', 'Last Year Revenue'],
    ['Jan', 380000, 400000, 350000],
    ['Feb', 420000, 410000, 380000],
    ['Mar', 455000, 430000, 410000],
    ['Apr', 410000, 440000, 395000],
    ['May', 480000, 460000, 430000],
    ['Jun', 520000, 480000, 470000],
    ['Jul', 495000, 500000, 455000],
    ['Aug', 530000, 510000, 485000],
    ['Sep', 485000, 490000, 450000],
    ['Oct', 550000, 520000, 500000],
    ['Nov', 620000, 580000, 560000],
    ['Dec', 710000, 650000, 640000],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(revenueData), 'Monthly Revenue');

  // Category Sales
  const categoryData = [
    ['Category', 'Sales %', 'Revenue', 'Units Sold', 'Avg Price'],
    ['Electronics', 35, 1564500, 12450, 125.66],
    ['Clothing', 25, 1117500, 22350, 50.00],
    ['Home & Garden', 20, 894000, 8940, 100.00],
    ['Sports', 12, 536400, 6780, 79.12],
    ['Others', 8, 357600, 4520, 79.12],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(categoryData), 'Category Sales');

  // Store Performance
  const storeData = [
    ['Store Name', 'Location', 'Revenue', 'Traffic', 'Conversion Rate', 'Satisfaction Score', 'YoY Growth'],
    ['Downtown Flagship', 'New York', 1250000, 45000, 4.2, 4.7, 12.5],
    ['Mall of America', 'Minnesota', 980000, 38000, 3.8, 4.5, 8.3],
    ['Westfield Center', 'California', 870000, 32000, 4.1, 4.6, 15.2],
    ['Chicago Loop', 'Illinois', 720000, 28000, 3.5, 4.3, 6.7],
    ['Miami Beach', 'Florida', 650000, 25000, 3.9, 4.4, 10.1],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(storeData), 'Store Performance');

  // Hourly Traffic
  const hourlyData = [
    ['Hour', 'Visitors', 'Conversions', 'Avg Transaction Value'],
    ['9:00 AM', 120, 8, 45.50],
    ['10:00 AM', 280, 22, 52.30],
    ['11:00 AM', 420, 38, 58.90],
    ['12:00 PM', 580, 52, 62.40],
    ['1:00 PM', 520, 48, 55.20],
    ['2:00 PM', 480, 42, 48.70],
    ['3:00 PM', 510, 45, 51.30],
    ['4:00 PM', 620, 58, 67.80],
    ['5:00 PM', 750, 72, 78.40],
    ['6:00 PM', 680, 65, 72.10],
    ['7:00 PM', 450, 40, 58.90],
    ['8:00 PM', 280, 24, 45.60],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(hourlyData), 'Hourly Traffic');

  // Customer Segments
  const segmentData = [
    ['Segment', 'Customer Count', 'Revenue %', 'Retention Rate', 'Avg Order Value', 'Purchase Frequency'],
    ['VIP', 823, 35, 92, 485.50, 8.2],
    ['Regular', 2470, 40, 78, 245.30, 4.5],
    ['Occasional', 3294, 18, 45, 125.80, 1.8],
    ['New', 1647, 7, 25, 89.90, 1.2],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(segmentData), 'Customer Segments');

  // Inventory Forecast
  const inventoryData = [
    ['Product Category', 'Current Stock %', 'Predicted Stock %', 'Days Until Reorder', 'Action Required', 'Safety Stock'],
    ['Electronics', 65, 42, 18, 'Monitor', 500],
    ['Clothing', 45, 28, 8, 'Reorder', 800],
    ['Home & Garden', 78, 55, 25, 'OK', 400],
    ['Sports', 32, 15, 5, 'Urgent', 300],
    ['Others', 58, 40, 15, 'Monitor', 250],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(inventoryData), 'Inventory Forecast');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Change %'],
    ['Total Revenue', 4470000, 4500000, 4050000, 10.4],
    ['Total Orders', 12847, 13000, 11500, 11.7],
    ['Avg Order Value', 347, 350, 352, -1.4],
    ['Customer Count', 8234, 8500, 7800, 5.6],
    ['Conversion Rate', 3.8, 4.0, 3.5, 8.6],
    ['Customer Satisfaction', 4.5, 4.7, 4.4, 2.3],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'retail_analytics_data.xlsx'));
  console.log('Created: retail_analytics_data.xlsx');
}

// ============================================
// 2. FINANCE ANALYTICS DATA
// ============================================
function createFinanceData() {
  const workbook = XLSX.utils.book_new();

  // Revenue & Profit
  const revenueData = [
    ['Month', 'Revenue', 'Profit', 'Profit Margin %', 'Operating Expenses', 'Net Income'],
    ['Jan', 1850000, 425000, 23.0, 1280000, 380000],
    ['Feb', 1920000, 460000, 24.0, 1300000, 412000],
    ['Mar', 2100000, 525000, 25.0, 1380000, 468000],
    ['Apr', 1980000, 485000, 24.5, 1340000, 432000],
    ['May', 2150000, 548000, 25.5, 1400000, 490000],
    ['Jun', 2280000, 592000, 26.0, 1450000, 528000],
    ['Jul', 2180000, 556000, 25.5, 1420000, 496000],
    ['Aug', 2320000, 615000, 26.5, 1470000, 548000],
    ['Sep', 2150000, 538000, 25.0, 1410000, 480000],
    ['Oct', 2420000, 654000, 27.0, 1520000, 584000],
    ['Nov', 2580000, 710000, 27.5, 1600000, 632000],
    ['Dec', 2870000, 818000, 28.5, 1750000, 728000],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(revenueData), 'Revenue Profit');

  // Cash Flow
  const cashFlowData = [
    ['Month', 'Cash Inflow', 'Cash Outflow', 'Net Cash Flow', 'Opening Balance', 'Closing Balance'],
    ['Jan', 1920000, 1650000, 270000, 2500000, 2770000],
    ['Feb', 2050000, 1720000, 330000, 2770000, 3100000],
    ['Mar', 2180000, 1850000, 330000, 3100000, 3430000],
    ['Apr', 1980000, 1780000, 200000, 3430000, 3630000],
    ['May', 2250000, 1880000, 370000, 3630000, 4000000],
    ['Jun', 2380000, 1950000, 430000, 4000000, 4430000],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(cashFlowData), 'Cash Flow');

  // Expense Breakdown
  const expenseData = [
    ['Category', 'Amount', 'Percentage', 'Budget', 'Variance', 'YoY Change'],
    ['Operations', 8750000, 35, 8500000, 250000, 5.2],
    ['Marketing', 5500000, 22, 5800000, -300000, 8.5],
    ['R&D', 4500000, 18, 4200000, 300000, 12.3],
    ['Administrative', 3750000, 15, 3800000, -50000, 2.1],
    ['Other', 2500000, 10, 2700000, -200000, -3.5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(expenseData), 'Expenses');

  // Risk Assessment
  const riskData = [
    ['Risk Type', 'Current Level', 'Threshold', 'Status', 'Mitigation Strategy', 'Impact Score'],
    ['Market Risk', 65, 75, 'Acceptable', 'Diversify portfolio', 8],
    ['Credit Risk', 45, 60, 'Low', 'Credit scoring model', 7],
    ['Liquidity Risk', 55, 70, 'Acceptable', 'Maintain cash reserves', 9],
    ['Operational Risk', 70, 80, 'Warning', 'Process automation', 6],
    ['Compliance Risk', 40, 65, 'Low', 'Regular audits', 8],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(riskData), 'Risk Assessment');

  // Budget vs Actual
  const budgetData = [
    ['Department', 'Budget', 'Actual', 'Variance', 'Variance %', 'Status'],
    ['Sales', 4500000, 4680000, 180000, 4.0, 'Over Budget'],
    ['Marketing', 2800000, 2650000, -150000, -5.4, 'Under Budget'],
    ['Operations', 3200000, 3350000, 150000, 4.7, 'Over Budget'],
    ['IT', 1800000, 1720000, -80000, -4.4, 'Under Budget'],
    ['HR', 1200000, 1180000, -20000, -1.7, 'Under Budget'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(budgetData), 'Budget vs Actual');

  // Portfolio Allocation
  const portfolioData = [
    ['Asset Class', 'Allocation %', 'Value', 'Return YTD', 'Risk Level', 'Target Allocation'],
    ['Equities', 40, 9920000, 12.5, 'High', 38],
    ['Bonds', 30, 7440000, 4.2, 'Low', 32],
    ['Real Estate', 15, 3720000, 8.8, 'Medium', 15],
    ['Cash', 10, 2480000, 1.5, 'Very Low', 10],
    ['Alternatives', 5, 1240000, 15.2, 'Very High', 5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(portfolioData), 'Portfolio');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Change %'],
    ['Total Revenue', 24800000, 25000000, 22500000, 10.2],
    ['Profit Margin', 24.7, 25.0, 23.5, 5.1],
    ['Operating Cash Flow', 3900000, 4000000, 3500000, 11.4],
    ['Debt-to-Equity', 0.45, 0.50, 0.48, -6.3],
    ['ROE', 18.5, 20.0, 17.2, 7.6],
    ['Current Ratio', 2.1, 2.0, 1.9, 10.5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'finance_analytics_data.xlsx'));
  console.log('Created: finance_analytics_data.xlsx');
}

// ============================================
// 3. HEALTHCARE ANALYTICS DATA
// ============================================
function createHealthcareData() {
  const workbook = XLSX.utils.book_new();

  // Patient Volume
  const patientData = [
    ['Week', 'Inpatient', 'Outpatient', 'Emergency', 'Total', 'Capacity Utilization %'],
    ['Week 1', 245, 890, 320, 1455, 82],
    ['Week 2', 268, 920, 345, 1533, 86],
    ['Week 3', 252, 875, 310, 1437, 81],
    ['Week 4', 280, 945, 365, 1590, 89],
    ['Week 5', 275, 910, 340, 1525, 86],
    ['Week 6', 290, 980, 380, 1650, 92],
    ['Week 7', 265, 895, 325, 1485, 83],
    ['Week 8', 285, 960, 355, 1600, 90],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(patientData), 'Patient Volume');

  // Department Performance
  const deptData = [
    ['Department', 'Patient Satisfaction', 'Staff Efficiency', 'Quality Score', 'Wait Time (min)', 'Cost per Patient'],
    ['Emergency', 4.2, 88, 92, 18, 450],
    ['Cardiology', 4.6, 92, 96, 12, 680],
    ['Orthopedics', 4.5, 90, 94, 15, 520],
    ['Pediatrics', 4.8, 94, 97, 10, 380],
    ['Oncology', 4.4, 86, 95, 20, 950],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(deptData), 'Department Performance');

  // Bed Occupancy
  const bedData = [
    ['Unit', 'Total Beds', 'Occupied', 'Available', 'Occupancy %', 'Critical Patients', 'Avg Stay (days)'],
    ['ICU', 50, 45, 5, 90, 32, 5.2],
    ['General Ward', 200, 172, 28, 86, 15, 3.8],
    ['Pediatric', 80, 65, 15, 81, 8, 2.5],
    ['Maternity', 60, 52, 8, 87, 0, 2.2],
    ['Surgical', 100, 92, 8, 92, 28, 4.5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(bedData), 'Bed Occupancy');

  // Wait Times by Hour
  const waitTimeData = [
    ['Hour', 'ER Wait (min)', 'Outpatient Wait (min)', 'Lab Wait (min)', 'Pharmacy Wait (min)'],
    ['6:00 AM', 8, 5, 10, 8],
    ['7:00 AM', 12, 8, 15, 12],
    ['8:00 AM', 22, 15, 25, 18],
    ['9:00 AM', 28, 20, 30, 22],
    ['10:00 AM', 25, 18, 28, 20],
    ['11:00 AM', 20, 15, 22, 16],
    ['12:00 PM', 18, 12, 18, 14],
    ['1:00 PM', 22, 16, 24, 18],
    ['2:00 PM', 26, 20, 28, 22],
    ['3:00 PM', 24, 18, 25, 20],
    ['4:00 PM', 20, 14, 20, 16],
    ['5:00 PM', 15, 10, 15, 12],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(waitTimeData), 'Wait Times');

  // Diagnosis Distribution
  const diagnosisData = [
    ['Diagnosis Category', 'Patient Count', 'Percentage', 'Avg Treatment Cost', 'Avg Stay (days)', 'Readmission Rate %'],
    ['Cardiovascular', 2240, 28, 8500, 5.2, 8.5],
    ['Respiratory', 1760, 22, 5200, 3.8, 12.3],
    ['Orthopedic', 1440, 18, 12500, 4.5, 5.2],
    ['Gastrointestinal', 1200, 15, 4800, 3.2, 9.8],
    ['Neurological', 960, 12, 15200, 6.5, 7.4],
    ['Other', 400, 5, 3500, 2.8, 6.5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(diagnosisData), 'Diagnosis Distribution');

  // Readmission Risk
  const readmissionData = [
    ['Patient ID', 'Age', 'Primary Condition', 'Risk Score %', 'Risk Factors', 'Recommended Action'],
    ['P10045', 72, 'Heart Failure', 85, 'Age, Multiple Comorbidities', 'Enhanced Follow-up'],
    ['P10089', 65, 'COPD', 72, 'Previous Readmission, Smoking', 'Home Care Program'],
    ['P10123', 58, 'Diabetes', 65, 'Medication Non-compliance', 'Patient Education'],
    ['P10156', 80, 'Pneumonia', 78, 'Age, Weakened Immunity', 'Extended Monitoring'],
    ['P10178', 45, 'Post-Surgery', 55, 'Surgical Complications', 'Physical Therapy'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(readmissionData), 'Readmission Risk');

  // Staff Utilization
  const staffData = [
    ['Role', 'Current Staff', 'Optimal Staff', 'Utilization %', 'Overtime Hours', 'Satisfaction Score'],
    ['Physicians', 85, 90, 94, 120, 4.2],
    ['Nurses', 320, 340, 94, 480, 3.8],
    ['Technicians', 150, 155, 97, 85, 4.0],
    ['Support Staff', 200, 210, 95, 150, 4.1],
    ['Admin', 80, 85, 94, 45, 4.3],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(staffData), 'Staff Utilization');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Status'],
    ['Patient Satisfaction', 94.2, 95.0, 93.5, 'On Track'],
    ['Bed Occupancy %', 87, 85, 84, 'Above Target'],
    ['Avg Wait Time (min)', 12, 15, 14, 'On Track'],
    ['Readmission Rate %', 8.3, 8.0, 8.8, 'Improving'],
    ['Mortality Rate %', 1.2, 1.5, 1.3, 'On Track'],
    ['Staff Utilization %', 92, 90, 88, 'Above Target'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'healthcare_analytics_data.xlsx'));
  console.log('Created: healthcare_analytics_data.xlsx');
}

// ============================================
// 4. EDUCATION ANALYTICS DATA
// ============================================
function createEducationData() {
  const workbook = XLSX.utils.book_new();

  // Enrollment Trends
  const enrollmentData = [
    ['Year', 'Total Students', 'New Enrollments', 'Retention Rate %', 'Graduation Rate %', 'Dropout Rate %'],
    ['2019', 12500, 3200, 88, 82, 5.2],
    ['2020', 13200, 3500, 85, 80, 6.8],
    ['2021', 14100, 3800, 87, 83, 5.5],
    ['2022', 15200, 4100, 89, 85, 4.8],
    ['2023', 16500, 4500, 91, 87, 4.2],
    ['2024', 17800, 4800, 92, 88, 3.8],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(enrollmentData), 'Enrollment Trends');

  // Course Performance
  const courseData = [
    ['Course Code', 'Course Name', 'Students Enrolled', 'Avg GPA', 'Completion Rate %', 'Satisfaction Score'],
    ['CS101', 'Intro to Computer Science', 450, 3.45, 92, 4.5],
    ['MATH201', 'Calculus II', 380, 3.12, 85, 4.1],
    ['ENG102', 'English Composition', 520, 3.68, 95, 4.6],
    ['BUS301', 'Business Analytics', 290, 3.52, 90, 4.4],
    ['PHY201', 'Physics II', 220, 3.08, 82, 4.0],
    ['CHEM101', 'General Chemistry', 340, 3.22, 88, 4.2],
    ['PSY101', 'Intro to Psychology', 480, 3.75, 96, 4.7],
    ['ECON201', 'Microeconomics', 310, 3.38, 89, 4.3],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(courseData), 'Course Performance');

  // Student Demographics
  const demographicsData = [
    ['Category', 'Student Count', 'Percentage', 'Avg GPA', 'Retention Rate %', 'Avg Financial Aid'],
    ['Undergraduate', 9790, 55, 3.35, 88, 12500],
    ['Graduate', 5340, 30, 3.72, 94, 18500],
    ['PhD', 1780, 10, 3.85, 96, 28000],
    ['Certificate', 890, 5, 3.45, 82, 5500],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(demographicsData), 'Demographics');

  // Weekly Engagement
  const engagementData = [
    ['Week', 'Platform Logins', 'Assignment Submissions', 'Discussion Posts', 'Video Views', 'Quiz Attempts'],
    ['Week 1', 15200, 8500, 4200, 12500, 6800],
    ['Week 2', 14800, 9200, 4800, 11800, 7200],
    ['Week 3', 15500, 9800, 5100, 13200, 7500],
    ['Week 4', 14200, 8800, 4500, 11500, 6900],
    ['Week 5', 15800, 10200, 5500, 14000, 8000],
    ['Week 6', 16200, 10800, 5800, 14500, 8400],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(engagementData), 'Weekly Engagement');

  // At-Risk Students
  const atRiskData = [
    ['Student ID', 'Program', 'Current GPA', 'Attendance %', 'Risk Score %', 'Risk Factors', 'Intervention'],
    ['STU20145', 'Computer Science', 2.1, 65, 85, 'Low GPA, Poor Attendance', 'Academic Advisor Meeting'],
    ['STU20289', 'Business', 2.4, 72, 72, 'Declining Grades', 'Tutoring Program'],
    ['STU20312', 'Engineering', 2.2, 68, 78, 'Low Engagement, Absences', 'Mentor Assignment'],
    ['STU20456', 'Arts', 2.5, 75, 65, 'Financial Issues', 'Financial Aid Review'],
    ['STU20523', 'Science', 2.0, 62, 88, 'Multiple Risk Factors', 'Comprehensive Support'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(atRiskData), 'At-Risk Students');

  // Learning Outcomes
  const outcomesData = [
    ['Outcome', 'Achieved %', 'Target %', 'Gap', 'Trend', 'Action Required'],
    ['Critical Thinking', 82, 85, -3, 'Improving', 'Continue Current Strategy'],
    ['Communication Skills', 88, 85, 3, 'Stable', 'None'],
    ['Technical Proficiency', 79, 85, -6, 'Declining', 'Curriculum Review'],
    ['Problem Solving', 84, 85, -1, 'Improving', 'Minor Adjustments'],
    ['Teamwork', 90, 85, 5, 'Improving', 'None'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(outcomesData), 'Learning Outcomes');

  // Faculty Performance
  const facultyData = [
    ['Faculty ID', 'Department', 'Teaching Rating', 'Research Score', 'Student Feedback', 'Availability Score'],
    ['FAC101', 'Computer Science', 4.5, 92, 4.6, 4.2],
    ['FAC102', 'Mathematics', 4.2, 88, 4.3, 4.0],
    ['FAC103', 'Business', 4.7, 85, 4.8, 4.5],
    ['FAC104', 'Engineering', 4.3, 95, 4.4, 4.1],
    ['FAC105', 'Arts', 4.6, 78, 4.7, 4.6],
    ['FAC106', 'Science', 4.4, 90, 4.5, 4.3],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(facultyData), 'Faculty Performance');

  // Grade Distribution
  const gradeData = [
    ['Grade', 'Student Count', 'Percentage', 'GPA Equivalent', 'Cumulative %'],
    ['A', 3560, 20, 4.0, 20],
    ['B', 6230, 35, 3.0, 55],
    ['C', 4980, 28, 2.0, 83],
    ['D', 1960, 11, 1.0, 94],
    ['F', 1070, 6, 0.0, 100],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(gradeData), 'Grade Distribution');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Change %'],
    ['Student Success Rate', 92.4, 95.0, 90.8, 1.8],
    ['Course Completion Rate', 88.7, 90.0, 87.2, 1.7],
    ['Average GPA', 3.42, 3.50, 3.38, 1.2],
    ['Enrollment Growth %', 15.2, 12.0, 13.5, 12.6],
    ['Student Satisfaction', 4.5, 4.7, 4.4, 2.3],
    ['Employment Rate %', 87, 90, 85, 2.4],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'education_analytics_data.xlsx'));
  console.log('Created: education_analytics_data.xlsx');
}

// ============================================
// 5. MANUFACTURING ANALYTICS DATA
// ============================================
function createManufacturingData() {
  const workbook = XLSX.utils.book_new();

  // OEE Components
  const oeeData = [
    ['Component', 'Current %', 'Target %', 'Last Month %', 'Industry Benchmark %'],
    ['Availability', 92, 95, 90, 90],
    ['Performance', 87, 90, 85, 85],
    ['Quality', 98.5, 99, 98, 97],
    ['Overall OEE', 78.8, 85, 75, 77],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(oeeData), 'OEE Components');

  // Production Volume
  const productionData = [
    ['Month', 'Actual Output', 'Target Output', 'Max Capacity', 'Utilization %', 'Efficiency %'],
    ['Jan', 12500, 13000, 15000, 83, 96],
    ['Feb', 13200, 13500, 15000, 88, 98],
    ['Mar', 14100, 14000, 15000, 94, 101],
    ['Apr', 13800, 14200, 15000, 92, 97],
    ['May', 14500, 14500, 15000, 97, 100],
    ['Jun', 15200, 15000, 16000, 95, 101],
    ['Jul', 14800, 15200, 16000, 93, 97],
    ['Aug', 15500, 15500, 16000, 97, 100],
    ['Sep', 15100, 15000, 16000, 94, 101],
    ['Oct', 16200, 16000, 17000, 95, 101],
    ['Nov', 16800, 16500, 17000, 99, 102],
    ['Dec', 17500, 17000, 18000, 97, 103],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(productionData), 'Production Volume');

  // Machine Performance
  const machineData = [
    ['Machine ID', 'Machine Name', 'Uptime %', 'Efficiency %', 'Quality %', 'Status', 'Last Maintenance'],
    ['MCH001', 'CNC Machine A', 94, 88, 99.2, 'Running', '2024-01-15'],
    ['MCH002', 'CNC Machine B', 91, 85, 98.5, 'Running', '2024-01-10'],
    ['MCH003', 'Assembly Line 1', 96, 92, 99.5, 'Running', '2024-01-18'],
    ['MCH004', 'Assembly Line 2', 88, 82, 97.8, 'Maintenance', '2024-01-05'],
    ['MCH005', 'Packaging Unit', 93, 90, 99.8, 'Running', '2024-01-12'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(machineData), 'Machine Performance');

  // Defect Analysis
  const defectData = [
    ['Defect Type', 'Count', 'Percentage', 'Cost Impact', 'Root Cause', 'Status'],
    ['Surface Defects', 245, 35, 48500, 'Material Quality', 'Under Investigation'],
    ['Dimensional Issues', 175, 25, 52500, 'Machine Calibration', 'Corrective Action'],
    ['Assembly Errors', 140, 20, 35000, 'Human Error', 'Training Planned'],
    ['Material Flaws', 84, 12, 42000, 'Supplier Issue', 'Supplier Audit'],
    ['Other', 56, 8, 14000, 'Various', 'Monitoring'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(defectData), 'Defect Analysis');

  // Downtime Analysis
  const downtimeData = [
    ['Downtime Type', 'Duration (min)', 'Frequency', 'Cost', 'Impact Level', 'Prevention Strategy'],
    ['Mechanical Failure', 480, 12, 28800, 'High', 'Predictive Maintenance'],
    ['Electrical Issues', 320, 8, 19200, 'Medium', 'Regular Inspection'],
    ['Setup/Changeover', 560, 45, 11200, 'Low', 'SMED Implementation'],
    ['Material Shortage', 240, 6, 14400, 'Medium', 'Inventory Management'],
    ['Quality Issues', 180, 15, 18000, 'Medium', 'SPC Implementation'],
    ['Scheduled Maintenance', 720, 4, 7200, 'Planned', 'Optimize Schedule'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(downtimeData), 'Downtime Analysis');

  // Shift Performance
  const shiftData = [
    ['Shift', 'Output Units', 'Efficiency %', 'Defect Count', 'Downtime (min)', 'Workers', 'Productivity'],
    ['Morning (6AM-2PM)', 5800, 94, 18, 45, 45, 128.9],
    ['Afternoon (2PM-10PM)', 5500, 89, 24, 65, 42, 131.0],
    ['Night (10PM-6AM)', 4800, 82, 32, 85, 38, 126.3],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(shiftData), 'Shift Performance');

  // Energy Consumption
  const energyData = [
    ['Month', 'Consumption (kWh)', 'Cost ($)', 'Cost per Unit', 'Target Cost', 'Savings'],
    ['Jan', 185000, 22200, 1.78, 1.80, 250],
    ['Feb', 192000, 23040, 1.75, 1.80, 650],
    ['Mar', 205000, 24600, 1.74, 1.80, 1230],
    ['Apr', 198000, 23760, 1.72, 1.80, 1584],
    ['May', 215000, 25800, 1.78, 1.80, 430],
    ['Jun', 228000, 27360, 1.80, 1.80, 0],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(energyData), 'Energy Consumption');

  // Predictive Maintenance
  const maintenanceData = [
    ['Component', 'Equipment', 'Health Score %', 'Predicted Failure', 'Risk Level', 'Action'],
    ['Bearing Assembly', 'CNC Machine A', 72, '15-20 days', 'Medium', 'Schedule Maintenance'],
    ['Motor Unit', 'Assembly Line 1', 85, '30+ days', 'Low', 'Monitor'],
    ['Hydraulic System', 'Press Machine', 58, '7-10 days', 'High', 'Urgent Inspection'],
    ['Control Panel', 'CNC Machine B', 92, '45+ days', 'Very Low', 'Normal Operation'],
    ['Conveyor Belt', 'Packaging Unit', 65, '12-15 days', 'Medium', 'Plan Replacement'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(maintenanceData), 'Predictive Maintenance');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Trend'],
    ['OEE Score %', 89.4, 90.0, 87.2, 'Improving'],
    ['Defect Rate %', 0.12, 0.10, 0.15, 'Improving'],
    ['Cycle Time (min)', 4.2, 4.0, 4.5, 'Improving'],
    ['Uptime %', 98.7, 99.0, 97.5, 'Stable'],
    ['First Pass Yield %', 97.5, 98.0, 96.8, 'Improving'],
    ['MTBF (hours)', 720, 800, 680, 'Improving'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'manufacturing_analytics_data.xlsx'));
  console.log('Created: manufacturing_analytics_data.xlsx');
}

// ============================================
// 6. SUPPLY CHAIN ANALYTICS DATA
// ============================================
function createSupplyChainData() {
  const workbook = XLSX.utils.book_new();

  // Inventory Turnover
  const inventoryData = [
    ['Month', 'Turnover Ratio', 'Stockout Incidents', 'Days of Supply', 'Inventory Value', 'Holding Cost'],
    ['Jan', 4.8, 3, 22, 2850000, 28500],
    ['Feb', 5.1, 2, 20, 2720000, 27200],
    ['Mar', 5.3, 1, 19, 2650000, 26500],
    ['Apr', 4.9, 4, 21, 2780000, 27800],
    ['May', 5.2, 2, 19, 2690000, 26900],
    ['Jun', 5.5, 1, 18, 2580000, 25800],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(inventoryData), 'Inventory Turnover');

  // On-Time Delivery
  const deliveryData = [
    ['Week', 'OTIF %', 'On-Time %', 'In-Full %', 'Early Deliveries', 'Late Deliveries', 'Total Shipments'],
    ['Week 1', 94.2, 96.5, 97.8, 45, 28, 850],
    ['Week 2', 95.8, 97.2, 98.5, 52, 22, 880],
    ['Week 3', 93.5, 95.8, 97.5, 38, 35, 820],
    ['Week 4', 96.5, 98.0, 98.5, 58, 18, 920],
    ['Week 5', 95.2, 97.0, 98.2, 48, 25, 875],
    ['Week 6', 97.1, 98.5, 98.6, 62, 12, 945],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(deliveryData), 'On-Time Delivery');

  // Warehouse Distribution
  const warehouseData = [
    ['Warehouse', 'Location', 'Capacity (sqft)', 'Utilization %', 'Inventory Value', 'Orders/Day', 'Efficiency Score'],
    ['North Hub', 'Chicago', 250000, 78, 8750000, 1250, 92],
    ['South Hub', 'Dallas', 200000, 82, 7000000, 980, 88],
    ['East Hub', 'New Jersey', 180000, 85, 5500000, 850, 90],
    ['West Hub', 'Los Angeles', 150000, 75, 3750000, 620, 85],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(warehouseData), 'Warehouse Distribution');

  // Transportation Modes
  const transportData = [
    ['Mode', 'Cost per Mile', 'Avg Transit Time (days)', 'Reliability %', 'Volume (tons)', 'CO2 Emissions (kg)'],
    ['Road', 2.45, 3.5, 94, 12500, 28500],
    ['Rail', 1.20, 5.2, 92, 8500, 12400],
    ['Sea', 0.45, 18.5, 88, 25000, 18500],
    ['Air', 8.50, 1.2, 98, 1500, 45000],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(transportData), 'Transportation Modes');

  // Supplier Performance
  const supplierData = [
    ['Supplier', 'On-Time %', 'Quality %', 'Cost Index', 'Flexibility Score', 'Lead Time (days)', 'Risk Rating'],
    ['Supplier A', 98, 99.2, 1.02, 4.5, 12, 'Low'],
    ['Supplier B', 94, 98.5, 0.95, 4.2, 15, 'Medium'],
    ['Supplier C', 96, 99.0, 1.05, 4.0, 10, 'Low'],
    ['Supplier D', 92, 97.5, 0.88, 3.8, 18, 'Medium'],
    ['Supplier E', 97, 98.8, 1.10, 4.3, 14, 'Low'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(supplierData), 'Supplier Performance');

  // Lead Time Analysis
  const leadTimeData = [
    ['Stage', 'Target (days)', 'Actual (days)', 'Variance', 'Bottleneck', 'Improvement Action'],
    ['Order Processing', 1, 1.2, 0.2, 'No', 'Automation'],
    ['Manufacturing', 5, 5.5, 0.5, 'Yes', 'Capacity Planning'],
    ['Quality Control', 1, 1.1, 0.1, 'No', 'Sampling Strategy'],
    ['Packaging', 0.5, 0.6, 0.1, 'No', 'Standardization'],
    ['Transit', 3, 3.8, 0.8, 'Yes', 'Route Optimization'],
    ['Customs', 2, 2.5, 0.5, 'No', 'Documentation'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(leadTimeData), 'Lead Time Analysis');

  // Freight Cost
  const freightData = [
    ['Month', 'Cost per Unit', 'Total Cost', 'Units Shipped', 'Fuel Surcharge', 'Accessorial Charges'],
    ['Jan', 2.18, 545000, 250000, 32500, 18500],
    ['Feb', 2.15, 537500, 250000, 30000, 17500],
    ['Mar', 2.12, 551200, 260000, 28500, 16800],
    ['Apr', 2.14, 535000, 250000, 29500, 17200],
    ['May', 2.10, 546000, 260000, 27000, 16000],
    ['Jun', 2.08, 561600, 270000, 25500, 15200],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(freightData), 'Freight Cost');

  // Demand Forecast
  const demandData = [
    ['Week', 'Actual Demand', 'Predicted Demand', 'Lower Bound', 'Upper Bound', 'Forecast Accuracy %'],
    ['Week 1', 25000, 24500, 22000, 27000, 98],
    ['Week 2', 26500, 26000, 23500, 28500, 98],
    ['Week 3', 24800, 25500, 23000, 28000, 97],
    ['Week 4', 28000, 27500, 25000, 30000, 98],
    ['Week 5', 27200, 28000, 25500, 30500, 97],
    ['Week 6', 29500, 29000, 26500, 31500, 98],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(demandData), 'Demand Forecast');

  // Risk Assessment
  const riskData = [
    ['Risk Type', 'Probability %', 'Impact Level', 'Risk Score', 'Mitigation Strategy', 'Owner'],
    ['Supplier Disruption', 25, 'High', 8.5, 'Dual Sourcing', 'Procurement'],
    ['Demand Volatility', 40, 'Medium', 6.8, 'Safety Stock', 'Planning'],
    ['Transportation Delay', 35, 'Medium', 5.5, 'Multi-modal', 'Logistics'],
    ['Quality Issues', 15, 'High', 7.2, 'Supplier Audit', 'Quality'],
    ['Currency Fluctuation', 50, 'Low', 4.5, 'Hedging', 'Finance'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(riskData), 'Risk Assessment');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Trend'],
    ['On-Time Delivery %', 96.8, 98.0, 95.5, 'Improving'],
    ['Fill Rate %', 98.2, 99.0, 97.8, 'Stable'],
    ['Avg Lead Time (days)', 4.2, 4.0, 4.5, 'Improving'],
    ['Freight Cost ($/unit)', 2.14, 2.10, 2.20, 'Improving'],
    ['Inventory Turnover', 5.2, 5.5, 4.9, 'Improving'],
    ['Perfect Order Rate %', 94.5, 96.0, 93.2, 'Improving'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'supply_chain_analytics_data.xlsx'));
  console.log('Created: supply_chain_analytics_data.xlsx');
}

// ============================================
// 7. SALES & MARKETING ANALYTICS DATA
// ============================================
function createSalesMarketingData() {
  const workbook = XLSX.utils.book_new();

  // Sales Pipeline
  const pipelineData = [
    ['Month', 'Leads', 'Qualified Leads', 'Opportunities', 'Proposals', 'Closed Won', 'Revenue'],
    ['Jan', 2500, 1250, 625, 312, 125, 875000],
    ['Feb', 2800, 1400, 700, 350, 140, 980000],
    ['Mar', 3100, 1550, 775, 387, 155, 1085000],
    ['Apr', 2900, 1450, 725, 362, 145, 1015000],
    ['May', 3300, 1650, 825, 412, 165, 1155000],
    ['Jun', 3500, 1750, 875, 437, 175, 1225000],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(pipelineData), 'Sales Pipeline');

  // Marketing Channels
  const channelData = [
    ['Channel', 'Spend', 'Leads', 'Conversions', 'Revenue', 'ROI %', 'CAC'],
    ['Paid Search', 125000, 3500, 280, 840000, 572, 446],
    ['Social Media', 85000, 2500, 175, 455000, 435, 486],
    ['Email Marketing', 45000, 1800, 180, 540000, 1100, 250],
    ['Content Marketing', 65000, 1200, 108, 378000, 482, 602],
    ['Referrals', 25000, 1000, 150, 525000, 2000, 167],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(channelData), 'Marketing Channels');

  // Campaign Performance
  const campaignData = [
    ['Campaign', 'Type', 'Spend', 'Impressions', 'Clicks', 'Leads', 'Revenue', 'ROI %'],
    ['Spring Sale 2024', 'Promotion', 45000, 2500000, 75000, 1500, 225000, 400],
    ['Product Launch', 'Awareness', 65000, 3200000, 96000, 1200, 180000, 177],
    ['Webinar Series', 'Lead Gen', 25000, 500000, 25000, 800, 240000, 860],
    ['Retargeting Q1', 'Retargeting', 35000, 1800000, 54000, 650, 195000, 457],
    ['Brand Campaign', 'Branding', 80000, 5000000, 100000, 500, 150000, 88],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(campaignData), 'Campaign Performance');

  // Funnel Conversion
  const funnelData = [
    ['Stage', 'Count', 'Conversion Rate %', 'Avg Time (days)', 'Drop-off %', 'Value'],
    ['Website Visitors', 150000, 100, 0, 0, 0],
    ['Leads', 10000, 6.7, 1, 93.3, 50000],
    ['MQLs', 5000, 50, 7, 50, 150000],
    ['SQLs', 2500, 50, 14, 50, 375000],
    ['Opportunities', 1250, 50, 21, 50, 750000],
    ['Closed Won', 400, 32, 45, 68, 2400000],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(funnelData), 'Funnel Conversion');

  // CAC & LTV Metrics
  const cacData = [
    ['Month', 'CAC', 'LTV', 'LTV:CAC Ratio', 'Payback Period (months)', 'Churn Rate %'],
    ['Jan', 385, 1540, 4.0, 8, 2.5],
    ['Feb', 392, 1568, 4.0, 8, 2.3],
    ['Mar', 378, 1624, 4.3, 7, 2.2],
    ['Apr', 405, 1580, 3.9, 8, 2.6],
    ['May', 368, 1656, 4.5, 7, 2.1],
    ['Jun', 355, 1704, 4.8, 6, 1.9],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(cacData), 'CAC LTV Metrics');

  // Lead Scoring
  const leadScoreData = [
    ['Score Range', 'Lead Count', 'Conversion Rate %', 'Avg Deal Size', 'Priority', 'Recommended Action'],
    ['81-100', 450, 45, 12500, 'Hot', 'Immediate Follow-up'],
    ['61-80', 1200, 28, 8500, 'Warm', 'Nurture Campaign'],
    ['41-60', 2500, 12, 5200, 'Cool', 'Email Sequence'],
    ['21-40', 3200, 5, 3500, 'Cold', 'Re-engagement'],
    ['0-20', 2650, 2, 2000, 'Very Cold', 'Archive'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(leadScoreData), 'Lead Scoring');

  // Revenue Forecast
  const forecastData = [
    ['Month', 'Actual Revenue', 'Predicted Revenue', 'Lower Bound', 'Upper Bound', 'Confidence %'],
    ['Jan', 875000, 850000, 780000, 920000, 92],
    ['Feb', 980000, 950000, 870000, 1030000, 94],
    ['Mar', 1085000, 1050000, 960000, 1140000, 93],
    ['Apr', 1015000, 1100000, 1000000, 1200000, 91],
    ['May', 1155000, 1180000, 1080000, 1280000, 95],
    ['Jun', 1225000, 1250000, 1140000, 1360000, 94],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(forecastData), 'Revenue Forecast');

  // Content Performance
  const contentData = [
    ['Content Type', 'Pieces', 'Views', 'Engagement %', 'Leads Generated', 'Cost', 'Cost per Lead'],
    ['Blog Posts', 48, 125000, 4.2, 450, 12000, 26.67],
    ['Videos', 24, 85000, 8.5, 320, 24000, 75.00],
    ['Whitepapers', 12, 15000, 18.5, 280, 8000, 28.57],
    ['Case Studies', 8, 12000, 22.0, 180, 6000, 33.33],
    ['Infographics', 16, 45000, 6.8, 120, 4800, 40.00],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(contentData), 'Content Performance');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Change %'],
    ['Customer Acquisition Cost', 42, 45, 48, -12.5],
    ['LTV:CAC Ratio', 4.2, 4.0, 3.8, 10.5],
    ['Pipeline Value', 2400000, 2500000, 2200000, 9.1],
    ['Win Rate %', 32, 35, 30, 6.7],
    ['Marketing ROI %', 425, 400, 380, 11.8],
    ['Lead Response Time (hrs)', 2.5, 2.0, 3.2, -21.9],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'sales_marketing_analytics_data.xlsx'));
  console.log('Created: sales_marketing_analytics_data.xlsx');
}

// ============================================
// 8. REAL ESTATE & CONSTRUCTION DATA
// ============================================
function createRealEstateData() {
  const workbook = XLSX.utils.book_new();

  // Portfolio Value
  const portfolioData = [
    ['Month', 'Portfolio Value (M)', 'NOI (M)', 'Occupancy %', 'Cash on Cash Return %', 'Appreciation %'],
    ['Jan', 245.5, 2.85, 93.2, 8.5, 1.2],
    ['Feb', 248.2, 2.92, 93.8, 8.7, 1.1],
    ['Mar', 252.1, 3.05, 94.2, 8.9, 1.6],
    ['Apr', 255.8, 3.12, 94.5, 9.0, 1.5],
    ['May', 260.2, 3.22, 94.8, 9.2, 1.7],
    ['Jun', 265.5, 3.35, 95.2, 9.4, 2.0],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(portfolioData), 'Portfolio Value');

  // Property Types
  const propertyTypeData = [
    ['Property Type', 'Count', 'Value (M)', 'Allocation %', 'Avg Occupancy %', 'Avg Cap Rate %'],
    ['Residential', 45, 100.9, 38, 96, 5.2],
    ['Commercial', 28, 74.3, 28, 92, 6.8],
    ['Industrial', 15, 47.8, 18, 98, 7.5],
    ['Retail', 12, 26.6, 10, 88, 7.2],
    ['Mixed Use', 8, 15.9, 6, 94, 6.5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(propertyTypeData), 'Property Types');

  // Regional Performance
  const regionalData = [
    ['Region', 'Properties', 'Value (M)', 'Occupancy %', 'Cap Rate %', 'Appreciation %', 'NOI Growth %'],
    ['Northeast', 32, 85.2, 95, 5.8, 4.2, 3.5],
    ['Southeast', 28, 72.5, 94, 6.2, 5.5, 4.2],
    ['Midwest', 22, 52.8, 93, 6.8, 3.8, 2.8],
    ['Southwest', 18, 38.5, 92, 7.2, 6.2, 4.8],
    ['West', 8, 16.5, 96, 5.5, 7.5, 5.5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(regionalData), 'Regional Performance');

  // Lease Expiration
  const leaseData = [
    ['Year', 'Sqft Expiring', 'Revenue at Risk (M)', 'Leases Count', 'Renewal Probability %', 'Market Rate Change %'],
    ['2024', 125000, 4.5, 45, 75, 2.5],
    ['2025', 185000, 6.8, 62, 72, 3.0],
    ['2026', 210000, 8.2, 78, 68, 3.5],
    ['2027', 165000, 6.5, 55, 65, 4.0],
    ['2028', 95000, 3.8, 32, 60, 4.5],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(leaseData), 'Lease Expiration');

  // Tenant Mix
  const tenantData = [
    ['Tenant', 'Property Type', 'Sqft', 'Annual Rent (M)', 'Lease Expiry', 'Credit Rating', 'Payment History'],
    ['TechCorp Inc', 'Commercial', 85000, 3.2, '2026-12-31', 'A', 'Excellent'],
    ['Retail Giant', 'Retail', 62000, 2.4, '2025-06-30', 'A-', 'Good'],
    ['MegaMart', 'Retail', 48000, 1.8, '2027-03-31', 'BBB+', 'Good'],
    ['StartupHub', 'Commercial', 35000, 1.4, '2025-12-31', 'BB', 'Fair'],
    ['LogiCo', 'Industrial', 120000, 2.8, '2028-06-30', 'A', 'Excellent'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(tenantData), 'Tenant Mix');

  // Market Comparison
  const marketData = [
    ['Metric', 'Portfolio', 'Market Avg', 'Top Quartile', 'Percentile Rank'],
    ['Cap Rate %', 6.2, 6.5, 5.8, 72],
    ['Occupancy %', 94.8, 92.5, 96.0, 78],
    ['Rent PSF ($)', 28.50, 26.80, 32.00, 68],
    ['Appreciation %', 5.2, 4.5, 6.8, 75],
    ['NOI Growth %', 4.2, 3.5, 5.5, 70],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(marketData), 'Market Comparison');

  // CapEx Data
  const capexData = [
    ['Quarter', 'Planned CapEx (M)', 'Actual CapEx (M)', 'Variance %', 'ROI %', 'Projects Completed'],
    ['Q1 2024', 4.5, 4.2, -6.7, 12.5, 8],
    ['Q2 2024', 5.2, 5.5, 5.8, 11.8, 10],
    ['Q3 2024', 6.0, 5.8, -3.3, 13.2, 12],
    ['Q4 2024', 4.8, 4.9, 2.1, 14.5, 9],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(capexData), 'CapEx Data');

  // Valuation Forecast
  const valuationData = [
    ['Year', 'Actual Value (M)', 'Forecast Value (M)', 'Lower Bound (M)', 'Upper Bound (M)', 'Confidence %'],
    ['2022', 215.0, 215.0, 215.0, 215.0, 100],
    ['2023', 235.5, 232.0, 220.0, 244.0, 95],
    ['2024', 265.5, 258.0, 242.0, 274.0, 92],
    ['2025', null, 285.0, 265.0, 305.0, 88],
    ['2026', null, 312.0, 288.0, 336.0, 85],
    ['2027', null, 342.0, 312.0, 372.0, 82],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(valuationData), 'Valuation Forecast');

  // Investment Opportunities
  const opportunityData = [
    ['Property', 'Location', 'Price (M)', 'Cap Rate %', 'IRR %', 'Score', 'Status', 'Recommendation'],
    ['Downtown Office', 'New York', 45.5, 5.8, 15.2, 92, 'Under Review', 'Strong Buy'],
    ['Industrial Park', 'Chicago', 28.2, 7.2, 18.5, 88, 'Due Diligence', 'Buy'],
    ['Retail Center', 'Miami', 18.5, 7.8, 14.8, 75, 'Negotiation', 'Hold'],
    ['Apartment Complex', 'Austin', 32.0, 5.2, 12.5, 85, 'LOI Submitted', 'Buy'],
    ['Mixed Use', 'Seattle', 22.8, 6.5, 16.2, 82, 'Under Review', 'Buy'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(opportunityData), 'Investment Opportunities');

  // Construction Projects
  const constructionData = [
    ['Project', 'Type', 'Budget (M)', 'Spent (M)', 'Progress %', 'On Schedule', 'Expected Completion'],
    ['Tower A Renovation', 'Renovation', 8.5, 6.2, 72, 'Yes', '2024-06-30'],
    ['New Retail Wing', 'New Build', 15.2, 4.8, 32, 'Yes', '2024-12-31'],
    ['Parking Expansion', 'Addition', 3.2, 2.8, 88, 'Delayed', '2024-04-30'],
    ['HVAC Upgrade', 'Improvement', 2.1, 1.9, 90, 'Yes', '2024-03-31'],
    ['Lobby Modernization', 'Renovation', 1.8, 0.6, 35, 'Yes', '2024-08-31'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(constructionData), 'Construction Projects');

  // KPI Summary
  const kpiData = [
    ['KPI', 'Value', 'Target', 'Last Period', 'Trend'],
    ['Occupancy Rate %', 94.8, 95.0, 93.5, 'Improving'],
    ['Project On-Time %', 91.5, 95.0, 88.2, 'Improving'],
    ['Cost Variance %', -2.1, 0.0, -3.5, 'Improving'],
    ['Portfolio ROI %', 18.4, 18.0, 17.2, 'Stable'],
    ['Cap Rate %', 6.2, 6.0, 6.5, 'Improving'],
    ['Debt Service Coverage', 1.45, 1.40, 1.38, 'Stable'],
  ];
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.aoa_to_sheet(kpiData), 'KPIs');

  XLSX.writeFile(workbook, path.join(publicDir, 'real_estate_analytics_data.xlsx'));
  console.log('Created: real_estate_analytics_data.xlsx');
}

// Run all data generation functions
console.log('Starting Excel data file generation...\n');

createRetailData();
createFinanceData();
createHealthcareData();
createEducationData();
createManufacturingData();
createSupplyChainData();
createSalesMarketingData();
createRealEstateData();

console.log('\nAll Excel data files created successfully in: public/data/');
