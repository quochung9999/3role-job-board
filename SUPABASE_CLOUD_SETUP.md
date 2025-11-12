# 🚀 Supabase CLI - Cloud Only Setup (No Docker)

## ✅ Step 1: Supabase CLI Installed
- Version: 2.58.5
- Installed via Scoop
- Project initialized

## 📋 Step 2: Get Your Access Token

### Go to Supabase Dashboard
1. Open: https://supabase.com/dashboard/account/tokens
2. Click **"Generate New Token"**
3. Give it a name: `cli-access-token`
4. Click **"Generate Token"**
5. **Copy the token** (you won't see it again!)

### Set the Access Token
Run this command (replace YOUR_TOKEN with the token you copied):

```powershell
$env:SUPABASE_ACCESS_TOKEN="YOUR_TOKEN_HERE"
```

**Or** set it permanently:
```powershell
[System.Environment]::SetEnvironmentVariable('SUPABASE_ACCESS_TOKEN', 'YOUR_TOKEN_HERE', 'User')
```

## 🔗 Step 3: Link to Your Cloud Project

```powershell
supabase link --project-ref eksufbewfgepqklfetoc
```

When prompted for database password, enter the password you set when creating the project.

## 📊 Step 4: Apply Your Database Schema

```powershell
# Push the schema file to your cloud database
supabase db push --include-all < supabase-schema.sql
```

**Or** use migrations:

```powershell
# Create a migration from the schema file
supabase migration new initial_schema

# Copy the content from supabase-schema.sql into:
# supabase/migrations/XXXXXXX_initial_schema.sql

# Push to cloud
supabase db push
```

## 🎯 Step 5: Generate TypeScript Types (Optional but Recommended)

```powershell
supabase gen types typescript --linked > database.types.ts
```

This creates type definitions for your database schema!

## 📝 Useful Commands (Cloud Mode)

```powershell
# Check status
supabase status

# View remote database
supabase db pull

# Push local changes to cloud
supabase db push

# View database diff
supabase db diff

# Reset remote database (WARNING!)
supabase db reset --linked

# View logs
supabase functions logs

# Generate types
supabase gen types typescript --linked
```

## 🔄 Workflow Without Docker

### 1. Make Database Changes
Edit files in `supabase/migrations/` or create new ones:
```powershell
supabase migration new add_feature_name
```

### 2. Apply to Cloud
```powershell
supabase db push
```

### 3. Update Types
```powershell
supabase gen types typescript --linked > database.types.ts
```

### 4. Test in Your App
Open `3role_job_board.html` and test with cloud database

## 🎨 Your Project Structure

```
single_html_app/
├── supabase/
│   ├── config.toml           # Supabase configuration
│   ├── seed.sql              # Sample data
│   └── migrations/           # Database schema versions
│       └── XXXXXXXX_initial_schema.sql
├── .vscode/
│   └── settings.json         # VS Code Deno settings
├── 3role_job_board.html      # Your app
├── supabase-schema.sql       # Database schema
└── database.types.ts         # Generated TypeScript types
```

## ✨ Benefits of This Approach

✅ **No Docker Required**
- Lighter setup
- Less disk space
- Faster startup

✅ **Direct Cloud Connection**
- Work with real data
- No local/production sync needed
- Instant deployment

✅ **Version Control**
- Track database changes in git
- Migration history
- Team collaboration

✅ **Type Safety**
- Auto-generated TypeScript types
- Better IDE autocomplete
- Fewer bugs

## 🔐 Your Credentials

**Project URL:** `https://eksufbewfgepqklfetoc.supabase.co`
**Project Ref:** `eksufbewfgepqklfetoc`
**Anon Key:** (already have it)
**Access Token:** (need to generate from dashboard)

## ⚡ Quick Setup Commands

```powershell
# 1. Set access token (get from https://supabase.com/dashboard/account/tokens)
$env:SUPABASE_ACCESS_TOKEN="your_access_token_here"

# 2. Link to project
supabase link --project-ref eksufbewfgepqklfetoc

# 3. Create migration from schema
supabase migration new initial_schema
# Then copy content from supabase-schema.sql into the migration file

# 4. Push to cloud
supabase db push

# 5. Generate types
supabase gen types typescript --linked > database.types.ts

# 6. Done! Open your app
start 3role_job_board.html
```

## 🐛 Troubleshooting

### Access token error?
Generate a new token: https://supabase.com/dashboard/account/tokens

### Link failed?
- Check project ref: `eksufbewfgepqklfetoc`
- Verify database password
- Check internet connection

### Push failed?
```powershell
# Check diff first
supabase db diff

# View remote schema
supabase db pull
```

---

## 🎯 Next Steps

1. **Generate access token** from dashboard
2. **Link to cloud project**
3. **Push schema**
4. **Test your app!**

Ready to continue? Get your access token from:
👉 https://supabase.com/dashboard/account/tokens
