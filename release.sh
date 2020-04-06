#/bin/bash 
############################################################################
#   usage: ./release.sh <release_type> release_type: major, minor, patch   #    
############################################################################

set -ex
# SET THE FOLLOWING VARIABLES

# docker hub username
USERNAME=adityashahi
# # image name
IMAGE=myapp

#Read the VERSION file and generate new release versioion
value=`cat VERSION`
major="$(cut -d'.' -f1 <<<$value)"
minor="$(cut -d'.' -f2 <<<$value)"
patch="$(cut -d'.' -f3 <<<$value)"

new_major="$((major + 1))"
new_minor="$((minor + 1))"
new_patch="$((patch + 1))"

if [ "$1" == "major" ]
then
   updated_version="$new_major.$minor.$patch"
elif [ "$1" == "minor" ]
then
   updated_version="$major.$new_minor.$patch"
elif [ "$1" == "patch" ]
then
   updated_version="$major.$minor.$new_patch"
fi

echo "update the VERSION: $updated_version"

#On docker hub, if you have autobuild set with tags, use followingling. 
############################ Tag Release ############################

# echo "Release tag $updated_version"
# sed -i -e "s/$value/$updated_version/" VERSION
# GIT=`which git`
# ${GIT} add VERSION
# ${GIT} commit -m "version $updated_version"
# ${GIT} tag -a "$updated_version" -m "version $updated_version"
# ${GIT} push
# ${GIT} push --tags
# echo "Completed release tag $updated_version"


############################ Docker hub Push ############################

# echo "start docker build with tag: latest."
# docker build -t $USERNAME/$IMAGE:latest .
# echo "Copy latest tag with $updated_version."
# docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$updated_version

# echo "Push latest and $updated_version to docker hub."
# docker push $USERNAME/$IMAGE:latest
# docker push $USERNAME/$IMAGE:$updated_version


