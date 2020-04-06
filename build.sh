set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
USERNAME=adityashahi
# image name
IMAGE=myapp
docker build -t $USERNAME/$IMAGE:latest .