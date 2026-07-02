# Deployment Guide

Step-by-step instructions for deploying the MSF Donation Portal to production.

---

## Prerequisites

- GitHub account with repository pushed
- Render account (render.com)
- Vercel account (vercel.com)

---

## Step 1: Prepare GitHub Repository

### 1.1 Initialize Git (if not already done)

```bash
cd donation-portal
git init
git add .
git commit -m "Initial commit: MSF donation portal"
git branch -M main
```

### 1.2 Add Remote & Push

```bash
git remote add origin https://github.com/yourusername/donation-portal.git
git push -u origin main
```

### 1.3 Verify on GitHub

- Visit https://github.com/yourusername/donation-portal
- Confirm all files are pushed
- Verify folder structure is correct

---

## Step 2: Deploy Backend to Render

### 2.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up (free tier available)
3. Connect GitHub account

### 2.2 Create New Web Service

1. Click **New +** → **Web Service**
2. Select your **donation-portal** repository
3. Click **Connect**

### 2.3 Configure Service

Fill in the deployment settings:

| Setting | Value |
|---------|-------|
| **Name** | donation-api (or custom) |
| **Environment** | Node |
| **Region** | Choose closest to you |
| **Branch** | main |
| **Build Command** | `cd backend && npm install` |
| **Start Command** | `cd backend && npm start` |

### 2.4 Add Environment Variables

Click **Add Environment Variable** for each:

```
NODE_ENV = production
PORT = 5000
FRONTEND_URL = https://donation-portal.vercel.app
MPESA_SUCCESS_RATE = 0.85
PAYMENT_TIMEOUT_MS = 3000
DEBUG = false
```

**Note**: Replace `donation-portal.vercel.app` with your actual Vercel domain (Step 3)

### 2.5 Deploy

1. Click **Create Web Service**
2. Wait for build to complete (3-5 minutes)
3. Copy the service URL: `https://donation-api-xxx.render.com`

### 2.6 Verify Backend is Running

```bash
curl https://donation-api-xxx.render.com/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "..."
}
```

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Authorize GitHub access

### 3.2 Import Project

1. Click **Add New...** → **Project**
2. Select your **donation-portal** repository
3. Click **Import**

### 3.3 Configure Project

#### Framework Preset
- Should auto-detect **Create React App**
- If not, select from dropdown

#### Root Directory
- Leave blank (Vercel will auto-detect)

#### Build Settings
- **Build Command**: `npm run build` (should auto-fill)
- **Output Directory**: `build` (should auto-fill)
- **Install Command**: `npm install` (should auto-fill)

### 3.4 Add Environment Variables

Click **Environment Variables** and add:

```
REACT_APP_API_URL = https://donation-api-xxx.render.com/api
REACT_APP_ENV = production
```

**Replace** `donation-api-xxx.render.com` with your actual Render backend URL from Step 2.

### 3.5 Deploy

1. Click **Deploy**
2. Wait for build to complete (2-3 minutes)
3. Get your frontend URL: `https://donation-portal-xxx.vercel.app`

### 3.6 Verify Frontend is Running

- Visit `https://donation-portal-xxx.vercel.app`
- Should load the donation form
- Check browser console for errors

---

## Step 4: Update Backend CORS

Now that you have the Vercel URL, update Render:

### 4.1 Go to Render Dashboard

