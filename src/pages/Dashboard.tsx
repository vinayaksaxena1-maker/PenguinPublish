import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import logoImg from '../assets/Logo1.png'

interface MonthSales {
  name: string;
  copies: number;
  gross: number;
}

interface AuthorAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  bookTitle: string;
  isbn: string;
  mrp: number;
  sold: number;
  royalty: number;
  pending: number;
  paid: number;
  months: MonthSales[];
  status: string;
  phoneNumber?: string;
}

interface SupportTicket {
  id: string;
  authorEmail: string;
  subject: string;
  message: string;
  status: 'Resolved' | 'In Progress' | 'Pending';
}

const DEFAULT_AUTHORS: AuthorAccount[] = [
  {
    id: 'author-1',
    name: 'Anita Gupta',
    email: 'author@mbpublication.in',
    passwordHash: '123456',
    bookTitle: 'आँसुओं के उस पार',
    isbn: '978-93-00000-00-0',
    mrp: 299,
    sold: 186,
    royalty: 25011,
    paid: 18600,
    pending: 6411,
    months: [
      { name: 'Jan', copies: 18, gross: 5382 },
      { name: 'Feb', copies: 22, gross: 6578 },
      { name: 'Mar', copies: 31, gross: 9269 },
      { name: 'Apr', copies: 27, gross: 8073 },
      { name: 'May', copies: 42, gross: 12558 },
      { name: 'Jun', copies: 46, gross: 13754 }
    ],
    status: 'Active'
  },
  {
    id: 'author-2',
    name: 'Rita Gupta',
    email: 'rita@example.com',
    passwordHash: '123456',
    bookTitle: 'जहाँ प्रेम है वहीं जीवन है',
    isbn: '978-93-00000-11-6',
    mrp: 249,
    sold: 48,
    royalty: 5378,
    paid: 4000,
    pending: 1378,
    months: [
      { name: 'Jan', copies: 5, gross: 1245 },
      { name: 'Feb', copies: 8, gross: 1992 },
      { name: 'Mar', copies: 12, gross: 2988 },
      { name: 'Apr', copies: 7, gross: 1743 },
      { name: 'May', copies: 10, gross: 2490 },
      { name: 'Jun', copies: 6, gross: 1494 }
    ],
    status: 'Active'
  }
]

const DEFAULT_TICKETS: SupportTicket[] = [
  { id: 't-1', authorEmail: 'author@mbpublication.in', subject: 'Amazon link update', message: 'Please update the store link.', status: 'Resolved' },
  { id: 't-2', authorEmail: 'author@mbpublication.in', subject: 'Certificate correction', message: 'Name spelling correction.', status: 'In Progress' }
]

