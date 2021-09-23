FROM gitpod/workspace-full
USER root
# Setup Heroku CLI
RUN curl https://cli-assets.heroku.com/install.sh | sh