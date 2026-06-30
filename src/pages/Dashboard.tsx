import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import logoImg from '../assets/Logo1.png'
import { supabase } from '../lib/supabaseClient'

const formatSaleDate = (dateStr: string) => {
  if (!dateStr) return 'N/A';
  if (dateStr.includes('-')) {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }
  }
  return `${dateStr} 2026`;
};

interface MonthSales {
  name: string;
  copies: number;
  gross: number;
  royalty?: number;
  status?: 'Pending' | 'Paid';
  bookTitle?: string;
  mrp?: number;
  isbn?: string;
  totalCopies?: number;
  paid?: number;
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
  status: 'Resolved' | 'In Progress' | 'Pending' | 'Read';
}

const DEFAULT_AUTHORS: AuthorAccount[] = []

const DEFAULT_TICKETS: SupportTicket[] = []

export const Dashboard: React.FC = () => {
  const [authors, setAuthors] = useState<AuthorAccount[]>([])
  const [tickets, setTickets] = useState<SupportTicket[]>([])

  // Load and seed database helper
  const loadData = async () => {
    try {
      let { data: authorsData, error: authorsErr } = await supabase
        .from('authors')
        .select('*, monthly_sales(*)');

      if (authorsErr) {
        console.error("Error fetching authors:", authorsErr.message);
        return;
      }



      if (authorsData) {
        const mapped = authorsData.map((a: any) => {
          const months = (a.monthly_sales || []).map((m: any) => ({
            name: m.month_name,
            copies: m.copies,
            gross: Number(m.gross),
            royalty: Number(m.royalty),
            totalCopies: m.total_copies,
            paid: Number(m.paid),
            bookTitle: a.book_title,
            mrp: Number(a.mrp),
            isbn: a.isbn
          }));

          // Sort months chronologically
          months.sort((m1: any, m2: any) => {
            const d1 = new Date(m1.name).getTime();
            const d2 = new Date(m2.name).getTime();
            return d1 - d2;
          });

          const sold = months.reduce((acc: number, curr: any) => acc + curr.copies, 0);
          const royalty = months.reduce((acc: number, curr: any) => acc + (curr.royalty || 0), 0);
          const paid = months.reduce((acc: number, curr: any) => acc + (curr.paid || 0), 0);
          const pending = Math.max(0, royalty - paid);

          return {
            id: a.id,
            name: a.name,
            email: a.email,
            passwordHash: a.password_hash,
            bookTitle: a.book_title,
            isbn: a.isbn,
            mrp: Number(a.mrp),
            sold,
            royalty,
            paid,
            pending,
            months,
            status: a.status,
            phoneNumber: a.phone_number
          };
        });
        setAuthors(mapped);
      }

      const { data: ticketsData } = await supabase
        .from('support_tickets')
        .select('*');

      if (ticketsData) {
        setTickets(ticketsData.map((t: any) => ({
          id: t.id,
          authorEmail: t.author_email,
          subject: t.subject,
          message: t.message,
          status: t.status
        })));
      }
    } catch (e: any) {
      console.error("Load Database Error:", e.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginRole, setLoginRole] = useState<'author' | 'admin'>('author')
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login')
  const [loginMethod, setLoginMethod] = useState<'email' | 'otp'>('email')
  
  // Credentials input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  // Admin "Payment Update" state inputs
  const [payUpdateAuthorId, setPayUpdateAuthorId] = useState('')
  const [payUpdateCopies, setPayUpdateCopies] = useState('')
  const [payUpdatePaid, setPayUpdatePaid] = useState('')
  
  // Admin "Payments Report" filter
  const [paymentFilterAuthorId, setPaymentFilterAuthorId] = useState('all')

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
      // Author login verification against dynamically loaded authors
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
    if (authors.length === 0) {
      showToast('No registered authors found in database!')
      return
    }
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
      if (authors.length === 0) {
        showToast('No registered authors found in database!')
        return
      }
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
  const handleRegisterSubmit = async (e: React.FormEvent) => {
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

    const newId = `author-${Date.now()}`
    const bookTitleVal = regBook || 'अघोषित पुस्तक (TBD)'

    const { error } = await supabase
      .from('authors')
      .insert({
        id: newId,
        name: regName,
        email: regEmail,
        password_hash: regPassword,
        book_title: bookTitleVal,
        isbn: '978-93-00000-XX-X',
        mrp: 250,
        phone_number: '',
        status: 'Active'
      })

    if (!error) {
      await loadData()
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
    } else {
      showToast(`Registration failed: ${error.message}`)
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentAuthor(null)
    setPage('overview')
  }

  // Admin: Add new user/author
  const handleAdminAddUser = async (e: React.FormEvent) => {
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

    const newId = `author-${Date.now()}`
    const { error } = await supabase
      .from('authors')
      .insert({
        id: newId,
        name: adminNewName,
        email: adminNewEmail,
        password_hash: adminNewPassword,
        book_title: 'अघोषित पुस्तक (TBD)',
        isbn: '978-93-00000-XX-X',
        mrp: 250,
        phone_number: adminNewPhone,
        status: 'Active'
      })

    if (!error) {
      await loadData()
      showToast(`Author "${adminNewName}" added successfully!`)

      setAdminNewName('')
      setAdminNewEmail('')
      setAdminNewPassword('')
      setAdminNewPhone('')
    } else {
      showToast(`Error: ${error.message}`)
    }
  }

  // Admin: Delete user/author
  const handleAdminDeleteUser = async (authorId: string) => {
    const authorToDelete = authors.find(a => a.id === authorId)
    if (!authorToDelete) return

    if (window.confirm(`Are you sure you want to delete author "${authorToDelete.name}"?`)) {
      const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', authorId)

      if (!error) {
        await loadData()
        showToast(`Author "${authorToDelete.name}" deleted successfully!`)
      } else {
        showToast(`Error deleting author: ${error.message}`)
      }
    }
  }

  // Admin: Payment Update Submit
  const handlePaymentUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const targetId = payUpdateAuthorId || (authors[0]?.id || '')
    if (!targetId) {
      showToast('Error: No author selected!')
      return
    }

    const targetAuthor = authors.find(a => a.id === targetId)
    if (!targetAuthor) {
      showToast('Error: Author not found!')
      return
    }

    const copiesVal = Math.max(0, parseInt(payUpdateCopies) || 0)
    const paidVal = Math.max(0, parseFloat(payUpdatePaid) || 0)

    const { data: salesData, error: fetchErr } = await supabase
      .from('monthly_sales')
      .select('id')
      .eq('author_id', targetId)
      .order('month_name', { ascending: false })
      .limit(1)

    if (fetchErr) {
      showToast(`Error: ${fetchErr.message}`)
      return
    }

    if (salesData && salesData.length > 0) {
      const latestSaleId = salesData[0].id
      const grossVal = copiesVal * targetAuthor.mrp
      const royaltyVal = Math.round(copiesVal * targetAuthor.mrp * 0.4)

      const { error: updateErr } = await supabase
        .from('monthly_sales')
        .update({
          copies: copiesVal,
          gross: grossVal,
          royalty: royaltyVal,
          paid: paidVal
        })
        .eq('id', latestSaleId)

      if (!updateErr) {
        await loadData()
        showToast(`Success: Updated sales & payment info for "${targetAuthor.name}"!`)
        setPayUpdateCopies('')
        setPayUpdatePaid('')
      } else {
        showToast(`Failed to update payments: ${updateErr.message}`)
      }
    } else {
      showToast("Error: No sales entry found to update for this author! Please add a sales entry first.")
    }
  }

  // Author: Change password
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentAuthor) return

    if (currentAuthor.passwordHash !== currentPassword) {
      showToast('Access Denied: Current password is incorrect!')
      return
    }

    if (newPassword !== confirmNewPassword) {
      showToast('Error: New passwords do not match!')
      return
    }

    const { error } = await supabase
      .from('authors')
      .update({ password_hash: newPassword })
      .eq('id', currentAuthor.id)

    if (!error) {
      await loadData()
      setCurrentAuthor({
        ...currentAuthor,
        passwordHash: newPassword
      })
      setCurrentPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
      showToast('Password updated successfully!')
    } else {
      showToast(`Failed to update password: ${error.message}`)
    }
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

  const handleSupportSubmit = async () => {
    if (!supportSubject || !supportMessage) {
      showToast('Please fill out subject and message.')
      return
    }
    const newId = `t-${Date.now()}`
    const { error } = await supabase
      .from('support_tickets')
      .insert({
        id: newId,
        author_email: currentAuthor ? currentAuthor.email : 'unknown',
        subject: supportSubject,
        message: supportMessage,
        status: 'Pending'
      })

    if (!error) {
      await loadData()
      showToast('Support ticket submitted successfully!')
      setSupportSubject('')
      setSupportMessage('')
    } else {
      showToast(`Failed to submit ticket: ${error.message}`)
    }
  }

  const authorNav = [
    { id: 'overview', icon: '📊', label: 'Overview' },
    { id: 'sales', icon: '📈', label: 'Sales' },
    { id: 'support', icon: '💬', label: 'Support' },
    { id: 'security', icon: '🔑', label: 'Security' }
  ]

  const adminNav = [
    { id: 'adminOverview', icon: '📊', label: 'Overview' },
    { id: 'authors', icon: '👤', label: 'Authors' },
    { id: 'books', icon: '📚', label: 'Books' },
    { id: 'addEntries', icon: '➕', label: 'Add Section' },
    { id: 'payments', icon: '₹', label: 'Payments' },
    { id: 'queries', icon: '💬', label: 'Support Tickets' },
    { id: 'help', icon: '❓', label: 'Help Section' }
  ]

  const navItems = currentAuthor ? authorNav : adminNav

  const renderPageContent = () => {
    if (currentAuthor) {
      const authorData = authors.find(a => a.id === currentAuthor.id) || currentAuthor

      switch (page) {
        case 'overview':
          const activeOverviewMonths = authorData.months.filter((m) => {
            const hasCopies = m.copies > 0
            const hasTotalCopies = m.totalCopies !== undefined && m.totalCopies > 0
            const hasRoyalty = m.royalty !== undefined && m.royalty > 0
            const hasMrp = m.mrp !== undefined && m.mrp > 0
            return hasCopies || hasTotalCopies || hasRoyalty || hasMrp
          })

          activeOverviewMonths.sort((r1, r2) => {
            const d1 = new Date(r1.name).getTime()
            const d2 = new Date(r2.name).getTime()
            return d1 - d2
          })

          if (activeOverviewMonths.length === 0) {
            return (
              <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📚</div>
                <h3>No Published Books or Sales Yet</h3>
                <p style={{ marginTop: '10px', maxWidth: '500px', margin: '10px auto 0', lineHeight: '1.6' }}>
                  Welcome! Your book details, sales chart, and royalty reports will be displayed here once the publisher admin logs your first monthly sales entry.
                </p>
              </div>
            )
          }

          const totalCopiesSold = activeOverviewMonths.reduce((sum, m) => sum + (m.copies || 0), 0)
          const totalRoyaltyVal = activeOverviewMonths.reduce((sum, m) => sum + (m.royalty || 0), 0)
          const totalPaidVal = activeOverviewMonths.reduce((sum, m) => sum + (m.paid || 0), 0)
          const totalPendingVal = Math.max(0, totalRoyaltyVal - totalPaidVal)

          return (
            <>
              <div className="cards">
                {renderMetric('Total Copies Sold', totalCopiesSold, 'Logged entries total')}
                {renderMetric('Total Royalty', money(totalRoyaltyVal), 'Calculated royalty')}
                {renderMetric('Paid Amount', money(totalPaidVal), 'Completed payouts')}
                {renderMetric('Pending Amount', money(totalPendingVal), 'Payout process status')}
              </div>
              <div className="grid-2">
                <div className="card">
                  <div className="section-title">
                    <h3>Monthly Sales</h3>
                    <span className="status live">Live Report</span>
                  </div>
                  {renderChart({ months: activeOverviewMonths } as any)}
                </div>
                <div className="card">
                  <div className="section-title">
                    <h3>My Book</h3>
                    <span className="status live">Published</span>
                  </div>
                  <div className="book-card">
                    <div className="cover">{(activeOverviewMonths[0]?.bookTitle || authorData.bookTitle).slice(0, 10)}</div>
                    <div>
                      <h4>{activeOverviewMonths[0]?.bookTitle || authorData.bookTitle}</h4>
                      <p><b>Author:</b> {authorData.name}</p>
                      <p><b>ISBN:</b> {activeOverviewMonths[0]?.isbn || authorData.isbn}</p>
                      <p><b>MRP:</b> ₹{activeOverviewMonths[0]?.mrp || authorData.mrp}</p>
                      <p><b>Links:</b> Amazon • Flipkart</p>
                      <div className="progress">
                        <span style={{ width: totalCopiesSold > 0 ? '78%' : '20%' }}></span>
                      </div>
                      <p>Publishing workflow: {totalCopiesSold > 0 ? '78% complete' : 'Ready'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )

        case 'sales':
          const activeSalesMonths = authorData.months.filter((m) => {
            const hasCopies = m.copies > 0
            const hasTotalCopies = m.totalCopies !== undefined && m.totalCopies > 0
            const hasRoyalty = m.royalty !== undefined && m.royalty > 0
            const hasMrp = m.mrp !== undefined && m.mrp > 0
            return hasCopies || hasTotalCopies || hasRoyalty || hasMrp
          })

          activeSalesMonths.sort((r1, r2) => {
            const d1 = new Date(r1.name).getTime()
            const d2 = new Date(r2.name).getTime()
            return d1 - d2
          })

          if (activeSalesMonths.length === 0) {
            return (
              <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--muted)' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>📈</div>
                <h3>Sales Reports Unavailable</h3>
                <p style={{ marginTop: '10px', maxWidth: '500px', margin: '10px auto 0', lineHeight: '1.6' }}>
                  No sales entries have been logged by the publisher admin yet. Please check back later.
                </p>
              </div>
            )
          }

          return (
            <div className="card">
              <div className="section-title">
                <h3>Detailed Sales</h3>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Book Title</th>
                      <th>ISBN</th>
                      <th>MRP</th>
                      <th>Total Copies</th>
                      <th>Copies Sold</th>
                      <th>Total Royalty</th>
                      <th>Paid Royalty</th>
                      <th>Pending Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSalesMonths.map((m, idx) => {
                      const rowMrp = m.mrp !== undefined ? m.mrp : authorData.mrp
                      const rowIsbn = m.isbn !== undefined ? m.isbn : authorData.isbn
                      const rowTotalCopies = m.totalCopies !== undefined ? m.totalCopies : 0
                      const rowMonthCopiesSold = m.copies || 0
                      const rowTotalRoyalty = m.royalty !== undefined ? m.royalty : 0
                      const rowPaidRoyalty = m.paid !== undefined ? m.paid : 0
                      const rowPendingRoyalty = Math.max(0, rowTotalRoyalty - rowPaidRoyalty)

                      return (
                        <tr key={idx}>
                          <td>{formatSaleDate(m.name)}</td>
                          <td>{m.bookTitle || authorData.bookTitle}</td>
                          <td>{rowIsbn}</td>
                          <td>{money(rowMrp)}</td>
                          <td>{rowTotalCopies}</td>
                          <td>{rowMonthCopiesSold}</td>
                          <td>{money(rowTotalRoyalty)}</td>
                          <td>{money(rowPaidRoyalty)}</td>
                          <td><b>{money(rowPendingRoyalty)}</b></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
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
                              <span className={`status ${t.status === 'Read' ? 'paid' : 'pending'}`}>
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
        const totalPaidAmount = authors.reduce((sum, a) => sum + (a.paid || 0), 0)

        // Compile active months chart data dynamically
        const activeMonthsMap: { [key: string]: { dateStr: string; copies: number } } = {}
        authors.forEach(a => {
          a.months.forEach(m => {
            const hasCopies = m.copies > 0
            const hasTotalCopies = m.totalCopies !== undefined && m.totalCopies > 0
            const hasRoyalty = m.royalty !== undefined && m.royalty > 0
            const hasMrp = m.mrp !== undefined && m.mrp > 0
            if (hasCopies || hasTotalCopies || hasRoyalty || hasMrp) {
              const label = formatSaleDate(m.name)
              if (!activeMonthsMap[label]) {
                activeMonthsMap[label] = { dateStr: m.name, copies: 0 }
              }
              activeMonthsMap[label].copies += m.copies || 0
            }
          })
        })

        const chartDataArray = Object.keys(activeMonthsMap).map(label => ({
          name: label,
          dateStr: activeMonthsMap[label].dateStr,
          copies: activeMonthsMap[label].copies
        }))

        // Sort by dateStr ascending order
        chartDataArray.sort((a, b) => {
          const d1 = new Date(a.dateStr).getTime()
          const d2 = new Date(b.dateStr).getTime()
          return d1 - d2
        })

        return (
          <>
            <div className="cards">
              {renderMetric('Total Authors', totalAuthors, 'All registered accounts')}
              {renderMetric('Published Books', totalBooks, 'Catalog records')}
              {renderMetric('Total Payouts', money(totalPaidAmount), 'Paid royalty')}
              {renderMetric('Pending Payouts', money(totalPending), 'Awaiting approval')}
            </div>
            <div className="grid-2">
              <div className="card">
                <div className="section-title">
                  <h3>Overall Monthly Sales</h3>
                  <button className="btn btn-soft" onClick={() => setPage('addEntries')}>Add Sales</button>
                </div>
                {chartDataArray.length === 0 ? (
                  <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: '14px' }}>
                    No sales logged yet. Chart will appear here once entries are added.
                  </div>
                ) : (
                  renderChart({ months: chartDataArray } as any)
                )}
              </div>
              <div className="card">
                <h3>Workflow</h3>
                <div className="steps">
                  <div className="step">
                    <div className="dot">1</div>
                    <div>
                      <strong>Register Author</strong>
                      <small>Admin tab me author aur book register karein.</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">2</div>
                    <div>
                      <strong>Add Sales Entry</strong>
                      <small>Date, stock aur royalty fill karein (sold copies defaults to 0).</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">3</div>
                    <div>
                      <strong>Payment Update</strong>
                      <small>Biki hui copies aur paid amount log karein.</small>
                    </div>
                  </div>
                  <div className="step">
                    <div className="dot">4</div>
                    <div>
                      <strong>Auto-Calculations</strong>
                      <small>Dynamic pending amount aur catalog records automatic update honge.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )

      case 'authors':
        return (
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
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((a) => (
                    <tr key={a.id}>
                      <td><b>{a.name}</b></td>
                      <td>{a.email}</td>
                      <td>{a.phoneNumber || 'N/A'}</td>
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
                    <th>Total Copies</th>
                    <th>Total Royalty</th>
                  </tr>
                </thead>
                <tbody>
                  {authors.map((a) => {
                    const totalPrinted = a.months.reduce((sum, m) => sum + (m.totalCopies || 0), 0)
                    return (
                      <tr key={a.id}>
                        <td>{a.bookTitle}</td>
                        <td>{a.name}</td>
                        <td>{a.isbn}</td>
                        <td>₹{a.mrp}</td>
                        <td>{totalPrinted}</td>
                        <td>{money(a.royalty)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'addEntries':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
            {/* Add New User Card */}
            <div className="card">
              <div className="section-title">
                <h3>Add New User (Author)</h3>
              </div>
              <form onSubmit={handleAdminAddUser}>
                <div className="form-grid">
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
                      type="text" 
                      value={adminNewPassword} 
                      onChange={(e) => setAdminNewPassword(e.target.value)} 
                      placeholder="Enter password"
                      required 
                    />
                  </div>
                  <div className="field">
                    <label>Phone Number (Optional)</label>
                    <input 
                      type="text" 
                      value={adminNewPhone} 
                      onChange={(e) => setAdminNewPhone(e.target.value)} 
                      placeholder="e.g. 9876543210"
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Add User</button>
              </form>
            </div>

            {/* Add Monthly Sales Card */}
            <div className="card">
              <div className="section-title">
                <h3>Add Monthly Sales Entry</h3>
              </div>
              <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>
                Select an author, enter the book name, MRP, ISBN, select date, and total royalty.
              </p>
              <div className="form-grid">
                <div className="field">
                  <label>Select Author</label>
                  <select id="salesAuthorId">
                    {authors.map(a => (
                      <option key={a.id} value={a.id}>{a.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Book Name / Title</label>
                  <input id="salesBookTitle" type="text" placeholder="e.g. मेरे सपनों का भारत" required />
                </div>
                <div className="field">
                  <label>MRP (₹)</label>
                  <input id="salesMrp" type="number" min="0" placeholder="e.g. 299" required />
                </div>
                <div className="field">
                  <label>ISBN</label>
                  <input id="salesIsbn" type="text" placeholder="e.g. 978-93-..." required />
                </div>
                <div className="field">
                  <label>Select Date</label>
                  <input 
                    id="salesDate" 
                    type="date" 
                    defaultValue={new Date().toISOString().split('T')[0]} 
                    required 
                  />
                </div>
                <div className="field">
                  <label>Total Copies (Printed Stock)</label>
                  <input id="salesTotalCopies" type="number" min="0" defaultValue="8" required />
                </div>
                <div className="field">
                  <label>Total Royalty (₹)</label>
                  <input id="salesRoyalty" type="number" min="0" placeholder="e.g. 1520" required />
                </div>
              </div>
              <button
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '16px' }}
                onClick={() => {
                  const authorSelect = document.getElementById('salesAuthorId') as HTMLSelectElement
                  const bookTitleInput = document.getElementById('salesBookTitle') as HTMLInputElement
                  const mrpInput = document.getElementById('salesMrp') as HTMLInputElement
                  const isbnInput = document.getElementById('salesIsbn') as HTMLInputElement
                  const dateInput = document.getElementById('salesDate') as HTMLInputElement
                  const totalCopiesInput = document.getElementById('salesTotalCopies') as HTMLInputElement
                  const royaltyInput = document.getElementById('salesRoyalty') as HTMLInputElement
                  
                  const targetId = authorSelect.value
                  const bookTitleVal = bookTitleInput.value.trim()
                  const mrpVal = Math.max(0, parseFloat(mrpInput.value) || 0)
                  const isbnVal = isbnInput.value.trim()
                  const dateVal = dateInput.value
                  const totalCopiesVal = Math.max(0, parseInt(totalCopiesInput.value) || 0)
                  const royaltyVal = Math.max(0, parseFloat(royaltyInput.value) || 0)

                  if (!bookTitleVal) {
                    showToast('Please enter a book name!')
                    return
                  }
                  if (mrpInput.value === '') {
                    showToast('Please enter MRP!')
                    return
                  }
                  if (!isbnVal) {
                    showToast('Please enter ISBN!')
                    return
                  }
                  if (!dateVal) {
                    showToast('Please select a date!')
                    return
                  }
                  if (royaltyInput.value === '') {
                    showToast('Please enter total royalty!')
                    return
                  }

                  (async () => {
                    const { error } = await supabase
                      .from('monthly_sales')
                      .insert({
                        author_id: targetId,
                        month_name: dateVal,
                        copies: 0,
                        gross: 0,
                        royalty: royaltyVal,
                        total_copies: totalCopiesVal,
                        paid: 0
                      });

                    const { error: authorErr } = await supabase
                      .from('authors')
                      .update({
                        book_title: bookTitleVal,
                        mrp: mrpVal,
                        isbn: isbnVal
                      })
                      .eq('id', targetId);

                    if (!error && !authorErr) {
                      await loadData();
                      showToast(`Success: Logged sales and updated book details!`);
                      bookTitleInput.value = '';
                      mrpInput.value = '';
                      isbnInput.value = '';
                      totalCopiesInput.value = '';
                      royaltyInput.value = '';
                    } else {
                      showToast(`Failed to log sales: ${(error || authorErr)?.message}`);
                    }
                  })();
                }}
              >
                Add Copies
              </button>
            </div>

            {/* Payment Update Card */}
            <div className="card">
              <div className="section-title">
                <h3>Payment Update</h3>
              </div>
              <p style={{ color: 'var(--muted)', marginBottom: '18px' }}>
                Select a book to update copies sold and paid royalty.
              </p>
              
              <div className="field">
                <label>Select Book</label>
                <select 
                  value={payUpdateAuthorId || (authors[0]?.id || '')} 
                  onChange={(e) => setPayUpdateAuthorId(e.target.value)}
                >
                  {authors.map(a => (
                    <option key={a.id} value={a.id}>{a.bookTitle}</option>
                  ))}
                </select>
              </div>

              {(() => {
                const targetAuthorId = payUpdateAuthorId || (authors[0]?.id || '')
                const targetAuthor = authors.find(a => a.id === targetAuthorId)
                if (!targetAuthor) return null

                // Get latest active month info
                const latestMonth = targetAuthor.months[targetAuthor.months.length - 1]

                return (
                  <div style={{ background: 'var(--soft)', padding: '14px', borderRadius: '14px', fontSize: '13px', margin: '14px 0', border: '1px solid var(--line)', lineHeight: '1.6' }}>
                    <p><b>Author:</b> {targetAuthor.name}</p>
                    <p><b>MRP:</b> ₹{targetAuthor.mrp}</p>
                    <p><b>ISBN:</b> {targetAuthor.isbn}</p>
                    <p><b>Month:</b> {latestMonth?.name || 'N/A'}</p>
                    <p><b>Total Copies (Printed):</b> {latestMonth?.totalCopies || 0}</p>
                    <p><b>Month Copies Sold:</b> {latestMonth?.copies || 0}</p>
                    <p><b>Total Royalty:</b> {money(latestMonth?.royalty || 0)}</p>
                    <p><b>Paid Royalty:</b> {money(latestMonth?.paid || 0)}</p>
                  </div>
                )
              })()}

              <form onSubmit={handlePaymentUpdateSubmit}>
                <div className="form-grid">
                  <div className="field">
                    <label>Month Copies Sold</label>
                    <input 
                      type="number" 
                      min="0"
                      value={payUpdateCopies} 
                      onChange={(e) => setPayUpdateCopies(e.target.value.replace(/[^0-9]/g, ''))} 
                      placeholder="e.g. 7" 
                      required 
                    />
                  </div>
                  <div className="field">
                    <label>Paid Royalty (₹)</label>
                    <input 
                      type="number" 
                      min="0"
                      value={payUpdatePaid} 
                      onChange={(e) => setPayUpdatePaid(e.target.value.replace(/[^0-9.]/g, ''))} 
                      placeholder="e.g. 1400" 
                      required 
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>Update Payment</button>
              </form>
            </div>
          </div>
        )

      case 'payments':
        const rows: {
          author: AuthorAccount;
          month: MonthSales;
        }[] = []

        authors.forEach(a => {
          if (paymentFilterAuthorId !== 'all' && a.id !== paymentFilterAuthorId) {
            return
          }
          a.months.forEach((m) => {
            const hasCopies = m.copies > 0
            const hasTotalCopies = m.totalCopies !== undefined && m.totalCopies > 0
            const hasRoyalty = m.royalty !== undefined && m.royalty > 0
            const hasMrp = m.mrp !== undefined && m.mrp > 0
            if (hasCopies || hasTotalCopies || hasRoyalty || hasMrp) {
              rows.push({ author: a, month: m })
            }
          })
        })

        rows.sort((r1, r2) => {
          const d1 = new Date(r1.month.name).getTime()
          const d2 = new Date(r2.month.name).getTime()
          return d1 - d2
        })

        return (
          <div className="card">
            <div className="section-title">
              <h3>Manage Author Payouts & Reports</h3>
            </div>
            
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label style={{ fontWeight: 'bold', fontSize: '14px', color: 'var(--ink)' }}>Filter by Author:</label>
              <select 
                value={paymentFilterAuthorId} 
                onChange={(e) => setPaymentFilterAuthorId(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--ink)', fontSize: '14px', outline: 'none', minWidth: '200px', cursor: 'pointer' }}
              >
                <option value="all">All Authors</option>
                {authors.map(a => (
                  <option key={a.id} value={a.id}>{a.name}</option>
                ))}
              </select>
            </div>

            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Date / Month</th>
                    <th>Book Name</th>
                    <th>MRP (₹)</th>
                    <th>Total Copies</th>
                    <th>Month Copies Sold</th>
                    <th>Total Royalty</th>
                    <th>Paid Royalty</th>
                    <th>Pending Royalty</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={8} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
                        No monthly sales logged yet.
                      </td>
                    </tr>
                  ) : (
                    rows.map((row, idx) => {
                      const a = row.author
                      const m = row.month
                      
                      const rowMrp = m.mrp !== undefined ? m.mrp : a.mrp
                      const rowTotalCopies = m.totalCopies !== undefined ? m.totalCopies : 0
                      const rowMonthCopiesSold = m.copies || 0
                      const rowTotalRoyalty = m.royalty !== undefined ? m.royalty : 0
                      const rowPaidRoyalty = m.paid !== undefined ? m.paid : 0
                      const rowPendingRoyalty = Math.max(0, rowTotalRoyalty - rowPaidRoyalty)

                      return (
                        <tr key={`${a.id}-${m.name}-${idx}`}>
                          <td>{formatSaleDate(m.name)}</td>
                          <td>{m.bookTitle || a.bookTitle}</td>
                          <td>{money(rowMrp)}</td>
                          <td>{rowTotalCopies}</td>
                          <td>{rowMonthCopiesSold}</td>
                          <td>{money(rowTotalRoyalty)}</td>
                          <td>{money(rowPaidRoyalty)}</td>
                          <td><b>{money(rowPendingRoyalty)}</b></td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )

      case 'queries':
        return (
          <div className="card">
            <div className="section-title">
              <h3>Support Tickets & Queries</h3>
            </div>
            {tickets.length === 0 ? (
              <p style={{ color: 'var(--muted)', padding: '20px 0' }}>No support queries submitted by authors yet.</p>
            ) : (
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Author</th>
                      <th>Subject</th>
                      <th>Message</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t) => (
                      <tr key={t.id}>
                        <td>{t.authorEmail}</td>
                        <td><b>{t.subject}</b></td>
                        <td>{t.message}</td>
                        <td>
                          <select
                            value={t.status === 'Resolved' || t.status === 'Read' ? 'Read' : 'Pending'}
                            onChange={async (e) => {
                              const newStatus = e.target.value === 'Read' ? 'Read' : 'Pending'
                              const { error } = await supabase
                                .from('support_tickets')
                                .update({ status: newStatus })
                                .eq('id', t.id)
                              
                              if (!error) {
                                await loadData()
                                showToast(`Ticket status updated to ${newStatus}`)
                              } else {
                                showToast(`Failed to update ticket: ${error.message}`)
                              }
                            }}
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              borderRadius: '6px',
                              border: '1px solid var(--line)',
                              background: 'var(--soft)',
                              color: 'var(--ink)'
                            }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Read">Read</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )
      
      case 'help':
        return (
          <div className="card" style={{ lineHeight: '1.8' }}>
            <div className="section-title">
              <h3>Help & Workflow Guide</h3>
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '8px' }}>Step 1: User Registration (Author Account)</h4>
              <p style={{ color: 'var(--ink)', fontSize: '14px', marginBottom: '16px' }}>
                Admin sabse pehle <strong>"Add Section"</strong> tab me jata hai aur <strong>"Add New User (Author)"</strong> form me credentials (Name, Email, Password, Phone) fill karke user register karta hai. Yeh author register hote hi baaki dropdowns me active ho jata hai.
              </p>

              <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '8px' }}>Step 2: Add Monthly Sales Entry (Initial Sale Logging)</h4>
              <p style={{ color: 'var(--ink)', fontSize: '14px', marginBottom: '16px' }}>
                Admin <strong>"Add Section"</strong> me <strong>"Add Monthly Sales Entry"</strong> form par jata hai. Waha dropdown se Author select karke Book Name, MRP, ISBN, Select Date, Total Copies (Printed Stock) aur Total Royalty (₹) bhar kar submit karta hai. <br />
                <em>Note: Nayi entry hone par Month Copies Sold automatic 0 aur Paid Royalty ₹0 set ho jati hai, aur report me poori royalty pending dikhti hai.</em>
              </p>

              <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '8px' }}>Step 3: Payment Update (Sales & Payout Log)</h4>
              <p style={{ color: 'var(--ink)', fontSize: '14px', marginBottom: '16px' }}>
                Jab book bikna shuru ho aur admin author ko pay kare, tab wo <strong>"Add Section"</strong> tab me <strong>"Payment Update"</strong> form par jata hai. Waha dropdown se book select karke (sirf Book Name dikhega), uske niche details check karta hai aur sirf 2 fields bharta hai: <strong>Month Copies Sold</strong> aur <strong>Paid Royalty (₹)</strong>.
              </p>

              <h4 style={{ color: 'var(--primary)', fontSize: '16px', marginBottom: '8px' }}>Step 4: Payments Report & Books Catalog (Viewing & Calculations)</h4>
              <p style={{ color: 'var(--ink)', fontSize: '14px', marginBottom: '16px' }}>
                <strong>Payments Tab (Report Section):</strong> Yaha par biki hui copies, paid amount aur pending amount (Total Royalty - Paid Royalty) auto-calculate hokar choti date se badi date ke order me show hoti hai. Empty default months yaha show nahi hote.<br />
                <strong>Books Tab (Book Records Catalog):</strong> Status pill ki jagah ab book ki Total Copies (Printed Stock) aur Total Royalty live show hoti hai.<br />
                <strong>Author Portal Linking:</strong> Author dashboard me login karke apni details dekh sakega, jisme status "Pending Payout" ya "Cleared" automatic updates dikhega.
              </p>
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
              const rowMrp = m.mrp !== undefined ? m.mrp : authorData.mrp
              const gross = m.copies * rowMrp
              const roy = m.royalty !== undefined ? m.royalty : (gross - Math.round(gross * .55))
              const ded = gross - roy
              const rowPaid = m.paid !== undefined ? m.paid : 0
              const rowPending = Math.max(0, roy - rowPaid)
              const statusVal = roy === 0 ? 'No Sales' : rowPending === 0 ? 'Cleared' : 'Pending Payout'
              const statusClass = roy === 0 ? 'draft' : rowPending === 0 ? 'paid' : 'pending'
              return (
                <tr key={idx}>
                  <td>{formatSaleDate(m.name)}</td>
                  <td>{m.copies}</td>
                  <td>{money(gross)}</td>
                  <td>{money(ded)}</td>
                  <td><b>{money(roy)}</b></td>
                  <td>
                    <span className={`status ${statusClass}`}>
                      {statusVal}
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
                लॉगिन करके अपनी बुक्स, सेल्स और रॉयल्टी रिपोर्ट्स देखें।
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
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--ink)' }}>Account Log In</h3>
              </div>

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
                <div className="login-row" style={{ display: 'block' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Log In</button>
                </div>
              </form>
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
              © 2025 MB Publishers.<br />All Rights Reserved.
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
    setEmail('')
    setPassword('')
  }
}

export default Dashboard
