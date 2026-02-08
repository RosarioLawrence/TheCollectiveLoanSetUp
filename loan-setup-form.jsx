import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, Copy } from 'lucide-react';

function LoanSetupForm() {
  const [formData, setFormData] = useState({
    loanOfficer: '',
    pointContact: 'Loan Officer',
    spanishLanguage: 'No',
    purpose: 'Purchase',
    loanType: 'Conf FNMA',
    occupancy: 'Owner Occupied',
    propertyType: 'Single Family',
    expectedCOE: '',
    appraisalContingency: '',
    loanContingency: '',
    salesPrice: '',
    loanAmount: '',
    downPaymentPercent: '',
    lockedLoan: 'No',
    product: 'Conventional',
    rate: '',
    pointsToBorrower: '',
    tridTriggerDate: '',
    plDisclosuresSent: '',
    uploadedToICE: 'No',
    attachedToEmail: 'No',
    escrowName: '',
    escrowEmail: '',
    escrowPhone: '',
    insuranceAgentName: '',
    insuranceAgentEmail: '',
    insuranceCompany: '',
    insurancePhone: '',
    buyerAgentName: '',
    buyerAgentCompany: '',
    buyerAgentCell: '',
    buyerAgentEmail: '',
    listingAgentName: '',
    listingAgentCompany: '',
    listingAgentCell: '',
    listingAgentEmail: '',
    appraisalContact: '',
    monthlyHOA: '',
    hoaName: '',
    hoaContact: '',
    hoaManagementCo: '',
    hoaPhone: '',
    hoaEmail: '',
    landlordName: '',
    landlordPhone: '',
    landlordEmail: '',
    aeName: '',
    aeCell: '',
    aeEmail: '',
    loanStory: '',
    step1PasteNotes: false,
    step1UploadDocs: false,
    step1CopyToBSS: false,
    loanInBSS: false,
    brokerOutCreated: false,
    pricingExceptionApproved: false,
    ausRunReviewed: false,
    initialDisclosuresSent: false,
    brokerOutDisclosuresSent: false,
    driversLicense: false,
    incomeDocs: false,
    assetDocs: false,
    loeSupporting: false,
    verifyResidenceHistory: false,
    confirmTaxReturnAddress: false,
    borrowerLastName: '',
    loanNumber: ''
  });

  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const updateField = (fieldName, value) => {
    setFormData(currentData => {
      const updated = { ...currentData, [fieldName]: value };
      
      // Auto-calculate down payment when sales price or loan amount changes
      if (fieldName === 'salesPrice' || fieldName === 'loanAmount') {
        const sp = parseFloat(fieldName === 'salesPrice' ? value : currentData.salesPrice) || 0;
        const la = parseFloat(fieldName === 'loanAmount' ? value : currentData.loanAmount) || 0;
        
        if (sp > 0 && la > 0) {
          const dpDollars = sp - la;
          const dpPercent = ((dpDollars / sp) * 100).toFixed(2);
          updated.downPaymentPercent = dpPercent;
        }
      }
      
      return updated;
    });
  };

  const calculateDownPayment = () => {
    const sp = parseFloat(formData.salesPrice) || 0;
    const la = parseFloat(formData.loanAmount) || 0;
    const dp = sp - la;
    return dp.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const calculateLTV = () => {
    const sp = parseFloat(formData.salesPrice) || 0;
    const la = parseFloat(formData.loanAmount) || 0;
    if (sp > 0 && la > 0) {
      return ((la / sp) * 100).toFixed(2) + '%';
    }
    return '0%';
  };

  const generateEmailContent = () => {
    const dp = calculateDownPayment();
    const ltv = calculateLTV();
    
    return `NEW LOAN SET UP TRANSACTION EMAIL

LOAN OFFICER DETAILS:
Loan Officer: ${formData.loanOfficer || '[Not provided]'}
Point Borrower Contact: ${formData.pointContact}
Spanish Language: ${formData.spanishLanguage}

LOAN DETAILS:
Purpose: ${formData.purpose}
Loan Type: ${formData.loanType}
Occupancy: ${formData.occupancy}
Property Type: ${formData.propertyType}

IMPORTANT DATES:
Expected COE Date: ${formData.expectedCOE || '[Not provided]'}
Appraisal Contingency: ${formData.appraisalContingency || '[Not provided]'}
Loan Contingency: ${formData.loanContingency || '[Not provided]'}

FINANCIAL DETAILS:
Sales Price / Value: ${formData.salesPrice ? '$' + parseFloat(formData.salesPrice).toLocaleString() : '[Not provided]'}
Loan Amount: ${formData.loanAmount ? '$' + parseFloat(formData.loanAmount).toLocaleString() : '[Not provided]'}
Down Payment %: ${formData.downPaymentPercent || '[Not provided]'}%
Down Payment $: ${dp}
LTV: ${ltv}
Locked Loan: ${formData.lockedLoan}

EXPECTED OR LOCKED PRODUCT AND PRICING:
Product: ${formData.product}
Rate: ${formData.rate ? (parseFloat(formData.rate)).toFixed(3) + '%' : '[Not provided]'}
Points to Borrower: ${formData.pointsToBorrower || '[Not provided]'}

BROKER-OUT DETAILS:
TRID Trigger Date: ${formData.tridTriggerDate || '[Not applicable]'}
PL Disclosures Sent: ${formData.plDisclosuresSent || '[Not applicable]'}

DOCUMENTS:
Uploaded to ICE: ${formData.uploadedToICE}
Attached to Email: ${formData.attachedToEmail}

KEY CONTACTS:

Escrow/Title Officer:
  Name: ${formData.escrowName || '[Not provided]'}
  Email: ${formData.escrowEmail || '[Not provided]'}
  Phone: ${formData.escrowPhone || '[Not provided]'}

HOI Agent:
  Insurance Agent Name: ${formData.insuranceAgentName || '[Not provided]'}
  Email: ${formData.insuranceAgentEmail || '[Not provided]'}
  Insurance Company: ${formData.insuranceCompany || '[Not provided]'}
  Phone: ${formData.insurancePhone || '[Not provided]'}

Buyer Agent:
  Name: ${formData.buyerAgentName || '[Not provided]'}
  Company: ${formData.buyerAgentCompany || '[Not provided]'}
  Cell: ${formData.buyerAgentCell || '[Not provided]'}
  Email: ${formData.buyerAgentEmail || '[Not provided]'}

Listing Agent:
  Name: ${formData.listingAgentName || '[Not provided]'}
  Company: ${formData.listingAgentCompany || '[Not provided]'}
  Cell: ${formData.listingAgentCell || '[Not provided]'}
  Email: ${formData.listingAgentEmail || '[Not provided]'}

Appraisal Access Contact: ${formData.appraisalContact || '[Not provided]'}

HOA INFORMATION:
  Monthly HOA: ${formData.monthlyHOA ? '$' + parseFloat(formData.monthlyHOA).toLocaleString() : '[Not applicable]'}
  HOA Name: ${formData.hoaName || '[Not applicable]'}
  HOA Contact: ${formData.hoaContact || '[Not applicable]'}
  HOA Management Co.: ${formData.hoaManagementCo || '[Not applicable]'}
  HOA Phone: ${formData.hoaPhone || '[Not applicable]'}
  HOA Email: ${formData.hoaEmail || '[Not applicable]'}

LANDLORD INFORMATION:
  Name: ${formData.landlordName || '[Not applicable]'}
  Phone: ${formData.landlordPhone || '[Not applicable]'}
  Email: ${formData.landlordEmail || '[Not applicable]'}

BROKER-OUT LENDER:
  AE Name: ${formData.aeName || '[Not applicable]'}
  Cell: ${formData.aeCell || '[Not applicable]'}
  Email: ${formData.aeEmail || '[Not applicable]'}

LOAN STORY (IPAC — Income, Property, Assets, Credit):
${formData.loanStory || '[Not provided]'}

CHECKLIST COMPLETED:
☑ LO 3 Tasks (Step 1):
  ${formData.step1PasteNotes ? '✓' : '☐'} Paste the "Loan Setup Notes" into email body
  ${formData.step1UploadDocs ? '✓' : '☐'} Upload docs to ICE or attach to email
  ${formData.step1CopyToBSS ? '✓' : '☐'} Copy/paste same notes into BSS Notes

☑ Application/Disclosures:
  ${formData.loanInBSS ? '✓' : '☐'} Loan in Blue Sage (BSS)
  ${formData.brokerOutCreated ? '✓' : '☐'} Broker-Out Loan Created (If Applicable)
  ${formData.pricingExceptionApproved ? '✓' : '☐'} Pricing Exception Submitted/Approved (If Applicable)
  ${formData.ausRunReviewed ? '✓' : '☐'} AUS Run + Reviewed (If Applicable)
  ${formData.initialDisclosuresSent ? '✓' : '☐'} Initial Disclosures Sent
  ${formData.brokerOutDisclosuresSent ? '✓' : '☐'} Broker Out Disclosures Sent (If Applicable)

☑ Minimum "Clean File" Docs:
  ${formData.driversLicense ? '✓' : '☐'} Driver's License
  ${formData.incomeDocs ? '✓' : '☐'} Income Docs (program-appropriate)
  ${formData.assetDocs ? '✓' : '☐'} Asset Docs (if needed)
  ${formData.loeSupporting ? '✓' : '☐'} Key LOE/Supporting Docs (if needed)

☑ Critical Reminders:
  ${formData.verifyResidenceHistory ? '✓' : '☐'} Verify 2-year residence history
  ${formData.confirmTaxReturnAddress ? '✓' : '☐'} Confirm address on most recent tax returns for 4506-C

---
This loan setup was generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
`;
  };

  const copyToClipboard = async () => {
    const emailContent = generateEmailContent();
    
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(emailContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        return;
      } catch (err) {
        console.log('Clipboard API failed, trying fallback');
      }
    }
    
    // Fallback method
    const textArea = document.createElement('textarea');
    textArea.value = emailContent;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      alert('Copy failed. Please manually select and copy the text from the preview below.');
    }
    
    document.body.removeChild(textArea);
  };

  const downloadAsText = () => {
    const subject = `NEW SETUP – ${formData.borrowerLastName || '[Borrower Name]'} – ${formData.loanNumber || '[Loan Number]'}`;
    const content = `TO: SetUpSoCal@primelending.com\nSUBJECT: ${subject}\n\n${generateEmailContent()}`;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Loan_Setup_${formData.borrowerLastName || 'Draft'}_${formData.loanNumber || 'New'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const openInEmail = () => {
    const subject = `NEW SETUP – ${formData.borrowerLastName || '[Borrower Name]'} – ${formData.loanNumber || '[Loan Number]'}`;
    const recipient = 'SetUpSoCal@primelending.com';
    
    // Create mailto link with just subject - body is too long for mailto
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}`;
    
    // Open the mailto link
    const link = document.createElement('a');
    link.href = mailtoLink;
    link.click();
    
    // Show instruction to user
    setTimeout(() => {
      alert('Your email client should open with the correct recipient and subject.\n\nNow click the GREEN "Copy to Clipboard" button, then paste (Ctrl+V or Cmd+V) the loan details into your email body.');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-6">
          <div className="border-l-4 border-blue-600 pl-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">New Loan Set-Up Guide</h1>
            <p className="text-gray-600 mt-1">In-House (All In-House Programs) and Broker-Out (Processor Managed)</p>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <AlertCircle className="text-yellow-600 mr-2 flex-shrink-0" size={20} />
              <div className="text-sm text-yellow-800">
                <p className="font-semibold">Required:</p>
                <p>Paste the Email Template in the email body and copy the same into Notes in BSS. Along with all borrower documents if they have not been uploaded to ICE.</p>
                <p className="mt-2"><strong>Setup Coordinator:</strong> Lisa Thompson | Email: SetUpSoCal@primelending.com</p>
              </div>
            </div>
          </div>

          {/* Borrower & Loan Identification */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Borrower & Loan Identification</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Borrower Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.borrowerLastName}
                  onChange={(e) => updateField('borrowerLastName', e.target.value)}
                  placeholder="For email subject line"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.loanNumber}
                  onChange={(e) => updateField('loanNumber', e.target.value)}
                  placeholder="e.g., 8000987654"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Step 1: LO Checklist */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">✓ Step 1: LO Does These 3 Things</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.step1PasteNotes}
                  onChange={(e) => updateField('step1PasteNotes', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Paste the "Loan Setup Notes" (template below) into the email body
                </label>
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.step1UploadDocs}
                  onChange={(e) => updateField('step1UploadDocs', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Upload docs to ICE (preferred) or attach them to the 'Set Up' email
                </label>
              </div>
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.step1CopyToBSS}
                  onChange={(e) => updateField('step1CopyToBSS', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Copy/paste the same notes into BSS Notes
                </label>
              </div>
            </div>
          </div>

          {/* Start the Loan Checklist */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 Application / Disclosures Checklist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.loanInBSS} onChange={(e) => updateField('loanInBSS', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Loan in Blue Sage (BSS)</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.brokerOutCreated} onChange={(e) => updateField('brokerOutCreated', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Broker-Out Loan Created in Portal (If Applicable)</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.pricingExceptionApproved} onChange={(e) => updateField('pricingExceptionApproved', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Pricing Exception Submitted/Approved (If Applicable)</label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.ausRunReviewed} onChange={(e) => updateField('ausRunReviewed', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">AUS Run + Reviewed (If Applicable)</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.initialDisclosuresSent} onChange={(e) => updateField('initialDisclosuresSent', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Initial Disclosures Sent</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.brokerOutDisclosuresSent} onChange={(e) => updateField('brokerOutDisclosuresSent', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Broker Out Disclosures Sent (If Applicable)</label>
                </div>
              </div>
            </div>
          </div>

          {/* Minimum Clean File Docs */}
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📄 Minimum "Clean File" Docs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.driversLicense} onChange={(e) => updateField('driversLicense', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Driver's License</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.incomeDocs} onChange={(e) => updateField('incomeDocs', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Income Docs (program-appropriate)</label>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.assetDocs} onChange={(e) => updateField('assetDocs', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Asset Docs (if needed)</label>
                </div>
                <div className="flex items-start">
                  <input type="checkbox" checked={formData.loeSupporting} onChange={(e) => updateField('loeSupporting', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label className="ml-2 text-sm text-gray-700">Key LOE/Supporting Docs (if needed)</label>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Reminders */}
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">⚠️ Critical Reminders (Prevents Post-Closing Issues)</h2>
            <div className="space-y-3">
              <div className="flex items-start">
                <input type="checkbox" checked={formData.verifyResidenceHistory} onChange={(e) => updateField('verifyResidenceHistory', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label className="ml-2 text-sm text-gray-700">Verify 2-year residence history</label>
              </div>
              <div className="flex items-start">
                <input type="checkbox" checked={formData.confirmTaxReturnAddress} onChange={(e) => updateField('confirmTaxReturnAddress', e.target.checked)} className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label className="ml-2 text-sm text-gray-700">Confirm address used on most recent tax returns for 4506-C</label>
              </div>
            </div>
          </div>

          {/* Loan Officer Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">👤 Loan Officer Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Officer <span className="text-red-500">*</span></label>
                <input type="text" value={formData.loanOfficer} onChange={(e) => updateField('loanOfficer', e.target.value)} placeholder="Your name" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Point Borrower Contact</label>
                <select value={formData.pointContact} onChange={(e) => updateField('pointContact', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Loan Officer</option>
                  <option>Processor</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Spanish Language</label>
                <select value={formData.spanishLanguage} onChange={(e) => updateField('spanishLanguage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loan Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🏠 Loan Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Purpose <span className="text-red-500">*</span></label>
                <select value={formData.purpose} onChange={(e) => updateField('purpose', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Purchase</option>
                  <option>Refinance</option>
                  <option>Cash-Out Refinance</option>
                  <option>HELOC</option>
                  <option>Second</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Type <span className="text-red-500">*</span></label>
                <select value={formData.loanType} onChange={(e) => updateField('loanType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Conf FNMA</option>
                  <option>Conf FHLMC</option>
                  <option>FHA</option>
                  <option>VA</option>
                  <option>USDA</option>
                  <option>Jumbo</option>
                  <option>Non-QM</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occupancy <span className="text-red-500">*</span></label>
                <select value={formData.occupancy} onChange={(e) => updateField('occupancy', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Owner Occupied</option>
                  <option>Second Home</option>
                  <option>Investment Property</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type <span className="text-red-500">*</span></label>
                <select value={formData.propertyType} onChange={(e) => updateField('propertyType', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Single Family</option>
                  <option>Condo</option>
                  <option>Townhouse</option>
                  <option>Multi-Unit (2-4)</option>
                  <option>Manufactured</option>
                  <option>PUD</option>
                </select>
              </div>
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📅 Important Dates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expected COE Date <span className="text-red-500">*</span></label>
                <input type="date" value={formData.expectedCOE} onChange={(e) => updateField('expectedCOE', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appraisal Contingency</label>
                <input type="date" value={formData.appraisalContingency} onChange={(e) => updateField('appraisalContingency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Contingency</label>
                <input type="date" value={formData.loanContingency} onChange={(e) => updateField('loanContingency', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Financial Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">💰 Financial Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sales Price / Value <span className="text-red-500">*</span></label>
                <input type="number" value={formData.salesPrice} onChange={(e) => updateField('salesPrice', e.target.value)} placeholder="1050000" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount <span className="text-red-500">*</span></label>
                <input type="number" value={formData.loanAmount} onChange={(e) => updateField('loanAmount', e.target.value)} placeholder="745500" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment % (auto-calculated)</label>
                <div className="w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-lg text-gray-700 font-semibold">
                  {formData.downPaymentPercent || '0'}%
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Locked Loan</label>
                <select value={formData.lockedLoan} onChange={(e) => updateField('lockedLoan', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Down Payment $ (calculated)</label>
                <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                  {calculateDownPayment()}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">LTV (calculated)</label>
                <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-700">
                  {calculateLTV()}
                </div>
              </div>
            </div>
          </div>

          {/* Product and Pricing */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 Expected or Locked Product and Pricing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select value={formData.product} onChange={(e) => updateField('product', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Conventional</option>
                  <option>FHA</option>
                  <option>VA</option>
                  <option>USDA</option>
                  <option>Jumbo</option>
                  <option>ARM 5/1</option>
                  <option>ARM 7/1</option>
                  <option>ARM 10/1</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rate (%)</label>
                <input type="number" step="0.001" value={formData.rate} onChange={(e) => updateField('rate', e.target.value)} placeholder="6.500" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Points to Borrower</label>
                <input type="number" step="0.001" value={formData.pointsToBorrower} onChange={(e) => updateField('pointsToBorrower', e.target.value)} placeholder="1.125" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Broker-Out Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔄 Broker-Out Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TRID Trigger Date</label>
                <input type="date" value={formData.tridTriggerDate} onChange={(e) => updateField('tridTriggerDate', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">PL Disclosures Sent</label>
                <input type="date" value={formData.plDisclosuresSent} onChange={(e) => updateField('plDisclosuresSent', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📎 Documents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Uploaded to ICE (preferred)</label>
                <select value={formData.uploadedToICE} onChange={(e) => updateField('uploadedToICE', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attached to Email</label>
                <select value={formData.attachedToEmail} onChange={(e) => updateField('attachedToEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>No</option>
                  <option>Yes</option>
                </select>
              </div>
            </div>
          </div>

          {/* Escrow/Title */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🏢 Escrow / Title Officer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.escrowName} onChange={(e) => updateField('escrowName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.escrowEmail} onChange={(e) => updateField('escrowEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={formData.escrowPhone} onChange={(e) => updateField('escrowPhone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🛡️ HOI Agent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Agent Name</label>
                <input type="text" value={formData.insuranceAgentName} onChange={(e) => updateField('insuranceAgentName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.insuranceAgentEmail} onChange={(e) => updateField('insuranceAgentEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                <input type="text" value={formData.insuranceCompany} onChange={(e) => updateField('insuranceCompany', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={formData.insurancePhone} onChange={(e) => updateField('insurancePhone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Buyer Agent */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🏘️ Buyer Agent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.buyerAgentName} onChange={(e) => updateField('buyerAgentName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" value={formData.buyerAgentCompany} onChange={(e) => updateField('buyerAgentCompany', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
                <input type="tel" value={formData.buyerAgentCell} onChange={(e) => updateField('buyerAgentCell', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.buyerAgentEmail} onChange={(e) => updateField('buyerAgentEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Listing Agent */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🏘️ Listing Agent</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={formData.listingAgentName} onChange={(e) => updateField('listingAgentName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input type="text" value={formData.listingAgentCompany} onChange={(e) => updateField('listingAgentCompany', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
                <input type="tel" value={formData.listingAgentCell} onChange={(e) => updateField('listingAgentCell', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.listingAgentEmail} onChange={(e) => updateField('listingAgentEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Appraisal Access */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🔑 Appraisal Access Contact</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input type="text" value={formData.appraisalContact} onChange={(e) => updateField('appraisalContact', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>
          </div>

          {/* HOA */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🏘️ Homeowner Association (HOA)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Monthly HOA</label>
                <input type="number" value={formData.monthlyHOA} onChange={(e) => updateField('monthlyHOA', e.target.value)} placeholder="400" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HOA Name</label>
                <input type="text" value={formData.hoaName} onChange={(e) => updateField('hoaName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HOA Contact</label>
                <input type="text" value={formData.hoaContact} onChange={(e) => updateField('hoaContact', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HOA Management Co.</label>
                <input type="text" value={formData.hoaManagementCo} onChange={(e) => updateField('hoaManagementCo', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HOA Phone</label>
                <input type="tel" value={formData.hoaPhone} onChange={(e) => updateField('hoaPhone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">HOA Email</label>
                <input type="email" value={formData.hoaEmail} onChange={(e) => updateField('hoaEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Landlord */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🏠 Landlord Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Private or Management Co.</label>
                <input type="text" value={formData.landlordName} onChange={(e) => updateField('landlordName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={formData.landlordPhone} onChange={(e) => updateField('landlordPhone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.landlordEmail} onChange={(e) => updateField('landlordEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Broker-Out Lender */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">🤝 Broker-Out Lender</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AE Name</label>
                <input type="text" value={formData.aeName} onChange={(e) => updateField('aeName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cell</label>
                <input type="tel" value={formData.aeCell} onChange={(e) => updateField('aeCell', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={formData.aeEmail} onChange={(e) => updateField('aeEmail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Loan Story */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📝 Loan Story (IPAC — Income, Property, Assets, Credit)</h2>
            <p className="text-sm text-gray-600 mb-3">Tell the story + any notes/LOE needed/Details for Loan-Set Up Coordinator, Processor and/or UW</p>
            <textarea
              value={formData.loanStory}
              onChange={(e) => updateField('loanStory', e.target.value)}
              placeholder="Write your story here with all the details you want..."
              rows="6"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">📧 How to Send Your Loan Setup:</h3>
            <ol className="text-sm text-gray-700 space-y-1 mb-3">
              <li>1. Click "Generate Email Template" to preview</li>
              <li>2. Click "Copy to Clipboard" and paste into your email</li>
              <li>3. Or click "Download as File" and attach to email</li>
              <li>4. Send to: SetUpSoCal@primelending.com</li>
            </ol>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowEmail(!showEmail)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold"
            >
              <Mail size={20} />
              {showEmail ? 'Hide' : 'Generate'} Email Template
            </button>
            
            {showEmail && (
              <>
                <button
                  onClick={copyToClipboard}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold"
                >
                  {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                
                <button
                  onClick={downloadAsText}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold"
                >
                  <Mail size={20} />
                  Download as File
                </button>

                <button
                  onClick={openInEmail}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold"
                >
                  <Mail size={20} />
                  Open Email (Manual Paste)
                </button>
              </>
            )}
          </div>

          {/* Email Preview */}
          {showEmail && (
            <div className="mt-6 bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Email Preview</h3>
                <p className="text-sm text-gray-600">
                  To: SetUpSoCal@primelending.com
                </p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-4">
                <p className="text-sm font-semibold text-gray-800">
                  Subject: NEW SETUP – {formData.borrowerLastName || '[Borrower Name]'} – {formData.loanNumber || '[Loan Number]'}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-300 rounded p-3 mb-3">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Click inside the box below and press Ctrl+A (or Cmd+A on Mac) to select all, then Ctrl+C (or Cmd+C) to copy.
                </p>
              </div>
              <textarea
                readOnly
                value={generateEmailContent()}
                onClick={(e) => e.target.select()}
                className="w-full h-96 p-4 bg-white rounded border border-gray-300 text-sm font-mono overflow-auto"
                style={{ whiteSpace: 'pre-wrap' }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}