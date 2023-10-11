if ["$NETLIFY" !="true"]; then
  yarn next-sitemap --config next-sitemap.config.js
fi

