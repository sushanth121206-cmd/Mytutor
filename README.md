# 🎓 My Tutor — Tuition Management System

A classic, sky-blue themed tuition management web app built with **pure HTML / CSS / JavaScript**.

---

## 🔐 Login Credentials

| Role    | Phone       | Email                   | Password   |
|---------|-------------|-------------------------|------------|
| Faculty | 9876543210  | faculty@mytutor.com     | faculty123 |
| Parent  | 9876543210  | parent@mytutor.com      | parent123  |

### Validation Rules
- **Phone**: exactly 10 digits, must start with 6, 7, 8, or 9
- **Email**: standard format — `name@domain.com`
- **Password**: minimum 6 characters
- All fields show live green/red feedback as you type

---

## 🚀 Deploy to Vercel (Get a Public Link)

### Option A — CLI (fastest, ~2 minutes)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Enter project folder
cd mytutor

# 3. Login (free)
vercel login

# 4. Deploy!
vercel

# Your URL will be like: https://my-tutor-abc123.vercel.app
```

### Option B — Drag & Drop (no code needed)

1. Go to **https://vercel.com** → Sign up free
2. Click **Add New → Project**
3. Choose **"Upload from your computer"**
4. Drag the entire `mytutor` folder
5. Click **Deploy** — live in ~30 seconds!

### Option C — GitHub Auto-Deploy

```bash
git init && git add . && git commit -m "My Tutor launch"
gh repo create mytutor --public --push --source=.
# Then import repo at vercel.com/new
```

---

## 💻 Run Locally

```bash
# Python (built-in, no install)
cd mytutor
python -m http.server 3000
# Open: http://localhost:3000

# OR just open index.html directly in your browser
```

---

## 📁 File Structure

```
mytutor/
├── index.html    ← All screens: role selection, 2 login pages, dashboards
├── style.css     ← Classic sky-blue theme, responsive
├── app.js        ← Login validation, navigation, all data & charts
├── vercel.json   ← Vercel static deployment config
└── README.md
```

---

## ✨ Features

| Page | Description |
|------|-------------|
| Role Selection | Choose Faculty or Parent with animated cards |
| Faculty Login | Phone + Email + Password with live validation |
| Parent Login | Same validation, separate credential set |
| Dashboard | Stats, attendance chart, exam table, fee donut |
| Enrollment | Add students with full validated form |
| Attendance | Mark P/A/L per student per class per day |
| Exams & Results | Schedule exams, view result grades |
| Finance | Invoice tracking, mark-as-paid workflow |
| Schedule | Weekly colour-coded timetable |
| Students | Searchable card grid |
| Parent Portal | Child's attendance, results, fees, upcoming events |

---

Built with HTML · CSS · JavaScript · Google Fonts (Playfair Display + Nunito + Fira Mono)
