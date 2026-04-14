source "https://rubygems.org"

gem "jekyll", "~> 4.3"
gem "bigdecimal"  # required explicitly from Ruby 3.4+
gem "jekyll-sass-converter", "~> 2.0"  # 3.x breaks minimal-mistakes sass imports
gem "minimal-mistakes-jekyll"
gem "webrick"
gem "jekyll-remote-theme"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-include-cache"
end

platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