export const Dashboard: React.FC = () => {
  // Load mock database from localStorage
  const [authors, setAuthors] = useState<AuthorAccount[]>(() => {
    const saved = localStorage.getItem('mb_authors')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* fallback */ }
    }
    return DEFAULT_AUTHORS
  })

  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('mb_tickets')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* fallback */ }
    }
    return DEFAULT_TICKETS
  })

  // Synchronize with localStorage
  useEffect(() => {
    localStorage.setItem('mb_authors', JSON.stringify(authors))
  }, [authors])

  useEffect(() => {
    localStorage.setItem('mb_tickets', JSON.stringify(tickets))
  }, [tickets])

  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginRole, setLoginRole] = useState<'author' | 'admin'>('author')
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login')
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email')
  
  // Credentials input
  const [email, setEmail] = useState('author@mbpublication.in')
  const [password, setPassword] = useState('123456')

  // OTP Login inputs
  const [mobileNumber, setMobileNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')

  // Register state
  const [regName, setRegName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [regBook, setRegBook] = useState('')

  // Active session state
  const [currentAuthor, setCurrentAuthor] = useState<AuthorAccount | null>(null)
  const [page, setPage] = useState<string>('overview')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Support inputs
  const [supportSubject, setSupportSubject] = useState('Royalty payment update')
  const [supportMessage, setSupportMessage] = useState('Please share my next royalty payout date.')

  // Admin "Add New User" state inputs
  const [adminNewName, setAdminNewName] = useState('')
  const [adminNewEmail, setAdminNewEmail] = useState('')
  const [adminNewPassword, setAdminNewPassword] = useState('')
  const [adminNewPhone, setAdminNewPhone] = useState('')

  // Author "Update Password" state inputs
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  // Toast notifier helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (loginRole === 'admin') {
      if (email === 'admin@mbpublication.in' && password === '123456') {
        setIsLoggedIn(true)
        setCurrentAuthor(null)
        setPage('adminOverview')
        showToast('Admin Login Success!')
      } else {
        showToast('Invalid Admin Credentials!')
      }
    } else {
      // Author login verification
      const found = authors.find(
        a => a.email.toLowerCase() === email.toLowerCase() && a.passwordHash === password
      )
      if (found) {
        setIsLoggedIn(true)
        setCurrentAuthor(found)
        setPage('overview')
        showToast(`Welcome back, ${found.name}!`)
      } else {
        showToast('Access Denied: Incorrect Email or Password!')
      }
    }
  }

  // Handle Mock Google Login
  const handleGoogleLogin = () => {
    showToast('Simulating Google Sign-In pop-up...')
    setTimeout(() => {
      const found = authors[0]
      setIsLoggedIn(true)
      setCurrentAuthor(found)
      setPage('overview')
      showToast(`Google Login Successful: ${found.email}`)
    }, 1200)
  }

  // Handle sending mock OTP SMS
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mobileNumber || mobileNumber.length < 10) {
      showToast('Please enter a valid 10-digit mobile number!')
      return
    }
    setOtpSent(true)
    showToast(`OTP sent successfully to +91 ${mobileNumber}! (Use demo OTP: 1234)`)
  }

  // Verify mock OTP SMS
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCode === '1234') {
      const found = authors[0]
      setIsLoggedIn(true)
      setCurrentAuthor(found)
      setPage('overview')
      showToast(`OTP Verified! Welcome back, ${found.name}`)
      setOtpSent(false)
      setOtpCode('')
      setMobileNumber('')
    } else {
      showToast('Incorrect OTP! Please enter 1234 for demo.')
    }
  }

  // Quick Admin access handler
  const handleQuickAdmin = () => {
    setEmail('admin@mbpublication.in')
    setPassword('123456')
    setLoginRole('admin')
    setIsLoggedIn(true)
    setCurrentAuthor(null)
    setPage('adminOverview')
    showToast('Admin Quick Demo Activated!')
  }

  // Handle Register (New Author)
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!regName || !regEmail || !regPassword) {
      showToast('All standard fields are required!')
      return
    }

    const exists = authors.some(a => a.email.toLowerCase() === regEmail.toLowerCase())
    if (exists || regEmail.toLowerCase() === 'admin@mbpublication.in') {
      showToast('Email address already registered!')
      return
    }

    const newAuthor: AuthorAccount = {
      id: `author-${Date.now()}`,
      name: regName,
      email: regEmail,
      passwordHash: regPassword,
      bookTitle: regBook || 'अघोषित पुस्तक (TBD)',
      isbn: '978-93-00000-XX-X',
      mrp: 250,
      sold: 0,
      royalty: 0,
      paid: 0,
      pending: 0,
      months: [
        { name: 'Jan', copies: 0, gross: 0 },
        { name: 'Feb', copies: 0, gross: 0 },
        { name: 'Mar', copies: 0, gross: 0 },
        { name: 'Apr', copies: 0, gross: 0 },
        { name: 'May', copies: 0, gross: 0 },
        { name: 'Jun', copies: 0, gross: 0 }
      ],
      status: 'Active'
    }

    setAuthors(prev => [...prev, newAuthor])
    showToast('Registration successful! Please login now.')
    setLoginTab('login')
    setLoginRole('author')
    setLoginMethod('email')
    setEmail(regEmail)
    setPassword(regPassword)

    setRegName('')
    setRegEmail('')
    setRegPassword('')
    setRegBook('')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentAuthor(null)
    setPage('overview')
  }

  // Admin: Add new user/author
  const handleAdminAddUser = (e: React.FormEvent) => {
    e.preventDefault()

    if (!adminNewName || !adminNewEmail || !adminNewPassword || !adminNewPhone) {
      showToast('Please fill out all fields!')
      return
    }

    const exists = authors.some(a => a.email.toLowerCase() === adminNewEmail.toLowerCase())
    if (exists || adminNewEmail.toLowerCase() === 'admin@mbpublication.in') {
      showToast('Error: Email address already registered!')
      return
    }

    const newAuthor: AuthorAccount = {
      id: `author-${Date.now()}`,
      name: adminNewName,
      email: adminNewEmail,
      passwordHash: adminNewPassword,
      phoneNumber: adminNewPhone,
      bookTitle: 'अघोषित पुस्तक (TBD)',
      isbn: '978-93-00000-XX-X',
      mrp: 250,
      sold: 0,
      royalty: 0,
      paid: 0,
      pending: 0,
      months: [
        { name: 'Jan', copies: 0, gross: 0 },
        { name: 'Feb', copies: 0, gross: 0 },
        { name: 'Mar', copies: 0, gross: 0 },
        { name: 'Apr', copies: 0, gross: 0 },
        { name: 'May', copies: 0, gross: 0 },
        { name: 'Jun', copies: 0, gross: 0 }
      ],
      status: 'Active'
    }

    setAuthors(prev => [...prev, newAuthor])
    showToast(`Author "${adminNewName}" added successfully!`)

    // Clear fields
    setAdminNewName('')
    setAdminNewEmail('')
    setAdminNewPassword('')
    setAdminNewPhone('')
  }

  // Admin: Delete user/author
  const handleAdminDeleteUser = (authorId: string) => {
    const authorToDelete = authors.find(a => a.id === authorId)
    if (!authorToDelete) return

    if (window.confirm(`Are you sure you want to delete author "${authorToDelete.name}"?`)) {
      setAuthors(prev => prev.filter(a => a.id !== authorId))
      showToast(`Author "${authorToDelete.name}" deleted successfully!`)
    }
  }

  // Author: Change password
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAuthor) return

    const authorIndex = authors.findIndex(a => a.id === currentAuthor.id)
    if (authorIndex === -1) {
      showToast('Error: Author not found!')
      return
    }

    const currentRecord = authors[authorIndex]
    if (currentRecord.passwordHash !== currentPassword) {
      showToast('Access Denied: Current password is incorrect!')
      return
    }

    if (newPassword !== confirmNewPassword) {
      showToast('Error: New passwords do not match!')
      return
    }

    // Update password in database array
    const updatedAuthors = [...authors]
    updatedAuthors[authorIndex] = {
      ...currentRecord,
      passwordHash: newPassword
    }
    setAuthors(updatedAuthors)

    // Update currentAuthor session state
    setCurrentAuthor({
      ...currentAuthor,
      passwordHash: newPassword
    })

    // Reset inputs
    setCurrentPassword('')
    setNewPassword('')
    setConfirmNewPassword('')

    showToast('Password updated successfully!')
  }

  const money = (n: number) => '₹' + n.toLocaleString('en-IN')

  const renderMetric = (label: string, value: string | number, small: string) => (
    <div className="card metric">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      <small>{small}</small>
    </div>
  )

  const renderChart = (authorData: AuthorAccount) => {
    const max = Math.max(...authorData.months.map(m => m.copies), 1)
    return (
      <div className="chart">
        {authorData.months.map((m, idx) => (
          <div key={idx} className="bar-wrap">
            <div className="bar" style={{ height: `${Math.max(24, (m.copies / max) * 185)}px` }}>
              <span>{m.copies}</span>
            </div>
            <div>{m.name}</div>
          </div>
        ))}
      </div>
    )
  }

  const handleSupportSubmit = () => {
    if (!supportSubject || !supportMessage) {
      showToast('Please fill out subject and message.')
      return
    }
    const newTicket: SupportTicket = {
      id: `t-${Date.now()}`,
      authorEmail: currentAuthor ? currentAuthor.email : 'unknown',
      subject: supportSubject,
      message: supportMessage,
      status: 'Pending'
    }
    setTickets(prev => [...prev, newTicket])
    showToast('Support ticket submitted successfully!')
    setSupportSubject('')
    setSupportMessage('')
  }

  const authorNav = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'sales', icon: '📈', label: 'Sales' },
    { id: 'royalty', icon: '₹', label: 'Royalty' },
    { id: 'documents', icon: '📄', label: 'Documents' },
    { id: 'support', icon: '💬', label: 'Support' },
    { id: 'security', icon: '🔑', label: 'Security' }
  ]

  const adminNav = [
    { id: 'adminOverview', icon: '📊', label: 'Overview' },
    { id: 'authors', icon: '👤', label: 'Authors' },
    { id: 'books', icon: '📚', label: 'Books' },
    { id: 'salesEntry', icon: '🧾', label: 'Sales Entry' },
    { id: 'payments', icon: '₹', label: 'Payments' }
  ]

  const navItems = currentAuthor ? authorNav : adminNav

  const renderPageContent = () => {
    if (currentAuthor) {
      const authorData = authors.find(a => a.id === currentAuthor.id) || currentAuthor

      switch (page) {
        case 'overview':
          return (
            <>
              <div className="cards">
                {renderMetric('Total Copies Sold', authorData.sold, 'Jan–Jun 2026')}
                {renderMetric('Total Royalty', money(authorData.royalty), 'Calculated after costs')}
                {renderMetric('Paid Amount', money(authorData.paid), 'Last updated by admin')}
                {renderMetric('Pending Amount', money(authorData.pending), 'Payout process status')}
              </div>
              <div className="grid-2">
                <div className="card">
                  <div className="section-title">
                    <h3>Monthly Sales</h3>
                    <span className="status live">Live Report</span>
                  </div>
                  {renderChart(authorData)}
                </div>
                <div className="card">
                  <div className="section-title">
                    <h3>My Book</h3>
                    <span className="status live">Published</span>
                  </div>
                  <div className="book-card">
                    <div className="cover">{authorData.bookTitle.slice(0, 10)}</div>
                    <div>
                      <h4>{authorData.bookTitle}</h4>
                      <p><b>Author:</b> {authorData.name}</p>
                      <p><b>ISBN:</b> {authorData.isbn}</p>
                      <p><b>MRP:</b> ₹{authorData.mrp}</p>
                      <p><b>Links:</b> Amazon • Flipkart</p>
                      <div className="progress">
                        <span style={{ width: authorData.sold > 0 ? '78%' : '20%' }}></span>
                      </div>
                      <p>Publishing workflow: {authorData.sold > 0 ? '78% complete' : 'Ready'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="section-title">
                  <h3>Recent Royalty Entries</h3>
                  <button className="btn btn-soft" onClick={() => setPage('royalty')}>View Full</button>
                </div>
                {renderRoyaltyTable(authorData)}
              </div>
            </>
          )

        case 'sales':
          return (
            <>
              <div className="grid-2">
                <div className="card">
                  <div className="section-title">
                    <h3>Sales Trend</h3>
                    <span className="status live">Auto/Manual Update</span>
                  </div>
                  {renderChart(authorData)}
                </div>
                <div className="card">
                  <h3>Platform Split</h3>
                  <div className="table-responsive">
                    <table>
                      <tbody>
                        <tr>
                          <td>Amazon</td>
                          <td>{Math.round(authorData.sold * 0.52)} copies</td>
                          <td>52%</td>
                        </tr>
                        <tr>
                          <td>Flipkart</td>
                          <td>{Math.round(authorData.sold * 0.29)} copies</td>
                          <td>29%</td>
                        </tr>
                        <tr>
                          <td>Direct Publisher Sale</td>
                          <td>{authorData.sold - Math.round(authorData.sold * 0.52) - Math.round(authorData.sold * 0.29)} copies</td>
                          <td>19%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="section-title">
                  <h3>Detailed Monthly Sales</h3>
                  <button className="btn btn-soft" onClick={() => showToast('PDF report download demo')}>Download PDF</button>
                </div>
                <div className="table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Amazon</th>
                        <th>Flipkart</th>
                        <th>Direct</th>
                        <th>Total Copies</th>
                        <th>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...authorData.months].reverse().map((m, idx) => (
                        <tr key={idx}>
                          <td>{m.name} 2026</td>
                          <td>{Math.round(m.copies * .52)}</td>
                          <td>{Math.round(m.copies * .29)}</td>
                          <td>{m.copies - Math.round(m.copies * .52) - Math.round(m.copies * .29)}</td>
                          <td><b>{m.copies}</b></td>
                          <td><span className="status live">Available</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )

        case 'royalty':
          return (
            <>
              <div className="cards">
                {renderMetric('Royalty Rate', '45%', 'After printing/platform cost')}
                {renderMetric('Total Royalty', money(authorData.royalty), 'For current financial period')}
                {renderMetric('Pending', money(authorData.pending), 'Processing')}
                {renderMetric('Paid', money(authorData.paid), 'Completed')}
              </div>
              <div className="card">
                <div className="section-title">
                  <h3>Royalty Calculation</h3>
                  <button className="btn btn-soft" onClick={() => showToast('Royalty statement generated')}>Generate Statement</button>
                </div>
                {renderRoyaltyTable(authorData)}
              </div>
            </>
          )

        case 'documents':
          return (
            <div className="grid-3">
              <div className="card">
                <h3>Book Status</h3>
                <div className="steps">
                  <div className="step">
                    <div className="dot">✓</div>
                    <div>
                      <strong>ISBN Allotted</strong>
                      <small>{authorData.isbn}</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">✓</div>
                    <div>
                      <strong>Cover Design Completed</strong>
                      <small>Final print cover uploaded</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">✓</div>
                    <div>
                      <strong>Amazon Listing Live</strong>
                      <small>Book page active</small>
                    </div>
                  </div>
                  <div className="step muted">
                    <div className="dot">•</div>
                    <div>
                      <strong>Flipkart Listing</strong>
                      <small>Verification pending</small>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ gridColumn: 'span 2' }}>
                <h3>Downloads</h3>
                <div className="doc-list">
                  <div className="doc">
                    <b>Publication Certificate.pdf</b>
                    <button className="btn btn-soft" onClick={() => showToast('Certificate download demo')}>Download</button>
                  </div>
                  <div className="doc">
                    <b>Author Agreement.pdf</b>
                    <button className="btn btn-soft" onClick={() => showToast('Agreement download demo')}>Download</button>
                  </div>
                  <div className="doc">
                    <b>June Royalty Statement.pdf</b>
                    <button className="btn btn-soft" onClick={() => showToast('Statement download demo')}>Download</button>
                  </div>
                  <div className="doc">
                    <b>Book Cover PNG.jpg</b>
                    <button className="btn btn-soft" onClick={() => showToast('Cover download demo')}>Download</button>
                  </div>
                </div>
              </div>
            </div>
          )

        case 'support':
          const authorTickets = tickets.filter(t => t.authorEmail.toLowerCase() === authorData.email.toLowerCase())
          return (
            <div className="grid-2">
              <div className="card">
                <h3>New Query</h3>
                <div className="field">
                  <label>Subject</label>
                  <input value={supportSubject} onChange={(e) => setSupportSubject(e.target.value)} placeholder="Topic e.g. Payout Update" />
                </div>
                <div className="field">
                  <label>Message</label>
                  <textarea rows={6} value={supportMessage} onChange={(e) => setSupportMessage(e.target.value)} placeholder="Describe your issue..." />
                </div>
                <button className="btn btn-primary" onClick={handleSupportSubmit}>Submit Ticket</button>
              </div>
              <div className="card">
                <h3>Previous Tickets</h3>
                {authorTickets.length === 0 ? (
                  <p style={{ color: 'var(--muted)' }}>No tickets submitted yet.</p>
                ) : (
                  <div className="table-responsive">
                    <table>
                      <tbody>
                        {authorTickets.map((t, idx) => (
                          <tr key={idx}>
                            <td>{t.subject}</td>
                            <td>
                              <span className={`status ${t.status === 'Resolved' ? 'paid' : t.status === 'In Progress' ? 'live' : 'pending'}`}>
                                {t.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )

        case 'security':
          return (
            <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
              <div className="section-title">
                <h3>Change Password</h3>
              </div>
              <form onSubmit={handlePasswordUpdate}>
                <div className="field">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    value={currentPassword} 
                    onChange={(e) => setCurrentPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="field">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                  />
                </div>
                <div className="field">
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    value={confirmNewPassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Update Password</button>
              </form>
            </div>
          )

        default:
          return <div>Page not found</div>
      }
    }

    switch (page) {
      case 'adminOverview':
        const totalAuthors = authors.length
        const totalBooks = authors.length
        const totalPending = authors.reduce((sum, a) => sum + a.pending, 0)
        const openTicketsCount = tickets.filter(t => t.status !== 'Resolved').length

        const averageMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((monthName) => {
          const totalMonthCopies = authors.reduce((sum, a) => {
            const m = a.months.find(mon => mon.name === monthName)
            return sum + (m ? m.copies : 0)
          }, 0)
          return { name: monthName, copies: totalMonthCopies, gross: 0 }
        })

        const adminChartData: AuthorAccount = {
          id: 'admin',
          name: 'Admin',
          email: '',
          passwordHash: '',
          bookTitle: '',
          isbn: '',
          mrp: 0,
          sold: 0,
          royalty: 0,
          paid: 0,
          pending: 0,
          months: averageMonths,
          status: 'Active'
        }

        return (
          <>
            <div className="cards">
              {renderMetric('Total Authors', totalAuthors, 'All registered accounts')}
              {renderMetric('Published Books', totalBooks, 'Catalog records')}
              {renderMetric('Pending Payouts', money(totalPending), 'Awaiting approval')}
              {renderMetric('Open Tickets', openTicketsCount, 'Need response')}
            </div>
            <div className="grid-2">
              <div className="card">
                <div className="section-title">
                  <h3>Overall Monthly Sales</h3>
                  <button className="btn btn-soft" onClick={() => setPage('salesEntry')}>Add Sales</button>
                </div>
                {renderChart(adminChartData)}
              </div>
              <div className="card">
                <h3>Workflow</h3>
                <div className="steps">
                  <div className="step">
                    <div className="dot">1</div>
                    <div>
                      <strong>Add/Register Author</strong>
                      <small>New authors register or admin adds credentials</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">2</div>
                    <div>
                      <strong>Assign Book Details</strong>
                      <small>Set ISBN, MRP and listing links</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">3</div>
                    <div>
                      <strong>Add Monthly Sales</strong>
                      <small>Input sales reports in Sales Entry tab</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">4</div>
                    <div>
                      <strong>Approve Payments</strong>
                      <small>Processed payments reflect in author panel</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )

      case 'authors':
        return (
          <div className="grid-2">
            {/* Add New User Card */}
            <div className="card">
              <div className="section-title">
                <h3>Add New User (Author)</h3>
              </div>
              <form onSubmit={handleAdminAddUser}>
                <div className="field">
                  <label>Author Name</label>
                  <input 
                    type="text" 
                    value={adminNewName} 
                    onChange={(e) => setAdminNewName(e.target.value)} 
                    placeholder="e.g. Ramesh Kumar"
                    required 
                  />
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    value={adminNewEmail} 
                    onChange={(e) => setAdminNewEmail(e.target.value)} 
                    placeholder="e.g. ramesh@example.com"
                    required 
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input 
                    type="password" 
                    value={adminNewPassword} 
                    onChange={(e) => setAdminNewPassword(e.target.value)} 
                    placeholder="Set login password"
                    required 
                  />
                </div>
                <div className="field">
                  <label>Phone Number</label>
                  <input 
                    type="tel" 
                    value={adminNewPhone} 
                    onChange={(e) => setAdminNewPhone(e.target.value.replace(/\D/g, ''))} 
                    placeholder="e.g. 9958271481"
                    maxLength={10}
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add User</button>
              </form>
            </div>

            {/* Users Details List */}
            <div className="card">
              <div className="section-title">
                <h3>Users Details</h3>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Book</th>
                      <th style={{ textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((a) => (
                      <tr key={a.id}>
                        <td><b>{a.name}</b></td>
                        <td>{a.email}</td>
                        <td>{a.phoneNumber || 'N/A'}</td>
                        <td>{a.bookTitle}</td>
                        <td style={{ textAlign: 'center' }}>
                          <button 
                            className="btn" 
                            style={{ 
                              background: '#ef4444', 
                              color: '#fff', 
                              padding: '6px 12px', 
                              fontSize: '11px', 
                              borderRadius: '6px',
                              fontWeight: 'bold'
                            }}
                            onClick={() => handleAdminDeleteUser(a.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'books':
        return (
          <div className="card">
            <div className="section-title">
              <h3>Book Records Catalog</h3>
            </div>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Book Title</th>
                    <th>Author Name</th>
                    <th>ISBN</th>
                    <th>MRP</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((a) => (
                    <tr key={a.id}>
                      <td>{a.bookTitle}</td>
                      <td>{a.name}</td>
                      <td>{a.isbn}</td>
                      <td>₹{a.mrp}</td>
                      <td>
                        <span className={`status ${a.sold > 0 ? 'live' : 'draft'}`}>
                          {a.sold > 0 ? 'Published' : 'Listing Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'salesEntry':
        return (
          <div className="card">
            <h3>Add Monthly Sales Entry</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>
              Select an author and month to manually update their sales count.
            </p>
            <div className="form-grid">
              <div className="field">
                <label>Select Author & Book</label>
                <select id="salesAuthorId">
                  {authors.map(a => (
                    <option key={a.id} value={a.id}>{a.name} ({a.bookTitle})</option>
                  ))}
                </select>
              </div>
              <div className="field">
                <label>Select Month</label>
                <select id="salesMonth">
                  <option value="Jun">June 2026</option>
                  <option value="May">May 2026</option>
                  <option value="Apr">April 2026</option>
                  <option value="Mar">March 2026</option>
                </select>
              </div>
              <div className="field">
                <label>Copies Sold</label>
                <input id="salesCopies" type="number" defaultValue="10" />
              </div>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                const authorSelect = document.getElementById('salesAuthorId') as HTMLSelectElement
                const monthSelect = document.getElementById('salesMonth') as HTMLSelectElement
                const copiesInput = document.getElementById('salesCopies') as HTMLInputElement
                
                const targetId = authorSelect.value
                const mVal = monthSelect.value
                const copiesVal = parseInt(copiesInput.value) || 0

                setAuthors(prev => prev.map(a => {
                  if (a.id === targetId) {
                    const updatedMonths = a.months.map(m => {
                      if (m.name === mVal) {
                        const newCopies = m.copies + copiesVal
                        return { ...m, copies: newCopies, gross: newCopies * a.mrp }
                      }
                      return m
                    })
                    const totalSold = updatedMonths.reduce((sum, item) => sum + item.copies, 0)
                    const totalRoyalty = Math.round(totalSold * a.mrp * 0.45)
                    const pendingRoyalty = totalRoyalty - a.paid
                    return {
                      ...a,
                      months: updatedMonths,
                      sold: totalSold,
                      royalty: totalRoyalty,
                      pending: pendingRoyalty > 0 ? pendingRoyalty : 0
                    }
                  }
                  return a
                }))

                showToast(`Success: Logged ${copiesVal} copies for author!`)
              }}
            >
              Add Copies
            </button>
          </div>
        )

      case 'payments':
        return (
          <div className="card">
            <h3>Manage Author Royalty Payouts</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>
              Approve and mark payout clearances for pending royalties.
            </p>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Author Name</th>
                    <th>Pending Royalty</th>
                    <th>Total Paid Already</th>
                    <th>Clearance Action</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((a) => (
                    <tr key={a.id}>
                      <td>{a.name}</td>
                      <td>{money(a.pending)}</td>
                      <td>{money(a.paid)}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-soft"
                          style={{ padding: '6px 12px', fontSize: '12px' }}
                          disabled={a.pending <= 0}
                          onClick={() => {
                            const toPay = a.pending
                            setAuthors(prev => prev.map(item => {
                              if (item.id === a.id) {
                                return {
                                  ...item,
                                  paid: item.paid + toPay,
                                  pending: 0
                                }
                              }
                              return item
                            }))
                            showToast(`Cleared payment of ${money(toPay)} to ${a.name}!`)
                          }}
                        >
                          Approve Payment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return <div>Page not found</div>
    }
  }

  const renderRoyaltyTable = (authorData: AuthorAccount) => {
    return (
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Copies</th>
              <th>Gross Sale</th>
              <th>Printing/Platform Cost (55%)</th>
              <th>Royalty Earned (45%)</th>
              <th>Payout Status</th>
            </tr>
          </thead>
          <tbody>
            {[...authorData.months].reverse().map((m, idx) => {
              const gross = m.copies * authorData.mrp
              const ded = Math.round(gross * .55)
              const roy = gross - ded
              return (
                <tr key={idx}>
                  <td>{m.name} 2026</td>
                  <td>{m.copies}</td>
                  <td>{money(gross)}</td>
                  <td>{money(ded)}</td>
                  <td><b>{money(roy)}</b></td>
                  <td>
                    <span className={`status ${roy === 0 ? 'draft' : idx < 2 ? 'pending' : 'paid'}`}>
                      {roy === 0 ? 'No Sales' : idx < 2 ? 'Pending Payout' : 'Cleared'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="dashboard-root">
      {!isLoggedIn ? (
        <div className="login-wrap">
          <div className="login-card">
            <div className="hero">
              <div className="logo">
                <div className="animated-logo-container animated-logo-float" style={{ borderRadius: '14px' }}>
                  <img src={logoImg} alt="MB Publishers Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '14px' }} />
                </div>
                <span>MB Publishers</span>
              </div>
              <h1>Author Portal</h1>
              <p>
                लॉगिन करके अपनी बुक्स, सेल्स और रॉयल्टी रिपोर्ट्स देखें। यदि आप नए लेखक हैं, तो रजिस्टर करके अपना एकाउंट बनाएं।
              </p>
              <div className="feature-grid">
                <div className="feature">✓ Private Login Accounts</div>
                <div className="feature">✓ Sales and Royalty Tracking</div>
                <div className="feature">✓ Official Document Access</div>
                <div className="feature">✓ Real-time Support Queries</div>
              </div>
            </div>
            
            <div className="form-side">
              <div style={{ marginBottom: '20px', borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--ink)' }}>Log In</h3>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <button 
                  type="button"
                  className={`btn btn-soft ${loginMethod === 'email' ? 'active' : ''}`}
                  style={{ padding: '6px 12px', fontSize: '12px', flex: 1, borderRadius: '8px' }}
                  onClick={() => setLoginMethod('email')}
                >
                  Email Login
                </button>
                <button 
                  type="button"
                  className={`btn btn-soft ${loginMethod === 'otp' ? 'active' : ''}`}
                  style={{ padding: '6px 12px', fontSize: '12px', flex: 1, borderRadius: '8px' }}
                  onClick={() => setLoginMethod('otp')}
                >
                  Mobile OTP Login
                </button>
              </div>

              {loginMethod === 'email' ? (
                <form onSubmit={handleLoginSubmit}>
                  <div className="field">
                    <label>Login Type</label>
                    <select value={loginRole} onChange={handleRoleChange}>
                      <option value="author">Author Login</option>
                      <option value="admin">Publisher Admin Login</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="field">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div className="login-row">
                    <button type="submit" className="btn btn-primary">Log In</button>
                    <button type="button" className="btn btn-ghost" onClick={handleQuickAdmin}>Admin Demo</button>
                  </div>
                </form>
              ) : (
                <div>
                  {!otpSent ? (
                    <form onSubmit={handleSendOtp}>
                      <div className="field">
                        <label>Mobile Number</label>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{ padding: '14px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '14px', fontSize: '14px', color: 'var(--ink)' }}>+91</span>
                          <input 
                            type="tel" 
                            value={mobileNumber} 
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))} 
                            placeholder="Enter 10 digit number"
                            maxLength={10}
                            required 
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send OTP SMS</button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp}>
                      <div className="field">
                        <label>Enter 4-Digit OTP Code</label>
                        <input 
                          type="text" 
                          value={otpCode} 
                          onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))} 
                          placeholder="Enter 1234 for demo" 
                          maxLength={4}
                          required 
                        />
                        <small style={{ display: 'block', marginTop: '6px', color: 'var(--muted)' }}>
                          Demo Verification Code sent to +91 {mobileNumber}. Hint: 1234
                        </small>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button type="button" className="btn btn-ghost" style={{ flex: 1 }} onClick={() => setOtpSent(false)}>Back</button>
                        <button type="submit" className="btn btn-primary" style={{ flex: 1.5 }}>Verify & Login</button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              <div style={{ margin: '20px 0', textAlign: 'center', position: 'relative' }}>
                <hr style={{ border: 'none', borderTop: '1px solid var(--line)' }} />
                <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--card)', padding: '0 10px', fontSize: '12px', color: 'var(--muted)', fontWeight: 'bold' }}>
                  OR
                </span>
              </div>

              <button 
                type="button" 
                className="btn btn-ghost" 
                style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontWeight: 'bold' }}
                onClick={handleGoogleLogin}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.91c1.7-1.56 2.69-3.86 2.69-6.6z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.2l-2.91-2.26c-.8.54-1.83.86-3.05.86-2.34 0-4.32-1.58-5.03-3.7H1.02v2.33A9 9 0 0 0 9 18z"/>
                  <path fill="#FBBC05" d="M3.97 10.7a5.4 5.4 0 0 1 0-3.4V4.97H1.02a9 9 0 0 0 0 8.06l2.95-2.33z"/>
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2A9 9 0 0 0 1.02 4.97l2.95 2.33c.7-2.12 2.69-3.7 5.03-3.7z"/>
                </svg>
                Continue with Google
              </button>

              <div className="hint" style={{ marginTop: '16px' }}>
                Demo credentials:<br />
                Author: author@mbpublication.in / 123456<br />
                Admin: admin@mbpublication.in / 123456
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="shell">
          <aside className="sidebar">
            <div className="side-logo">
              <div className="animated-logo-container animated-logo-float" style={{ borderRadius: '12px' }}>
                <img src={logoImg} alt="MB Publishers Logo" style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '12px' }} />
              </div>
              <span>MB Publishers</span>
            </div>
            <nav className="nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={page === item.id ? 'active' : ''}
                  onClick={() => setPage(item.id)}
                >
                  <b>{item.icon}</b>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="side-footer">
              Demo portal only.<br />Real database configuration integrates database server API layers.
            </div>
          </aside>
          
          <main className="main">
            <div className="topbar">
              <div>
                <h2>{currentAuthor ? 'Author Dashboard' : 'Publisher Admin Panel'}</h2>
                <p>Welcome back</p>
              </div>
              <div className="profile">
                <div className="avatar">{currentAuthor ? currentAuthor.name.slice(0, 2).toUpperCase() : 'MB'}</div>
                <div>
                  <strong>{currentAuthor ? currentAuthor.name : 'MB Publication Admin'}</strong>
                  <br />
                  <small style={{ color: 'var(--muted)' }}>
                    {currentAuthor ? 'Author Account' : 'Publisher Admin Account'}
                  </small>
                </div>
                <button className="btn btn-soft" onClick={handleLogout}>Logout</button>
              </div>
            </div>
            
            <div id="content">
              {renderPageContent()}
            </div>
          </main>
        </div>
      )}

      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  )

  function handleRoleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedRole = e.target.value as 'author' | 'admin'
    setLoginRole(selectedRole)
    setEmail(selectedRole === 'admin' ? 'admin@mbpublication.in' : 'author@mbpublication.in')
  }
}

export default Dashboard
