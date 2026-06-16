#!/bin/bash
# YZT Personal Site — Deploy to GitHub Pages
cd "$(dirname "$0")"

echo "🚀 Deploying yzt.qzz.io ..."

# Create repo
if ! gh repo view 314xxx/yzt-site &>/dev/null; then
  echo "📦 Creating GitHub repo..."
  gh repo create 314xxx/yzt-site --public --source=. --remote=origin
fi

# Fix branch name
git branch -M main

# Commit & push
git add -A
git diff --cached --quiet || git commit -m "update: $(date +%Y-%m-%d_%H:%M)"
git push -u origin main --force

# Enable GitHub Pages
echo "🌐 Enabling GitHub Pages..."
gh api repos/314xxx/yzt-site/pages \
  --method POST \
  --field source='{"branch":"main","path":"/"}' \
  2>/dev/null || echo "(Pages may already be enabled)"

echo ""
echo "✅ Done! Site live at: https://yzt.qzz.io"
echo ""
echo "📋 DNS Setup (in Cloudflare):"
echo "   Type: CNAME"
echo "   Name: yzt"
echo "   Target: 314xxx.github.io"