1. Visit [render.com/dashboard](https://render.com/dashboard)
2. Click on **donation-api** service
3. Click **Settings**

### 4.2 Update Environment Variable

```
FRONTEND_URL = https://donation-portal-xxx.vercel.app
```

Replace with your actual Vercel URL

### 4.3 Redeploy

1. Click **Deployments** tab
2. Click **Redeploy Latest** on latest deployment
3. Wait for redeploy to complete

---

## Step 5: End-to-End Testing

### 5.1 Test Frontend

Visit: `https://donation-portal-xxx.vercel.app`

- [ ] Page loads without CORS errors
- [ ] Security banner visible
- [ ] Can fill form without errors

### 5.2 Test M-Pesa Flow

1. Enter donation details
2. Select M-Pesa
3. Click "Donate Now"
4. Confirm on phone (button click)
5. Should show success or error screen
6. Check Network tab → API call to `https://donation-api-xxx.render.com/api/donate`

### 5.3 Test Card Flow (Success)

1. Select Card
2. Enter test card: `4242 4242 4242 4242`
3. Expiry: `12/26`, CVV: `123`
4. Click "Donate Now"
5. Should see success screen with Transaction ID

### 5.4 Test Card Flow (Decline)

1. Select Card
2. Enter test card: `4000 0000 0000 0002`
3. Click "Donate Now"
4. Should see decline error message

### 5.5 Verify API Directly

Test backend endpoint:

```bash
curl -X POST https://donation-api-xxx.render.com/api/donate \
  -H "Content-Type: application/json" \
  -d '{
    "donorName": "Test User",
    "donorEmail": "test@example.com",
    "amount": 1000,
    "paymentMethod": "mpesa"
  }'
```

Should return 200 with transaction ID.

---

## Step 6: Update Repository with Deployment URLs

### 6.1 Update README

Edit `README.md` and replace:

```markdown
**Live Demo:** [To be deployed](#deployment)
```

With:

```markdown
**Live Demo:** [https://donation-portal-xxx.vercel.app](https://donation-portal-xxx.vercel.app)

**API Base URL:** `https://donation-api-xxx.render.com/api`
```

### 6.2 Commit Changes

```bash
git add README.md
git commit -m "Add deployment URLs"
git push
```

Both services will auto-redeploy on push.

---

## Step 7: Setup Auto-Deployments

### 7.1 Render (Already Set)

- Auto-deploys on push to main branch
- No configuration needed

### 7.2 Vercel (Already Set)

- Auto-deploys on push to main branch
- Vercel creates preview URLs for pull requests

---

## Troubleshooting

### CORS Errors

**Error**: `Access-Control-Allow-Origin` error in frontend

**Solution**:
1. Verify `FRONTEND_URL` in Render backend matches Vercel URL
2. Redeploy backend
3. Hard refresh frontend (Cmd+Shift+R / Ctrl+Shift+R)

### 500 Errors from API

**Error**: "Internal server error" from /api/donate

**Solution**:
1. Check Render logs: Dashboard → donation-api → Logs
2. Verify environment variables are set
3. Check for typos in .env setup

### Build Failures on Vercel

**Error**: "Build failed" on Vercel

**Solution**:
1. Check Vercel Deployments → Logs
2. Common issues:
   - Missing dependencies: Run `npm install` locally, commit package-lock.json
   - Wrong build command: Should be `npm run build`
   - Environment variables: Verify in Project Settings

### Build Failures on Render

**Error**: "Build failed" on Render

**Solution**:
1. Check Render Deployments → View Logs
2. Common issues:
   - Node version: Should be >= 16
   - Start command: Should reference `npm start` in backend
   - Dependencies: Check package.json is valid JSON

### Slow First Load

**Issue**: First request takes 10+ seconds

**Cause**: Render free tier spins down services after inactivity

**Solution**: 
- Upgrade to paid tier (recommended for production)
- Or accept slower cold starts during testing

---

## Production Checklist

Before final submission, verify:

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Both URLs in README.md
- [ ] M-Pesa flow works in production
- [ ] Card flow works in production
- [ ] Success/error screens display
- [ ] No console errors in browser
- [ ] API documentation complete
- [ ] GitHub repository public
- [ ] All code committed and pushed

---

## Maintenance

### Monitor Performance

- **Vercel**: Dashboard → Analytics
- **Render**: Dashboard → Metrics

### Update Environment Variables

**Vercel**:
1. Project Settings → Environment Variables
2. Edit and save
3. Redeploy

**Render**:
1. Service Settings → Environment
2. Edit and save
3. Redeploy

### View Logs

**Vercel**:
- Deployments → Logs (live)

**Render**:
- Service → Logs (live streaming)

---

## Rollback (if needed)

**Vercel**:
1. Deployments → Find previous deployment
2. Click → Promote to Production

**Render**:
1. Deployments → Click previous deployment
2. Click Redeploy

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Pages (alternative frontend hosting)](https://pages.github.com)
- [Railway (alternative backend hosting)](https://railway.app)
- [Netlify (alternative frontend hosting)](https://netlify.com)

---

**Deployment Guide Version**: 1.0  
**Last Updated**: July 2026