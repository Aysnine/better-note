#!/usr/bin/env sh

# abort on errors
# set -e

# clone
git clone https://${GH_REF} .deploy_git
cd .deploy_git
git checkout master
cd ..
mv .deploy_git/.git/ docs/.vuepress/dist

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
echo ${GH_CUSTOM_DOMAIN} > CNAME

# add commit timestamp
git add .
git commit -m "Travis CI Auto Builder at `date +"%Y-%m-%d %H:%M"`"

# Github Pages
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:master
