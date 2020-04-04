set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=adityashahi
# image name
IMAGE=react-web-app
docker build -t $USERNAME/$IMAGE:latest .