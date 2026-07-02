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
  const [admins, setAdmins] = useState<{ id: string; name: string; email: string; passwordHash: string; }[]>([])

  // Load and seed database helper
  const loadData = async () => {
    try {
      const { data: adminsData } = await supabase.from('admins').select('*');
      if (adminsData) {
        setAdmins(adminsData.map((ad: any) => ({
          id: ad.id,
          name: ad.name,
          email: ad.email,
          passwordHash: ad.password_hash
        })));
      }
      // Fetch books catalog
      const { data: bCatalog, error: bErr } = await supabase
        .from('books_catalog')
        .select('*')
        .order('id', { ascending: true });
      if (!bErr && bCatalog) {
        setCatalogBooks(bCatalog);
      }

      // Fetch cms_content page texts
      const { data: cmsData } = await supabase.from('cms_content').select('*');
      if (cmsData) {
        cmsData.forEach((row: any) => {
          // Home Page
          if (row.key === 'home_hero_heading') setHomeHeroHeading(row.value)
          if (row.key === 'home_hero_text') setHomeHeroText(row.value)
          if (row.key === 'home_hero_button') setHomeHeroButton(row.value)
          if (row.key === 'home_hero_video') setHomeHeroVideo(row.value)
          if (row.key === 'home_contact_email') setHomeContactEmail(row.value)
          if (row.key === 'home_contact_phone') setHomeContactPhone(row.value)
          if (row.key === 'home_contact_city') setHomeContactCity(row.value)
          if (row.key === 'home_marquee_text') setHomeMarqueeText(row.value)
          if (row.key === 'home_premium_heading') setHomePremiumHeading(row.value)
          if (row.key === 'home_premium_text') setHomePremiumText(row.value)
          if (row.key === 'home_how_heading') setHomeHowHeading(row.value)
          if (row.key === 'home_how_subheading') setHomeHowSubheading(row.value)
          if (row.key === 'home_how_text') setHomeHowText(row.value)
          if (row.key === 'home_showcase_heading') setHomeShowcaseHeading(row.value)
          if (row.key === 'home_cta_heading') setHomeCtaHeading(row.value)
          if (row.key === 'home_cta_desc') setHomeCtaDesc(row.value)
          if (row.key === 'home_cta_button') setHomeCtaButton(row.value)

          // Books Page
          if (row.key === 'books_portfolio_label') setCmsPortfolioLabel(row.value)
          if (row.key === 'books_portfolio_title') setCmsPortfolioTitle(row.value)
          if (row.key === 'books_portfolio_desc') setCmsPortfolioDesc(row.value)
          if (row.key === 'cta_label') setCmsCtaLabel(row.value)
          if (row.key === 'cta_title') setCmsCtaTitle(row.value)
          if (row.key === 'cta_desc') setCmsCtaDesc(row.value)
          if (row.key === 'cta_button') setCmsCtaButton(row.value)

          // About Page
          if (row.key === 'about_hero_image') setAboutHeroImage(row.value)
          if (row.key === 'about_hero_sub') setAboutHeroSub(row.value)
          if (row.key === 'about_hero_heading') setAboutHeroHeading(row.value)
          if (row.key === 'about_hero_desc') setAboutHeroDesc(row.value)
          if (row.key === 'about_hero_button') setAboutHeroButton(row.value)
          if (row.key === 'about_story_image') setAboutStoryImage(row.value)
          if (row.key === 'about_story_heading') setAboutStoryHeading(row.value)
          if (row.key === 'about_story_desc') setAboutStoryDesc(row.value)
          if (row.key === 'about_mission_heading') setAboutMissionHeading(row.value)
          if (row.key === 'about_mission_desc') setAboutMissionDesc(row.value)
          if (row.key === 'about_choose_heading') setAboutChooseHeading(row.value)
          if (row.key === 'about_choose_desc') setAboutChooseDesc(row.value)
          if (row.key === 'about_journey_heading') setAboutJourneyHeading(row.value)
          if (row.key === 'about_journey_desc') setAboutJourneyDesc(row.value)
          if (row.key === 'about_trusted_quote') setAboutTrustedQuote(row.value)
          if (row.key === 'about_trusted_image') setAboutTrustedImage(row.value)
          if (row.key === 'about_trusted_name') setAboutTrustedName(row.value)
          if (row.key === 'about_trusted_rating') setAboutTrustedRating(row.value)
          if (row.key === 'about_cta_heading') setAboutCtaHeading(row.value)
          if (row.key === 'about_cta_desc') setAboutCtaDesc(row.value)
          if (row.key === 'about_cta_button') setAboutCtaButton(row.value)

          // Pricing Page
          if (row.key === 'pricing_hero_sub') setPricingHeroSub(row.value)
          if (row.key === 'pricing_hero_heading') setPricingHeroHeading(row.value)
          if (row.key === 'pricing_hero_desc') setPricingHeroDesc(row.value)
          if (row.key === 'pricing_hero_button') setPricingHeroButton(row.value)
          if (row.key === 'pricing_hero_image') setPricingHeroImage(row.value)
          if (row.key === 'pricing_pack_heading') setPricingPackHeading(row.value)
          if (row.key === 'pricing_pack_desc') setPricingPackDesc(row.value)
          if (row.key === 'pricing_compare_heading') setPricingCompareHeading(row.value)
          if (row.key === 'pricing_why_heading') setPricingWhyHeading(row.value)
          if (row.key === 'pricing_why_sub') setPricingWhySub(row.value)
          if (row.key === 'pricing_why_desc') setPricingWhyDesc(row.value)

          // SEO Settings loading
          if (row.key === 'home_seo_title') setHomeSeoTitle(row.value)
          if (row.key === 'home_seo_desc') setHomeSeoDesc(row.value)
          if (row.key === 'home_seo_image') setHomeSeoImage(row.value)

          if (row.key === 'books_seo_title') setBooksSeoTitle(row.value)
          if (row.key === 'books_seo_desc') setBooksSeoDesc(row.value)
          if (row.key === 'books_seo_image') setBooksSeoImage(row.value)

          if (row.key === 'about_seo_title') setAboutSeoTitle(row.value)
          if (row.key === 'about_seo_desc') setAboutSeoDesc(row.value)
          if (row.key === 'about_seo_image') setAboutSeoImage(row.value)

          if (row.key === 'pricing_seo_title') setPricingSeoTitle(row.value)
          if (row.key === 'pricing_seo_desc') setPricingSeoDesc(row.value)
          if (row.key === 'pricing_seo_image') setPricingSeoImage(row.value)
        });
      }

      // Fetch dynamic reviews list
      const { data: revData } = await supabase.from('reviews').select('*').order('id', { ascending: true })
      if (revData) setReviewsList(revData)

      // Fetch dynamic team list
      const { data: teamData } = await supabase.from('team_members').select('*').order('id', { ascending: true })
      if (teamData) setTeamList(teamData)

      // Fetch dynamic pricing plans list
      const { data: plansData } = await supabase.from('pricing_plans').select('*').order('id', { ascending: true })
      if (plansData) setPricingPlansList(plansData)

      // Fetch dynamic FAQs list
      const { data: fList } = await supabase.from('faqs').select('*').order('id', { ascending: true })
      if (fList) setFaqsList(fList)

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
            isbn: a.isbn,
            source: m.source || 'Amazon'
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
  
  // Credentials input
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
  const [adminNewRole, setAdminNewRole] = useState<'author' | 'admin'>('author')

  // Admin "Payment Update" state inputs
  const [payUpdateAuthorId, setPayUpdateAuthorId] = useState('')
  const [payUpdateCopies, setPayUpdateCopies] = useState('')
  const [payUpdatePaid, setPayUpdatePaid] = useState('')
  const [payUpdateSource, setPayUpdateSource] = useState<'Amazon' | 'Flipkart'>('Amazon')
  
  // Admin "Payments Report" filter
  const [paymentFilterAuthorId, setPaymentFilterAuthorId] = useState('all')

  // Admin "Books Catalog CMS" state inputs
  const [catalogBooks, setCatalogBooks] = useState<any[]>([])
  const [catalogNewTitle, setCatalogNewTitle] = useState('')
  const [catalogNewAuthor, setCatalogNewAuthor] = useState('')
  const [catalogNewCoverImage, setCatalogNewCoverImage] = useState('')
  const [catalogNewDescription, setCatalogNewDescription] = useState('')
  const [catalogNewRating, setCatalogNewRating] = useState('5')
  const [editingBookId, setEditingBookId] = useState<number | null>(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  // Admin "Website CMS Console" structure states
  const [cmsPageTab, setCmsPageTab] = useState<'home' | 'books' | 'about' | 'pricing'>('home')

  // HOME PAGE CMS STATES
  const [homeHeroHeading, setHomeHeroHeading] = useState('Write, Publish & Sell Globally')
  const [homeHeroText, setHomeHeroText] = useState('We help authors transform manuscripts into beautifully printed books and distribute them across leading platforms like Amazon and Flipkart.')
  const [homeHeroButton, setHomeHeroButton] = useState('GET STARTED NOW')
  const [homeHeroVideo, setHomeHeroVideo] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')
  const [homeContactEmail, setHomeContactEmail] = useState('info@mbpublishers.com')
  const [homeContactPhone, setHomeContactPhone] = useState('+91 98765 43210')
  const [homeContactCity, setHomeContactCity] = useState('New Delhi, India')
  const [homeMarqueeText, setHomeMarqueeText] = useState('JOIN THOUSANDS OF AUTHORS • WORLDWIDE DISTRIBUTION • 100% ROYALTY • EASY MONTHLY PAYOUTS')
  const [homePremiumHeading, setHomePremiumHeading] = useState('Why Choose MB Publisher?')
  const [homePremiumText, setHomePremiumText] = useState('We offer premium publishing services with a dedicated project manager, complete transparency, and weekly support.')
  const [homeHowHeading, setHomeHowHeading] = useState('How It Works')
  const [homeHowSubheading, setHomeHowSubheading] = useState('OUR PUBLISHING PROCESS')
  const [homeHowText, setHomeHowText] = useState('From manuscript submission to global retail listing, we manage everything in 5 easy steps.')
  const [homeShowcaseHeading, setHomeShowcaseHeading] = useState('Curated Showcase')
  const [homeCtaHeading, setHomeCtaHeading] = useState('Ready to Publish Your Book?')
  const [homeCtaDesc, setHomeCtaDesc] = useState('Join thousands of authors who have successfully published their books and reached readers worldwide with MB Publisher.')
  const [homeCtaButton, setHomeCtaButton] = useState('GET STARTED NOW')

  // BOOK PAGE CMS STATES
  const [cmsPortfolioLabel, setCmsPortfolioLabel] = useState('OUR PORTFOLIO')
  const [cmsPortfolioTitle, setCmsPortfolioTitle] = useState('Our Published Books')
  const [cmsPortfolioDesc, setCmsPortfolioDesc] = useState('Explore our growing collection of professionally published books across multiple genres and categories.')
  const [cmsCtaLabel, setCmsCtaLabel] = useState('Start Today')
  const [cmsCtaTitle, setCmsCtaTitle] = useState('Ready to Publish Your Book?')
  const [cmsCtaDesc, setCmsCtaDesc] = useState('Join thousands of authors who have successfully published their books and reached readers worldwide with MB Publisher.')
  const [cmsCtaButton, setCmsCtaButton] = useState('GET STARTED NOW')

  // ABOUT PAGE CMS STATES
  const [aboutHeroImage, setAboutHeroImage] = useState('https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=800&q=80')
  const [aboutHeroSub, setAboutHeroSub] = useState('ABOUT MB PUBLISHER')
  const [aboutHeroHeading, setAboutHeroHeading] = useState('Empowering Voices, Sharing Stories')
  const [aboutHeroDesc, setAboutHeroDesc] = useState('MB Publisher is a leading independent self-publishing platform dedicated to helping writers share their work with readers worldwide.')
  const [aboutHeroButton, setAboutHeroButton] = useState('LEARN MORE')
  const [aboutStoryImage, setAboutStoryImage] = useState('https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=800&q=80')
  const [aboutStoryHeading, setAboutStoryHeading] = useState('Our Story')
  const [aboutStoryDesc, setAboutStoryDesc] = useState('Founded in 2018, we began with a simple mission: to make book publishing accessible, transparent, and rewarding for every author. We have since helped publish over 500 books.')
  const [aboutMissionHeading, setAboutMissionHeading] = useState('Our Mission')
  const [aboutMissionDesc, setAboutMissionDesc] = useState('To guide authors through the complex publishing journey by offering premium editing, creative design, and robust distribution systems.')
  const [aboutChooseHeading, setAboutChooseHeading] = useState('Why Choose MB')
  const [aboutChooseDesc, setAboutChooseDesc] = useState('Complete transparency, expert publishing team, 100% author rights retention, and seamless monthly sales payouts.')
  const [aboutJourneyHeading, setAboutJourneyHeading] = useState('Our Publishing Journey')
  const [aboutJourneyDesc, setAboutJourneyDesc] = useState('From humble beginnings to a global network, here is how we have grown with our author community.')
  const [aboutTrustedQuote, setAboutTrustedQuote] = useState('The support and quality MB Publisher provided exceeded all my expectations. Highly recommended!')
  const [aboutTrustedImage, setAboutTrustedImage] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80')
  const [aboutTrustedName, setAboutTrustedName] = useState('Dr. Priya Sharma')
  const [aboutTrustedRating, setAboutTrustedRating] = useState('5')
  const [aboutCtaHeading, setAboutCtaHeading] = useState('Ready to Publish Your Book?')
  const [aboutCtaDesc, setAboutCtaDesc] = useState('Join thousands of authors who have successfully published their books and reached readers worldwide with MB Publisher.')
  const [aboutCtaButton, setAboutCtaButton] = useState('GET STARTED NOW')

  // PRICING PAGE CMS STATES
  const [pricingHeroSub, setPricingHeroSub] = useState('OUR PLANS')
  const [pricingHeroHeading, setPricingHeroHeading] = useState('Simple, Transparent Pricing')
  const [pricingHeroDesc, setPricingHeroDesc] = useState('Choose the perfect publishing package tailored to your book project and budget. No hidden fees.')
  const [pricingHeroButton, setPricingHeroButton] = useState('VIEW ALL PACKAGES')
  const [pricingHeroImage, setPricingHeroImage] = useState('https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80')
  const [pricingPackHeading, setPricingPackHeading] = useState('Publishing Packages')
  const [pricingPackDesc, setPricingPackDesc] = useState('Select a package that fits your editorial, design, and marketing requirements.')
  const [pricingCompareHeading, setPricingCompareHeading] = useState('Compare All Plans')
  const [pricingWhyHeading, setPricingWhyHeading] = useState('Why Choose MB Publisher?')
  const [pricingWhySub, setPricingWhySub] = useState('UNBEATABLE VALUE')
  const [pricingWhyDesc, setPricingWhyDesc] = useState('We combine quality, speed, and support to give your book the best chance of success in the retail market.')

  // SEO METADATA STATES
  const [homeSeoTitle, setHomeSeoTitle] = useState('MB Publisher | Write, Publish & Sell Books Globally')
  const [homeSeoDesc, setHomeSeoDesc] = useState('We help authors edit, format, print, and sell their books globally on Amazon, Flipkart, and major retail bookstores.')
  const [homeSeoImage, setHomeSeoImage] = useState('')

  const [booksSeoTitle, setBooksSeoTitle] = useState('Our Published Books Portfolio | MB Publisher')
  const [booksSeoDesc, setBooksSeoDesc] = useState('Browse the diverse catalog of fiction, non-fiction, academic, and poetry books published by MB Publisher.')
  const [booksSeoImage, setBooksSeoImage] = useState('')

  const [aboutSeoTitle, setAboutSeoTitle] = useState('Our Story & Publishing Journey | About MB Publisher')
  const [aboutSeoDesc, setAboutSeoDesc] = useState('Learn how MB Publisher helps independent authors realize their dreams through expert editing, layout designs, and global distribution.')
  const [aboutSeoImage, setAboutSeoImage] = useState('')

  const [pricingSeoTitle, setPricingSeoTitle] = useState('Publishing Packages & Pricing Plans | MB Publisher')
  const [pricingSeoDesc, setPricingSeoDesc] = useState('Compare our Bronze, Silver, Gold, and Diamond publishing packages. Transparent pricing, 100% author royalties, and professional editing.')
  const [pricingSeoImage, setPricingSeoImage] = useState('')

  // DYNAMIC REPEATING ITEMS LISTS
  const [reviewsList, setReviewsList] = useState<any[]>([])
  const [teamList, setTeamList] = useState<any[]>([])
  const [pricingPlansList, setPricingPlansList] = useState<any[]>([])
  const [faqsList, setFaqsList] = useState<any[]>([])

  // Dynamic reviews input states
  const [revAuthorName, setRevAuthorName] = useState('')
  const [revAuthorRole, setRevAuthorRole] = useState('')
  const [revReviewText, setRevReviewText] = useState('')
  const [revRating, setRevRating] = useState('5')
  const [revPhotoUrl, setRevPhotoUrl] = useState('')
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null)

  // Dynamic team members input states
  const [teamName, setTeamName] = useState('')
  const [teamRole, setTeamRole] = useState('')
  const [teamDesc, setTeamDesc] = useState('')
  const [teamImageUrl, setTeamImageUrl] = useState('')
  const [editingTeamId, setEditingTeamId] = useState<number | null>(null)

  // Dynamic pricing plans input states
  const [planName, setPlanName] = useState('')
  const [planPrice, setPlanPrice] = useState('')
  const [planPoints, setPlanPoints] = useState('')
  const [planButtonText, setPlanButtonText] = useState('')
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null)

  // Dynamic FAQs input states
  const [faqQuestion, setFaqQuestion] = useState('')
  const [faqAnswer, setFaqAnswer] = useState('')
  const [editingFaqId, setEditingFaqId] = useState<number | null>(null)

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
      const isSuperAdmin = email === 'admin@mbpublication.in' && password === '123456'
      const customAdmin = admins.find(
        ad => ad.email.toLowerCase() === email.toLowerCase() && ad.passwordHash === password
      )

      if (isSuperAdmin || customAdmin) {
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

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentAuthor(null)
    setPage('overview')
  }

  // Admin: Add new user/author
  const handleAdminAddUser = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!adminNewName || !adminNewEmail || !adminNewPassword || (adminNewRole === 'author' && !adminNewPhone)) {
      showToast('Please fill out all required fields!')
      return
    }

    const existsAuthor = authors.some(a => a.email.toLowerCase() === adminNewEmail.toLowerCase())
    const existsAdmin = admins.some(ad => ad.email.toLowerCase() === adminNewEmail.toLowerCase())
    if (existsAuthor || existsAdmin || adminNewEmail.toLowerCase() === 'admin@mbpublication.in') {
      showToast('Error: Email address already registered!')
      return
    }

    if (adminNewRole === 'admin') {
      const newId = `admin-${Date.now()}`
      const { error } = await supabase
        .from('admins')
        .insert({
          id: newId,
          name: adminNewName,
          email: adminNewEmail,
          password_hash: adminNewPassword
        })

      if (!error) {
        await loadData()
        showToast(`Admin "${adminNewName}" added successfully!`)

        setAdminNewName('')
        setAdminNewEmail('')
        setAdminNewPassword('')
        setAdminNewPhone('')
      } else {
        showToast(`Error: ${error.message}`)
      }
    } else {
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

  // Admin: Delete custom admin
  const handleAdminDeleteAdmin = async (adminId: string) => {
    const adminToDelete = admins.find(ad => ad.id === adminId)
    if (!adminToDelete) return

    if (window.confirm(`Are you sure you want to delete Admin "${adminToDelete.name}"?`)) {
      const { error } = await supabase
        .from('admins')
        .delete()
        .eq('id', adminId)

      if (!error) {
        await loadData()
        showToast(`Admin "${adminToDelete.name}" deleted successfully!`)
      } else {
        showToast(`Error deleting admin: ${error.message}`)
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
      .eq('source', payUpdateSource)
      .order('month_name', { ascending: false })
      .limit(1)

    if (fetchErr) {
      showToast(`Error: ${fetchErr.message}`)
      return
    }

    if (salesData && salesData.length > 0) {
      const latestSaleId = salesData[0].id
      const grossVal = copiesVal * targetAuthor.mrp

      const { error: updateErr } = await supabase
        .from('monthly_sales')
        .update({
          copies: copiesVal,
          gross: grossVal,
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

  // Admin: Handle Cover Image Upload to Supabase Storage
  const handleCatalogCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingImage(true)
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('book-covers')
        .upload(fileName, file)

      if (error) {
        showToast(`Upload failed: ${error.message}`)
        return
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('book-covers')
        .getPublicUrl(fileName)

      if (publicUrlData?.publicUrl) {
        setCatalogNewCoverImage(publicUrlData.publicUrl)
        showToast('Image uploaded successfully!')
      } else {
        showToast('Failed to retrieve public URL of uploaded image.')
      }

    } catch (err: any) {
      console.error(err)
      showToast(`Error uploading cover: ${err.message || err}`)
    } finally {
      setIsUploadingImage(false)
    }
  }

  // Admin: Add or Edit Catalog Book
  const handleCatalogBookSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!catalogNewTitle || !catalogNewAuthor || !catalogNewCoverImage || !catalogNewDescription) {
      showToast('Please fill out all book details fields!')
      return
    }

    // Auto-generate slug from title
    const slugVal = catalogNewTitle.toLowerCase()
      .replace(/[^a-z0-9 ]/g, '')
      .replace(/\s+/g, '-')

    if (editingBookId !== null) {
      // Update existing book
      const { error } = await supabase
        .from('books_catalog')
        .update({
          title: catalogNewTitle,
          author: catalogNewAuthor,
          cover_image: catalogNewCoverImage,
          description: catalogNewDescription,
          rating: parseInt(catalogNewRating),
          slug: slugVal
        })
        .eq('id', editingBookId)

      if (!error) {
        await loadData()
        showToast(`Book "${catalogNewTitle}" updated successfully!`)
        setEditingBookId(null)
        setCatalogNewTitle('')
        setCatalogNewAuthor('')
        setCatalogNewCoverImage('')
        setCatalogNewDescription('')
        setCatalogNewRating('5')
      } else {
        showToast(`Failed to update book: ${error.message}`)
      }
    } else {
      // Add new book
      const { error } = await supabase
        .from('books_catalog')
        .insert({
          title: catalogNewTitle,
          author: catalogNewAuthor,
          cover_image: catalogNewCoverImage,
          description: catalogNewDescription,
          rating: parseInt(catalogNewRating),
          slug: slugVal
        })

      if (!error) {
        await loadData()
        showToast(`Book "${catalogNewTitle}" added to catalog!`)
        setCatalogNewTitle('')
        setCatalogNewAuthor('')
        setCatalogNewCoverImage('')
        setCatalogNewDescription('')
        setCatalogNewRating('5')
      } else {
        showToast(`Failed to add book: ${error.message}`)
      }
    }
  }

  // Admin: Delete Catalog Book
  const handleCatalogBookDelete = async (id: number) => {
    const { error } = await supabase
      .from('books_catalog')
      .delete()
      .eq('id', id)

    if (!error) {
      await loadData()
      showToast('Book removed from catalog successfully!')
      if (editingBookId === id) {
        setEditingBookId(null)
        setCatalogNewTitle('')
        setCatalogNewAuthor('')
        setCatalogNewCoverImage('')
        setCatalogNewDescription('')
        setCatalogNewRating('5')
      }
    } else {
      showToast(`Failed to delete book: ${error.message}`)
    }
  }

  // Admin: Reusable media uploader helper for CMS files
  const uploadMediaToStorage = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      
      const { data, error } = await supabase.storage
        .from('book-covers')
        .upload(fileName, file)

      if (error) {
        showToast(`Upload failed: ${error.message}`)
        return null
      }

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('book-covers')
        .getPublicUrl(fileName)

      return publicUrlData?.publicUrl || null
    } catch (err: any) {
      console.error(err)
      showToast(`Error uploading media: ${err.message || err}`)
      return null
    }
  }

  // Admin: Handle Home Page text updates
  const handleHomeTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updates = [
      { key: 'home_hero_heading', value: homeHeroHeading },
      { key: 'home_hero_text', value: homeHeroText },
      { key: 'home_hero_button', value: homeHeroButton },
      { key: 'home_hero_video', value: homeHeroVideo },
      { key: 'home_contact_email', value: homeContactEmail },
      { key: 'home_contact_phone', value: homeContactPhone },
      { key: 'home_contact_city', value: homeContactCity },
      { key: 'home_marquee_text', value: homeMarqueeText },
      { key: 'home_premium_heading', value: homePremiumHeading },
      { key: 'home_premium_text', value: homePremiumText },
      { key: 'home_how_heading', value: homeHowHeading },
      { key: 'home_how_subheading', value: homeHowSubheading },
      { key: 'home_how_text', value: homeHowText },
      { key: 'home_showcase_heading', value: homeShowcaseHeading },
      { key: 'home_cta_heading', value: homeCtaHeading },
      { key: 'home_cta_desc', value: homeCtaDesc },
      { key: 'home_cta_button', value: homeCtaButton },
      { key: 'home_seo_title', value: homeSeoTitle },
      { key: 'home_seo_desc', value: homeSeoDesc },
      { key: 'home_seo_image', value: homeSeoImage }
    ]

    let hasError = false
    let errMsg = ''
    for (const item of updates) {
      if (item.value === undefined || item.value === null || item.value === '') {
        continue // Skip empty fields so they do not overwrite populated DB values with blank space
      }
      const { error } = await supabase.from('cms_content').upsert({ key: item.key, value: item.value })
      if (error) {
        hasError = true
        errMsg = error.message
        break
      }
    }

    if (!hasError) {
      await loadData()
      showToast('Home page text content updated successfully!')
    } else {
      showToast(`Failed to update home page content: ${errMsg}`)
    }
  }

  // Admin: Handle Books Page text updates
  const handleBooksTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updates = [
      { key: 'books_portfolio_label', value: cmsPortfolioLabel },
      { key: 'books_portfolio_title', value: cmsPortfolioTitle },
      { key: 'books_portfolio_desc', value: cmsPortfolioDesc },
      { key: 'cta_label', value: cmsCtaLabel },
      { key: 'cta_title', value: cmsCtaTitle },
      { key: 'cta_desc', value: cmsCtaDesc },
      { key: 'cta_button', value: cmsCtaButton },
      { key: 'books_seo_title', value: booksSeoTitle },
      { key: 'books_seo_desc', value: booksSeoDesc },
      { key: 'books_seo_image', value: booksSeoImage }
    ]

    let hasError = false
    let errMsg = ''
    for (const item of updates) {
      if (item.value === undefined || item.value === null || item.value === '') {
        continue
      }
      const { error } = await supabase.from('cms_content').upsert({ key: item.key, value: item.value })
      if (error) {
        hasError = true
        errMsg = error.message
        break
      }
    }

    if (!hasError) {
      await loadData()
      showToast('Books page text content updated successfully!')
    } else {
      showToast(`Failed to update books page content: ${errMsg}`)
    }
  }

  // Admin: Handle About Page text updates
  const handleAboutTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updates = [
      { key: 'about_hero_image', value: aboutHeroImage },
      { key: 'about_hero_sub', value: aboutHeroSub },
      { key: 'about_hero_heading', value: aboutHeroHeading },
      { key: 'about_hero_desc', value: aboutHeroDesc },
      { key: 'about_hero_button', value: aboutHeroButton },
      { key: 'about_story_image', value: aboutStoryImage },
      { key: 'about_story_heading', value: aboutStoryHeading },
      { key: 'about_story_desc', value: aboutStoryDesc },
      { key: 'about_mission_heading', value: aboutMissionHeading },
      { key: 'about_mission_desc', value: aboutMissionDesc },
      { key: 'about_choose_heading', value: aboutChooseHeading },
      { key: 'about_choose_desc', value: aboutChooseDesc },
      { key: 'about_journey_heading', value: aboutJourneyHeading },
      { key: 'about_journey_desc', value: aboutJourneyDesc },
      { key: 'about_trusted_quote', value: aboutTrustedQuote },
      { key: 'about_trusted_image', value: aboutTrustedImage },
      { key: 'about_trusted_name', value: aboutTrustedName },
      { key: 'about_trusted_rating', value: aboutTrustedRating },
      { key: 'about_cta_heading', value: aboutCtaHeading },
      { key: 'about_cta_desc', value: aboutCtaDesc },
      { key: 'about_cta_button', value: aboutCtaButton },
      { key: 'about_seo_title', value: aboutSeoTitle },
      { key: 'about_seo_desc', value: aboutSeoDesc },
      { key: 'about_seo_image', value: aboutSeoImage }
    ]

    let hasError = false
    let errMsg = ''
    for (const item of updates) {
      if (item.value === undefined || item.value === null || item.value === '') {
        continue
      }
      const { error } = await supabase.from('cms_content').upsert({ key: item.key, value: item.value })
      if (error) {
        hasError = true
        errMsg = error.message
        break
      }
    }

    if (!hasError) {
      await loadData()
      showToast('About page text content updated successfully!')
    } else {
      showToast(`Failed to update about page content: ${errMsg}`)
    }
  }

  // Admin: Handle Pricing Page text updates
  const handlePricingTextSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const updates = [
      { key: 'pricing_hero_sub', value: pricingHeroSub },
      { key: 'pricing_hero_heading', value: pricingHeroHeading },
      { key: 'pricing_hero_desc', value: pricingHeroDesc },
      { key: 'pricing_hero_button', value: pricingHeroButton },
      { key: 'pricing_hero_image', value: pricingHeroImage },
      { key: 'pricing_pack_heading', value: pricingPackHeading },
      { key: 'pricing_pack_desc', value: pricingPackDesc },
      { key: 'pricing_compare_heading', value: pricingCompareHeading },
      { key: 'pricing_why_heading', value: pricingWhyHeading },
      { key: 'pricing_why_sub', value: pricingWhySub },
      { key: 'pricing_why_desc', value: pricingWhyDesc },
      { key: 'pricing_seo_title', value: pricingSeoTitle },
      { key: 'pricing_seo_desc', value: pricingSeoDesc },
      { key: 'pricing_seo_image', value: pricingSeoImage }
    ]

    let hasError = false
    let errMsg = ''
    for (const item of updates) {
      if (item.value === undefined || item.value === null || item.value === '') {
        continue
      }
      const { error } = await supabase.from('cms_content').upsert({ key: item.key, value: item.value })
      if (error) {
        hasError = true
        errMsg = error.message
        break
      }
    }

    if (!hasError) {
      await loadData()
      showToast('Pricing page text content updated successfully!')
    } else {
      showToast(`Failed to update pricing page content: ${errMsg}`)
    }
  }

  // Admin: Create or Edit Author Review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!revAuthorName || !revReviewText) {
      showToast('Please enter Author Name and Review Text!')
      return
    }

    if (editingReviewId !== null) {
      const { error } = await supabase
        .from('reviews')
        .update({
          author_name: revAuthorName,
          author_role: revAuthorRole,
          review_text: revReviewText,
          rating: parseInt(revRating),
          photo_url: revPhotoUrl
        })
        .eq('id', editingReviewId)

      if (!error) {
        await loadData()
        showToast('Review updated successfully!')
        setEditingReviewId(null)
        setRevAuthorName('')
        setRevAuthorRole('')
        setRevReviewText('')
        setRevRating('5')
        setRevPhotoUrl('')
      } else {
        showToast(`Failed to update review: ${error.message}`)
      }
    } else {
      const { error } = await supabase
        .from('reviews')
        .insert({
          author_name: revAuthorName,
          author_role: revAuthorRole,
          review_text: revReviewText,
          rating: parseInt(revRating),
          photo_url: revPhotoUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80'
        })

      if (!error) {
        await loadData()
        showToast('New review added successfully!')
        setRevAuthorName('')
        setRevAuthorRole('')
        setRevReviewText('')
        setRevRating('5')
        setRevPhotoUrl('')
      } else {
        showToast(`Failed to add review: ${error.message}`)
      }
    }
  }

  // Admin: Delete Review
  const handleReviewDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      const { error } = await supabase.from('reviews').delete().eq('id', id)
      if (!error) {
        await loadData()
        showToast('Review deleted successfully!')
        if (editingReviewId === id) {
          setEditingReviewId(null)
          setRevAuthorName('')
          setRevAuthorRole('')
          setRevReviewText('')
          setRevRating('5')
          setRevPhotoUrl('')
        }
      } else {
        showToast(`Failed to delete review: ${error.message}`)
      }
    }
  }

  // Admin: Create or Edit Team Member
  const handleTeamMemberSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!teamName || !teamRole) {
      showToast('Please enter Team Member Name and Role!')
      return
    }

    if (editingTeamId !== null) {
      const { error } = await supabase
        .from('team_members')
        .update({
          name: teamName,
          role: teamRole,
          description: teamDesc,
          image_url: teamImageUrl
        })
        .eq('id', editingTeamId)

      if (!error) {
        await loadData()
        showToast('Team member updated successfully!')
        setEditingTeamId(null)
        setTeamName('')
        setTeamRole('')
        setTeamDesc('')
        setTeamImageUrl('')
      } else {
        showToast(`Failed to update team member: ${error.message}`)
      }
    } else {
      const { error } = await supabase
        .from('team_members')
        .insert({
          name: teamName,
          role: teamRole,
          description: teamDesc,
          image_url: teamImageUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80'
        })

      if (!error) {
        await loadData()
        showToast('Team member added successfully!')
        setTeamName('')
        setTeamRole('')
        setTeamDesc('')
        setTeamImageUrl('')
      } else {
        showToast(`Failed to add team member: ${error.message}`)
      }
    }
  }

  // Admin: Delete Team Member
  const handleTeamMemberDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      const { error } = await supabase.from('team_members').delete().eq('id', id)
      if (!error) {
        await loadData()
        showToast('Team member deleted successfully!')
        if (editingTeamId === id) {
          setEditingTeamId(null)
          setTeamName('')
          setTeamRole('')
          setTeamDesc('')
          setTeamImageUrl('')
        }
      } else {
        showToast(`Failed to delete team member: ${error.message}`)
      }
    }
  }

  // Admin: Create or Edit Pricing Plan
  const handlePricingPlanSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!planName || !planPrice || !planPoints) {
      showToast('Please enter Plan Name, Price, and Features list!')
      return
    }

    if (editingPlanId !== null) {
      const { error } = await supabase
        .from('pricing_plans')
        .update({
          name: planName,
          price: planPrice,
          points: planPoints,
          button_text: planButtonText || 'Get Started'
        })
        .eq('id', editingPlanId)

      if (!error) {
        await loadData()
        showToast('Pricing plan updated successfully!')
        setEditingPlanId(null)
        setPlanName('')
        setPlanPrice('')
        setPlanPoints('')
        setPlanButtonText('')
      } else {
        showToast(`Failed to update package: ${error.message}`)
      }
    } else {
      const { error } = await supabase
        .from('pricing_plans')
        .insert({
          name: planName,
          price: planPrice,
          points: planPoints,
          button_text: planButtonText || 'Get Started'
        })

      if (!error) {
        await loadData()
        showToast('Pricing package added successfully!')
        setPlanName('')
        setPlanPrice('')
        setPlanPoints('')
        setPlanButtonText('')
      } else {
        showToast(`Failed to add package: ${error.message}`)
      }
    }
  }

  // Admin: Delete Pricing Plan
  const handlePricingPlanDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      const { error } = await supabase.from('pricing_plans').delete().eq('id', id)
      if (!error) {
        await loadData()
        showToast('Pricing package deleted successfully!')
        if (editingPlanId === id) {
          setEditingPlanId(null)
          setPlanName('')
          setPlanPrice('')
          setPlanPoints('')
          setPlanButtonText('')
        }
      } else {
        showToast(`Failed to delete package: ${error.message}`)
      }
    }
  }

  // Admin: Create or Edit FAQ
  const handleFaqSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!faqQuestion || !faqAnswer) {
      showToast('Please fill out both Question and Answer fields!')
      return
    }

    if (editingFaqId !== null) {
      const { error } = await supabase
        .from('faqs')
        .update({
          question: faqQuestion,
          answer: faqAnswer
        })
        .eq('id', editingFaqId)

      if (!error) {
        await loadData()
        showToast('FAQ updated successfully!')
        setEditingFaqId(null)
        setFaqQuestion('')
        setFaqAnswer('')
      } else {
        showToast(`Failed to update FAQ: ${error.message}`)
      }
    } else {
      const { error } = await supabase
        .from('faqs')
        .insert({
          question: faqQuestion,
          answer: faqAnswer
        })

      if (!error) {
        await loadData()
        showToast('FAQ added successfully!')
        setFaqQuestion('')
        setFaqAnswer('')
      } else {
        showToast(`Failed to add FAQ: ${error.message}`)
      }
    }
  }

  // Admin: Delete FAQ
  const handleFaqDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      const { error } = await supabase.from('faqs').delete().eq('id', id)
      if (!error) {
        await loadData()
        showToast('FAQ deleted successfully!')
        if (editingFaqId === id) {
          setEditingFaqId(null)
          setFaqQuestion('')
          setFaqAnswer('')
        }
      } else {
        showToast(`Failed to delete FAQ: ${error.message}`)
      }
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
    { id: 'manageCms', icon: '🌐', label: 'Manage CMS' },
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
                <h3>Payouts & Sales Ledger Report</h3>
              </div>
              <div className="table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th>Date / Month</th>
                      <th>Book Name</th>
                      <th>Platform</th>
                      <th>MRP (₹)</th>
                      <th>Total Copies</th>
                      <th>Month Copies Sold</th>
                      <th>Total Royalty</th>
                      <th>Paid Royalty</th>
                      <th>Pending Royalty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeSalesMonths.map((m, idx) => {
                      const rowMrp = m.mrp !== undefined ? m.mrp : authorData.mrp
                      const rowTotalCopies = m.totalCopies !== undefined ? m.totalCopies : 0
                      const rowMonthCopiesSold = m.copies || 0
                      const rowTotalRoyalty = m.royalty !== undefined ? m.royalty : 0
                      const rowPaidRoyalty = m.paid !== undefined ? m.paid : 0
                      const rowPendingRoyalty = Math.max(0, rowTotalRoyalty - rowPaidRoyalty)

                      return (
                        <tr key={idx}>
                          <td>{formatSaleDate(m.name)}</td>
                          <td>{m.bookTitle || authorData.bookTitle}</td>
                          <td>
                            <span className="status" style={{ fontSize: '11px', padding: '2px 8px', background: m.source === 'Amazon' ? '#10b981' : '#3b82f6', color: '#fff', borderRadius: '4px' }}>
                              {m.source}
                            </span>
                          </td>
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
                    <th>Password</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 1. Superadmin Row */}
                  <tr>
                    <td><b>MB Publication Admin</b></td>
                    <td>admin@mbpublication.in</td>
                    <td><code style={{ background: 'var(--soft)', padding: '2px 6px', borderRadius: '4px' }}>123456</code></td>
                    <td>N/A</td>
                    <td><span className="status paid" style={{ fontSize: '11px', padding: '2px 8px' }}>Super Admin</span></td>
                    <td style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '11px' }}>Protected</td>
                  </tr>

                  {/* 2. Custom Admins Rows */}
                  {admins.map((ad) => (
                    <tr key={ad.id}>
                      <td><b>{ad.name}</b></td>
                      <td>{ad.email}</td>
                      <td><code style={{ background: 'var(--soft)', padding: '2px 6px', borderRadius: '4px' }}>{ad.passwordHash}</code></td>
                      <td>N/A</td>
                      <td><span className="status pending" style={{ fontSize: '11px', padding: '2px 8px', background: '#3b82f6', color: '#fff' }}>Admin</span></td>
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
                          onClick={() => handleAdminDeleteAdmin(ad.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {/* 3. Authors Rows */}
                  {authors.map((a) => (
                    <tr key={a.id}>
                      <td><b>{a.name}</b></td>
                      <td>{a.email}</td>
                      <td><code style={{ background: 'var(--soft)', padding: '2px 6px', borderRadius: '4px' }}>{a.passwordHash}</code></td>
                      <td>{a.phoneNumber || 'N/A'}</td>
                      <td><span className="status draft" style={{ fontSize: '11px', padding: '2px 8px' }}>Author</span></td>
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
                <h3>Add New User / Admin</h3>
              </div>
              <form onSubmit={handleAdminAddUser}>
                <div className="form-grid">
                  <div className="field">
                    <label>User Role</label>
                    <select value={adminNewRole} onChange={(e) => setAdminNewRole(e.target.value as any)}>
                      <option value="author">Author (User)</option>
                      <option value="admin">Administrator (Admin)</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>{adminNewRole === 'author' ? 'Author Name' : 'Admin Name'}</label>
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
                <div className="field">
                  <label>Sales Channel</label>
                  <select id="salesSource">
                    <option value="Amazon">Amazon</option>
                    <option value="Flipkart">Flipkart</option>
                  </select>
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
                  const sourceSelect = document.getElementById('salesSource') as HTMLSelectElement
                  
                  const targetId = authorSelect.value
                  const bookTitleVal = bookTitleInput.value.trim()
                  const mrpVal = Math.max(0, parseFloat(mrpInput.value) || 0)
                  const isbnVal = isbnInput.value.trim()
                  const dateVal = dateInput.value
                  const totalCopiesVal = Math.max(0, parseInt(totalCopiesInput.value) || 0)
                  const royaltyVal = Math.max(0, parseFloat(royaltyInput.value) || 0)
                  const sourceVal = sourceSelect.value

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
                        paid: 0,
                        source: sourceVal
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

              <div className="field" style={{ marginTop: '12px' }}>
                <label>Select Platform</label>
                <select 
                  value={payUpdateSource} 
                  onChange={(e) => setPayUpdateSource(e.target.value as any)}
                >
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                </select>
              </div>

              {(() => {
                const targetAuthorId = payUpdateAuthorId || (authors[0]?.id || '')
                const targetAuthor = authors.find(a => a.id === targetAuthorId)
                if (!targetAuthor) return null

                // Filter months by the selected source platform
                const filteredMonths = targetAuthor.months.filter(m => m.source === payUpdateSource)

                if (filteredMonths.length === 0) {
                  return (
                    <div style={{ background: 'var(--soft)', padding: '16px', borderRadius: '16px', fontSize: '13px', margin: '14px 0', border: '1px dotted var(--line)', textAlign: 'center', color: 'var(--muted)' }}>
                      No book entries logged yet for {payUpdateSource}. Please add a monthly sales entry first.
                    </div>
                  )
                }

                // Get latest active month info
                const latestMonth = filteredMonths[filteredMonths.length - 1]

                return (
                  <>
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
                  </>
                )
              })()}
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
                    <th>Platform</th>
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
                      <td colSpan={9} style={{ textAlign: 'center', padding: '24px', color: 'var(--muted)' }}>
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
                        <tr key={`${a.id}-${m.name}-${m.source}-${idx}`}>
                          <td>{formatSaleDate(m.name)}</td>
                          <td>{m.bookTitle || a.bookTitle}</td>
                          <td>
                            <span className="status" style={{ fontSize: '11px', padding: '2px 8px', background: m.source === 'Amazon' ? '#10b981' : '#3b82f6', color: '#fff', borderRadius: '4px' }}>
                              {m.source}
                            </span>
                          </td>
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

      case 'manageCms':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Top Page Selector Tabs */}
            <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid var(--line)', paddingBottom: '12px' }}>
              {['home', 'books', 'about', 'pricing'].map((tabKey) => (
                <button
                  key={tabKey}
                  className="btn"
                  style={{
                    background: cmsPageTab === tabKey ? 'var(--primary)' : 'var(--soft)',
                    color: cmsPageTab === tabKey ? '#fff' : 'var(--ink)',
                    fontWeight: 'bold',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    textTransform: 'capitalize'
                  }}
                  onClick={() => setCmsPageTab(tabKey as any)}
                >
                  {tabKey} Page CMS
                </button>
              ))}
            </div>

            {/* HOME PAGE SUB-TAB */}
            {cmsPageTab === 'home' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card">
                  <div className="section-title">
                    <h3>Home Page Section Texts</h3>
                  </div>
                  <form onSubmit={handleHomeTextSubmit} style={{ marginTop: '16px' }}>
                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      1. Hero Section & General Contact Info
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Left Box Heading</label>
                        <input type="text" value={homeHeroHeading} onChange={(e) => setHomeHeroHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Button Text</label>
                        <input type="text" value={homeHeroButton} onChange={(e) => setHomeHeroButton(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Left Sub-description</label>
                        <textarea rows={3} value={homeHeroText} onChange={(e) => setHomeHeroText(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Contact Email</label>
                        <input type="email" value={homeContactEmail} onChange={(e) => setHomeContactEmail(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Contact Phone</label>
                        <input type="text" value={homeContactPhone} onChange={(e) => setHomeContactPhone(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>City Name</label>
                        <input type="text" value={homeContactCity} onChange={(e) => setHomeContactCity(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Hero Video (Local Upload from Computer)</label>
                        <input 
                          type="file" 
                          accept="video/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading video to Supabase...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setHomeHeroVideo(url)
                                showToast('Hero Video uploaded!')
                              }
                            }
                          }}
                        />
                        {homeHeroVideo && (
                          <div style={{ marginTop: '8px' }}>
                            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Video loaded: <a href={homeHeroVideo} target="_blank" rel="noreferrer">preview</a></span>
                          </div>
                        )}
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      2. Marquee & Premium & Showcase Header
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Marquee Scrollable Text</label>
                        <input type="text" value={homeMarqueeText} onChange={(e) => setHomeMarqueeText(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Premium Section Heading</label>
                        <input type="text" value={homePremiumHeading} onChange={(e) => setHomePremiumHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Showcase Heading</label>
                        <input type="text" value={homeShowcaseHeading} onChange={(e) => setHomeShowcaseHeading(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Premium Section Text</label>
                        <textarea rows={3} value={homePremiumText} onChange={(e) => setHomePremiumText(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      3. How It Works Section & Start Today CTA
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Process Section Heading</label>
                        <input type="text" value={homeHowHeading} onChange={(e) => setHomeHowHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Process Subheading</label>
                        <input type="text" value={homeHowSubheading} onChange={(e) => setHomeHowSubheading(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Process Description Subtext</label>
                        <textarea rows={3} value={homeHowText} onChange={(e) => setHomeHowText(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>CTA Section Heading</label>
                        <input type="text" value={homeCtaHeading} onChange={(e) => setHomeCtaHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>CTA Button Text</label>
                        <input type="text" value={homeCtaButton} onChange={(e) => setHomeCtaButton(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>CTA Section Description</label>
                        <textarea rows={2} value={homeCtaDesc} onChange={(e) => setHomeCtaDesc(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px', marginTop: '20px' }}>
                      4. Home Page Search Engine Optimization (SEO) & Social Cards
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Google Search Title (Meta Title)</label>
                        <input type="text" value={homeSeoTitle} onChange={(e) => setHomeSeoTitle(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Social Card Image (Open Graph Share Image)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading SEO image...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setHomeSeoImage(url)
                                showToast('SEO Image uploaded!')
                              }
                            }
                          }}
                        />
                        {homeSeoImage && <img src={homeSeoImage} alt="SEO Preview" style={{ width: '80px', height: '42px', objectFit: 'cover', borderRadius: '4px', marginTop: '6px' }} />}
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Google Search Description (Meta Description)</label>
                        <textarea rows={3} value={homeSeoDesc} onChange={(e) => setHomeSeoDesc(e.target.value)} required />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                      Save Home Page Text & SEO CMS
                    </button>
                  </form>
                </div>

                {/* Dynamic reviews List CRUD */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                  <div className="card">
                    <div className="section-title">
                      <h3>{editingReviewId !== null ? 'Edit Author Review' : 'Add New Author Review'}</h3>
                      {editingReviewId !== null && (
                        <button className="btn btn-soft" onClick={() => {
                          setEditingReviewId(null)
                          setRevAuthorName('')
                          setRevAuthorRole('')
                          setRevReviewText('')
                          setRevRating('5')
                          setRevPhotoUrl('')
                        }}>Cancel Edit</button>
                      )}
                    </div>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="form-grid">
                        <div className="field">
                          <label>Author Name</label>
                          <input type="text" value={revAuthorName} onChange={(e) => setRevAuthorName(e.target.value)} required />
                        </div>
                        <div className="field">
                          <label>Book Title / Role</label>
                          <input type="text" value={revAuthorRole} onChange={(e) => setRevAuthorRole(e.target.value)} placeholder="e.g. Author of 'Whispers'" />
                        </div>
                        <div className="field">
                          <label>Author Photo (From Computer)</label>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                showToast('Uploading photo...')
                                const url = await uploadMediaToStorage(file)
                                if (url) {
                                  setRevPhotoUrl(url)
                                  showToast('Photo uploaded!')
                                }
                              }
                            }}
                          />
                          {revPhotoUrl && <img src={revPhotoUrl} alt="Author Preview" style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '50%', marginTop: '6px' }} />}
                        </div>
                        <div className="field">
                          <label>Star Rating</label>
                          <select value={revRating} onChange={(e) => setRevRating(e.target.value)}>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                          </select>
                        </div>
                        <div className="field" style={{ gridColumn: 'span 2' }}>
                          <label>Review Text</label>
                          <textarea rows={3} value={revReviewText} onChange={(e) => setRevReviewText(e.target.value)} required />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                        {editingReviewId !== null ? 'Update Review' : 'Add Review'}
                      </button>
                    </form>
                  </div>

                  <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="section-title">
                      <h3>Live Website Author Reviews ({reviewsList.length})</h3>
                    </div>
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Photo</th>
                            <th>Author & Role</th>
                            <th>Rating</th>
                            <th>Review Text</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {reviewsList.map((r) => (
                            <tr key={r.id}>
                              <td>
                                <img src={r.photo_url} alt={r.author_name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%' }} />
                              </td>
                              <td>
                                <b>{r.author_name}</b><br />
                                <small style={{ color: 'var(--muted)' }}>{r.author_role}</small>
                              </td>
                              <td>⭐ {r.rating}/5</td>
                              <td>
                                <p style={{ fontSize: '12px', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.review_text}</p>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                  <button className="btn btn-soft" style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '6px' }} onClick={() => {
                                    setEditingReviewId(r.id)
                                    setRevAuthorName(r.author_name)
                                    setRevAuthorRole(r.author_role || '')
                                    setRevReviewText(r.review_text)
                                    setRevRating(String(r.rating))
                                    setRevPhotoUrl(r.photo_url || '')
                                  }}>Edit</button>
                                  <button className="btn" style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', fontSize: '11px', borderRadius: '6px', fontWeight: 'bold' }} onClick={() => handleReviewDelete(r.id)}>Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* BOOK PAGE SUB-TAB */}
            {cmsPageTab === 'books' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card">
                  <div className="section-title">
                    <h3>Book Page Section Texts</h3>
                  </div>
                  <form onSubmit={handleBooksTextSubmit} style={{ marginTop: '16px' }}>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Portfolio Label</label>
                        <input type="text" value={cmsPortfolioLabel} onChange={(e) => setCmsPortfolioLabel(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Portfolio Title</label>
                        <input type="text" value={cmsPortfolioTitle} onChange={(e) => setCmsPortfolioTitle(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Portfolio Description</label>
                        <textarea rows={3} value={cmsPortfolioDesc} onChange={(e) => setCmsPortfolioDesc(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>CTA Label</label>
                        <input type="text" value={cmsCtaLabel} onChange={(e) => setCmsCtaLabel(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>CTA Title</label>
                        <input type="text" value={cmsCtaTitle} onChange={(e) => setCmsCtaTitle(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>CTA Button Text</label>
                        <input type="text" value={cmsCtaButton} onChange={(e) => setCmsCtaButton(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>CTA Description</label>
                        <textarea rows={3} value={cmsCtaDesc} onChange={(e) => setCmsCtaDesc(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px', marginTop: '20px' }}>
                      Books Page Search Engine Optimization (SEO) & Social Cards
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Google Search Title (Meta Title)</label>
                        <input type="text" value={booksSeoTitle} onChange={(e) => setBooksSeoTitle(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Social Card Image (Open Graph Share Image)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading SEO image...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setBooksSeoImage(url)
                                showToast('SEO Image uploaded!')
                              }
                            }
                          }}
                        />
                        {booksSeoImage && <img src={booksSeoImage} alt="SEO Preview" style={{ width: '80px', height: '42px', objectFit: 'cover', borderRadius: '4px', marginTop: '6px' }} />}
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Google Search Description (Meta Description)</label>
                        <textarea rows={3} value={booksSeoDesc} onChange={(e) => setBooksSeoDesc(e.target.value)} required />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                      Save Book Page Text & SEO CMS
                    </button>
                  </form>
                </div>

                {/* Books Catalog list (original) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                  
                  {/* Left side: Book Form */}
                  <div className="card">
                    <div className="section-title">
                      <h3>{editingBookId !== null ? 'Edit Book Details' : 'Add New Book to Catalog'}</h3>
                      {editingBookId !== null && (
                        <button className="btn btn-soft" onClick={() => {
                          setEditingBookId(null)
                          setCatalogNewTitle('')
                          setCatalogNewAuthor('')
                          setCatalogNewCoverImage('')
                          setCatalogNewDescription('')
                          setCatalogNewRating('5')
                        }}>Cancel Edit</button>
                      )}
                    </div>
                    <form onSubmit={handleCatalogBookSubmit}>
                      <div className="form-grid">
                        <div className="field">
                          <label>Book Title</label>
                          <input type="text" value={catalogNewTitle} onChange={(e) => setCatalogNewTitle(e.target.value)} required />
                        </div>
                        <div className="field">
                          <label>Author Name</label>
                          <input type="text" value={catalogNewAuthor} onChange={(e) => setCatalogNewAuthor(e.target.value)} required />
                        </div>
                        <div className="field">
                          <label>Book Cover Image (From Computer)</label>
                          <input 
                            type="file" 
                            onChange={handleCatalogCoverUpload} 
                            accept="image/*" 
                            required={editingBookId === null && !catalogNewCoverImage}
                          />
                          {catalogNewCoverImage && <img src={catalogNewCoverImage} alt="Cover Preview" style={{ width: '42px', height: '60px', objectFit: 'cover', borderRadius: '4px', marginTop: '6px' }} />}
                        </div>
                        <div className="field">
                          <label>Book Rating (1-5)</label>
                          <select value={catalogNewRating} onChange={(e) => setCatalogNewRating(e.target.value)}>
                            <option value="5">5 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="2">2 Stars</option>
                            <option value="1">1 Star</option>
                          </select>
                        </div>
                        <div className="field" style={{ gridColumn: 'span 2' }}>
                          <label>Book Description</label>
                          <textarea rows={4} value={catalogNewDescription} onChange={(e) => setCatalogNewDescription(e.target.value)} required />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                        {editingBookId !== null ? 'Update Book' : 'Add Book to Website'}
                      </button>
                    </form>
                  </div>

                  {/* Right side: Catalog List */}
                  <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="section-title">
                      <h3>Live Website Books Catalog ({catalogBooks.length})</h3>
                    </div>
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Cover</th>
                            <th>Title & Author</th>
                            <th>Rating</th>
                            <th>Description</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {catalogBooks.map((b) => (
                            <tr key={b.id}>
                              <td>
                                <img src={b.cover_image} alt={b.title} style={{ width: '42px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                              </td>
                              <td>
                                <b>{b.title}</b><br />
                                <small style={{ color: 'var(--muted)' }}>By {b.author}</small>
                              </td>
                              <td>⭐ {b.rating}/5</td>
                              <td>
                                <p style={{ maxWidth: '200px', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{b.description}</p>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                  <button className="btn btn-soft" style={{ padding: '6px 12px', fontSize: '11px', borderRadius: '6px' }} onClick={() => {
                                    setEditingBookId(b.id)
                                    setCatalogNewTitle(b.title)
                                    setCatalogNewAuthor(b.author)
                                    setCatalogNewCoverImage(b.cover_image)
                                    setCatalogNewDescription(b.description || '')
                                    setCatalogNewRating(String(b.rating))
                                  }}>Edit</button>
                                  <button className="btn" style={{ background: '#ef4444', color: '#fff', padding: '6px 12px', fontSize: '11px', borderRadius: '6px', fontWeight: 'bold' }} onClick={() => handleCatalogBookDelete(b.id)}>Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ABOUT PAGE SUB-TAB */}
            {cmsPageTab === 'about' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card">
                  <div className="section-title">
                    <h3>About Page Section Texts</h3>
                  </div>
                  <form onSubmit={handleAboutTextSubmit} style={{ marginTop: '16px' }}>
                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      1. Hero Section & Story Section
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Hero Sub-heading</label>
                        <input type="text" value={aboutHeroSub} onChange={(e) => setAboutHeroSub(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Hero Main Heading</label>
                        <input type="text" value={aboutHeroHeading} onChange={(e) => setAboutHeroHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Hero Button Text</label>
                        <input type="text" value={aboutHeroButton} onChange={(e) => setAboutHeroButton(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Hero Right Side Image (Computer Upload)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading hero image...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setAboutHeroImage(url)
                                showToast('Hero Image uploaded!')
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Hero Description</label>
                        <textarea rows={3} value={aboutHeroDesc} onChange={(e) => setAboutHeroDesc(e.target.value)} required />
                      </div>
                      
                      <div className="field">
                        <label>Story Left Side Heading</label>
                        <input type="text" value={aboutStoryHeading} onChange={(e) => setAboutStoryHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Story Right Side Image (Computer Upload)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading story image...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setAboutStoryImage(url)
                                showToast('Story Image uploaded!')
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Story Left Side Description</label>
                        <textarea rows={3} value={aboutStoryDesc} onChange={(e) => setAboutStoryDesc(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      2. Our Mission & Why Choose MB & Journey
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Mission Heading</label>
                        <input type="text" value={aboutMissionHeading} onChange={(e) => setAboutMissionHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Why Choose MB Heading</label>
                        <input type="text" value={aboutChooseHeading} onChange={(e) => setAboutChooseHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Mission Description</label>
                        <textarea rows={3} value={aboutMissionDesc} onChange={(e) => setAboutMissionDesc(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Why Choose MB Description</label>
                        <textarea rows={3} value={aboutChooseDesc} onChange={(e) => setAboutChooseDesc(e.target.value)} required />
                      </div>
                      
                      <div className="field">
                        <label>Publishing Journey Heading</label>
                        <input type="text" value={aboutJourneyHeading} onChange={(e) => setAboutJourneyHeading(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Publishing Journey Description</label>
                        <textarea rows={3} value={aboutJourneyDesc} onChange={(e) => setAboutJourneyDesc(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      3. Trusted Banner & CTA Bottom Section
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Trusted Quote Text</label>
                        <textarea rows={2} value={aboutTrustedQuote} onChange={(e) => setAboutTrustedQuote(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Trusted Author Name</label>
                        <input type="text" value={aboutTrustedName} onChange={(e) => setAboutTrustedName(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Trusted Author Photo</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading trusted photo...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setAboutTrustedImage(url)
                                showToast('Photo uploaded!')
                              }
                            }
                          }}
                        />
                      </div>
                      
                      <div className="field">
                        <label>CTA Heading</label>
                        <input type="text" value={aboutCtaHeading} onChange={(e) => setAboutCtaHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>CTA Button Text</label>
                        <input type="text" value={aboutCtaButton} onChange={(e) => setAboutCtaButton(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>CTA Description</label>
                        <textarea rows={2} value={aboutCtaDesc} onChange={(e) => setAboutCtaDesc(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px', marginTop: '20px' }}>
                      About Page Search Engine Optimization (SEO) & Social Cards
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Google Search Title (Meta Title)</label>
                        <input type="text" value={aboutSeoTitle} onChange={(e) => setAboutSeoTitle(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Social Card Image (Open Graph Share Image)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading SEO image...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setAboutSeoImage(url)
                                showToast('SEO Image uploaded!')
                              }
                            }
                          }}
                        />
                        {aboutSeoImage && <img src={aboutSeoImage} alt="SEO Preview" style={{ width: '80px', height: '42px', objectFit: 'cover', borderRadius: '4px', marginTop: '6px' }} />}
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Google Search Description (Meta Description)</label>
                        <textarea rows={3} value={aboutSeoDesc} onChange={(e) => setAboutSeoDesc(e.target.value)} required />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                      Save About Page Text & SEO CMS
                    </button>
                  </form>
                </div>

                {/* Team Members List CRUD */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                  <div className="card">
                    <div className="section-title">
                      <h3>{editingTeamId !== null ? 'Edit Team Member' : 'Add New Team Member'}</h3>
                      {editingTeamId !== null && (
                        <button className="btn btn-soft" onClick={() => {
                          setEditingTeamId(null)
                          setTeamName('')
                          setTeamRole('')
                          setTeamDesc('')
                          setTeamImageUrl('')
                        }}>Cancel Edit</button>
                      )}
                    </div>
                    <form onSubmit={handleTeamMemberSubmit}>
                      <div className="form-grid">
                        <div className="field">
                          <label>Member Name</label>
                          <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} required />
                        </div>
                        <div className="field">
                          <label>Role / Position</label>
                          <input type="text" value={teamRole} onChange={(e) => setTeamRole(e.target.value)} required placeholder="e.g. Editorial Director" />
                        </div>
                        <div className="field">
                          <label>Member Photo (From Computer)</label>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={async (e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                showToast('Uploading member photo...')
                                const url = await uploadMediaToStorage(file)
                                if (url) {
                                  setTeamImageUrl(url)
                                  showToast('Photo uploaded!')
                                }
                              }
                            }}
                          />
                          {teamImageUrl && <img src={teamImageUrl} alt="Team Preview" style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '50%', marginTop: '6px' }} />}
                        </div>
                        <div className="field" style={{ gridColumn: 'span 2' }}>
                          <label>Description / Bio</label>
                          <textarea rows={3} value={teamDesc} onChange={(e) => setTeamDesc(e.target.value)} />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                        {editingTeamId !== null ? 'Update Team Member' : 'Add Team Member'}
                      </button>
                    </form>
                  </div>

                  <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="section-title">
                      <h3>Live Website Team Members ({teamList.length})</h3>
                    </div>
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Photo</th>
                            <th>Name & Role</th>
                            <th>Bio Description</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {teamList.map((tm) => (
                            <tr key={tm.id}>
                              <td>
                                <img src={tm.image_url} alt={tm.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '50%' }} />
                              </td>
                              <td>
                                <b>{tm.name}</b><br />
                                <small style={{ color: 'var(--muted)' }}>{tm.role}</small>
                              </td>
                              <td>
                                <p style={{ fontSize: '12px', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tm.description}</p>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                  <button className="btn btn-soft" style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '6px' }} onClick={() => {
                                    setEditingTeamId(tm.id)
                                    setTeamName(tm.name)
                                    setTeamRole(tm.role)
                                    setTeamDesc(tm.description || '')
                                    setTeamImageUrl(tm.image_url || '')
                                  }}>Edit</button>
                                  <button className="btn" style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', fontSize: '11px', borderRadius: '6px', fontWeight: 'bold' }} onClick={() => handleTeamMemberDelete(tm.id)}>Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PRICING PAGE SUB-TAB */}
            {cmsPageTab === 'pricing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="card">
                  <div className="section-title">
                    <h3>Pricing Page Section Texts</h3>
                  </div>
                  <form onSubmit={handlePricingTextSubmit} style={{ marginTop: '16px' }}>
                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      1. Hero Section & Packages Header
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Hero Subheading</label>
                        <input type="text" value={pricingHeroSub} onChange={(e) => setPricingHeroSub(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Hero Heading</label>
                        <input type="text" value={pricingHeroHeading} onChange={(e) => setPricingHeroHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Hero Button Text</label>
                        <input type="text" value={pricingHeroButton} onChange={(e) => setPricingHeroButton(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Hero Right Side Image (Computer Upload)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading hero image...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setPricingHeroImage(url)
                                showToast('Hero Image uploaded!')
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Hero Description</label>
                        <textarea rows={3} value={pricingHeroDesc} onChange={(e) => setPricingHeroDesc(e.target.value)} required />
                      </div>
                      
                      <div className="field">
                        <label>Packages Heading</label>
                        <input type="text" value={pricingPackHeading} onChange={(e) => setPricingPackHeading(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Packages Description</label>
                        <textarea rows={2} value={pricingPackDesc} onChange={(e) => setPricingPackDesc(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px' }}>
                      2. Compare Title & Why Choose MB Section
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Compare Section Heading</label>
                        <input type="text" value={pricingCompareHeading} onChange={(e) => setPricingCompareHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Why Choose Heading</label>
                        <input type="text" value={pricingWhyHeading} onChange={(e) => setPricingWhyHeading(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Why Choose Subheading</label>
                        <input type="text" value={pricingWhySub} onChange={(e) => setPricingWhySub(e.target.value)} required />
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Why Choose Description</label>
                        <textarea rows={3} value={pricingWhyDesc} onChange={(e) => setPricingWhyDesc(e.target.value)} required />
                      </div>
                    </div>

                    <h4 style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: '15px', borderBottom: '1px dotted var(--line)', paddingBottom: '6px', marginBottom: '14px', marginTop: '20px' }}>
                      Pricing Page Search Engine Optimization (SEO) & Social Cards
                    </h4>
                    <div className="form-grid" style={{ marginBottom: '20px' }}>
                      <div className="field">
                        <label>Google Search Title (Meta Title)</label>
                        <input type="text" value={pricingSeoTitle} onChange={(e) => setPricingSeoTitle(e.target.value)} required />
                      </div>
                      <div className="field">
                        <label>Social Card Image (Open Graph Share Image)</label>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              showToast('Uploading SEO image...')
                              const url = await uploadMediaToStorage(file)
                              if (url) {
                                setPricingSeoImage(url)
                                showToast('SEO Image uploaded!')
                              }
                            }
                          }}
                        />
                        {pricingSeoImage && <img src={pricingSeoImage} alt="SEO Preview" style={{ width: '80px', height: '42px', objectFit: 'cover', borderRadius: '4px', marginTop: '6px' }} />}
                      </div>
                      <div className="field" style={{ gridColumn: 'span 2' }}>
                        <label>Google Search Description (Meta Description)</label>
                        <textarea rows={3} value={pricingSeoDesc} onChange={(e) => setPricingSeoDesc(e.target.value)} required />
                      </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                      Save Pricing Page Text & SEO CMS
                    </button>
                  </form>
                </div>

                {/* Pricing Packages list CRUD */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                  <div className="card">
                    <div className="section-title">
                      <h3>{editingPlanId !== null ? 'Edit Pricing Plan' : 'Add New Pricing Plan'}</h3>
                      {editingPlanId !== null && (
                        <button className="btn btn-soft" onClick={() => {
                          setEditingPlanId(null)
                          setPlanName('')
                          setPlanPrice('')
                          setPlanPoints('')
                          setPlanButtonText('')
                        }}>Cancel Edit</button>
                      )}
                    </div>
                    <form onSubmit={handlePricingPlanSubmit}>
                      <div className="form-grid">
                        <div className="field">
                          <label>Plan Name</label>
                          <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} placeholder="e.g. BRONZE" required />
                        </div>
                        <div className="field">
                          <label>Plan Price Amount</label>
                          <input type="text" value={planPrice} onChange={(e) => setPlanPrice(e.target.value)} placeholder="e.g. ₹9,999" required />
                        </div>
                        <div className="field">
                          <label>Button Label Text</label>
                          <input type="text" value={planButtonText} onChange={(e) => setPlanButtonText(e.target.value)} placeholder="e.g. Choose Bronze" />
                        </div>
                        <div className="field" style={{ gridColumn: 'span 2' }}>
                          <label>Plan Points (One feature per line)</label>
                          <textarea rows={6} value={planPoints} onChange={(e) => setPlanPoints(e.target.value)} placeholder="Basic Manuscript Review&#10;ISBN Assistance&#10;Basic Cover Design" required />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                        {editingPlanId !== null ? 'Update Plan' : 'Add Plan'}
                      </button>
                    </form>
                  </div>

                  <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="section-title">
                      <h3>Live Publishing Packages ({pricingPlansList.length})</h3>
                    </div>
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Plan Name</th>
                            <th>Price</th>
                            <th>Button Label</th>
                            <th>Features Count</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pricingPlansList.map((pl) => (
                            <tr key={pl.id}>
                              <td><b>{pl.name}</b></td>
                              <td>{pl.price}</td>
                              <td>{pl.button_text}</td>
                              <td>{pl.points.split('\n').filter(Boolean).length} features</td>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                  <button className="btn btn-soft" style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '6px' }} onClick={() => {
                                    setEditingPlanId(pl.id)
                                    setPlanName(pl.name)
                                    setPlanPrice(pl.price)
                                    setPlanPoints(pl.points)
                                    setPlanButtonText(pl.button_text || '')
                                  }}>Edit</button>
                                  <button className="btn" style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', fontSize: '11px', borderRadius: '6px', fontWeight: 'bold' }} onClick={() => handlePricingPlanDelete(pl.id)}>Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* FAQs List CRUD */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px' }}>
                  <div className="card">
                    <div className="section-title">
                      <h3>{editingFaqId !== null ? 'Edit FAQ Item' : 'Add New FAQ Item'}</h3>
                      {editingFaqId !== null && (
                        <button className="btn btn-soft" onClick={() => {
                          setEditingFaqId(null)
                          setFaqQuestion('')
                          setFaqAnswer('')
                        }}>Cancel Edit</button>
                      )}
                    </div>
                    <form onSubmit={handleFaqSubmit}>
                      <div className="form-grid">
                        <div className="field" style={{ gridColumn: 'span 2' }}>
                          <label>FAQ Question</label>
                          <input type="text" value={faqQuestion} onChange={(e) => setFaqQuestion(e.target.value)} required />
                        </div>
                        <div className="field" style={{ gridColumn: 'span 2' }}>
                          <label>FAQ Answer</label>
                          <textarea rows={4} value={faqAnswer} onChange={(e) => setFaqAnswer(e.target.value)} required />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                        {editingFaqId !== null ? 'Update FAQ' : 'Add FAQ'}
                      </button>
                    </form>
                  </div>

                  <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="section-title">
                      <h3>Live Website FAQs ({faqsList.length})</h3>
                    </div>
                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Answer Preview</th>
                            <th style={{ textAlign: 'center' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {faqsList.map((fq) => (
                            <tr key={fq.id}>
                              <td><b>{fq.question}</b></td>
                              <td>
                                <p style={{ fontSize: '12px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{fq.answer}</p>
                              </td>
                              <td style={{ textAlign: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                  <button className="btn btn-soft" style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '6px' }} onClick={() => {
                                    setEditingFaqId(fq.id)
                                    setFaqQuestion(fq.question)
                                    setFaqAnswer(fq.answer)
                                  }}>Edit</button>
                                  <button className="btn" style={{ background: '#ef4444', color: '#fff', padding: '4px 10px', fontSize: '11px', borderRadius: '6px', fontWeight: 'bold' }} onClick={() => handleFaqDelete(fq.id)}>Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

              </div>
            )}

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
              <th>Platform</th>
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
                  <td>
                    <span className="status" style={{ fontSize: '11px', padding: '2px 8px', background: m.source === 'Amazon' ? '#10b981' : '#3b82f6', color: '#fff', borderRadius: '4px' }}>
                      {m.source}
                    </span>
                  </td>
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
