#!/bin/bash
# YZT Personal Site — Deploy to GitHub Pages
# Usage: bash deploy.sh

set -e

echo "🚀 Deploying yzt.qzz.io ..."

cd "$(dirname "$0")"

# Create repo if not exists
if ! gh repo view yzt/yzt-site &>/dev/null; then
  echo "📦 Creating GitHub repo..."
  gh repo create yzt/yzt-site --public --source=. --remote=origin
fi

# Commit & push
git add -A
git diff --cached --quiet || git commit -m "update: $(date +%Y-%m-%d_%H:%M)"
git branch -M main
git push -u origin main --force

# Enable GitHub Pages
echo "🌐 Enabling GitHub Pages..."
gh api repos/yzt/yzt-site/pages \
  --method POST \
  --field source='{"branch":"main","path":"/"}' \
  2>/dev/null || echo "(Pages may already be enabled)"

echo ""
echo "✅ Done! Site live at: https://yzt.qzz.io"
echo ""
echo "📋 DNS Setup (in Cloudflare):"
echo "   Type: CNAME"
echo "   Name: yzt"
echo "   Target: yzt.github.io"
echo "   Proxy: DNS only (grey cloud)"
echo ""
echo "📄 Pages:"
echo "   Home:     https://yzt.qzz.io/"
echo "   Pentest:  https://yzt.qzz.io/pentest-roadmap.html"
