#!/bin/bash

echo -e "\nDeploying dist/ to gh-pages...\n"

cd ..
git push origin `git subtree split --prefix tulios-graveyard/dist main`:gh-pages --force