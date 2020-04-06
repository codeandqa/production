set -ex
# SET THE FOLLOWING VARIABLES
# docker hub username
# USERNAME=adityashahi
# # image name
# IMAGE=react-web-app
# # ensure we're up to date
# git pull
# # bump version
# docker run --rm -v "$PWD":/app $USERNAME/react-web-app --input  "$version" patch
# version=`cat VERSION`
# echo "version: $version"
# # run build
# ./build.sh
# # tag it
# git add -A
# git commit -m "version $version"
# git tag -a "$version" -m "version $version"
# git push
# git push --tags
# docker tag $USERNAME/$IMAGE:latest $USERNAME/$IMAGE:$version
# # push it
# docker push $USERNAME/$IMAGE:latest
# docker push $USERNAME/$IMAGE:$version

#/bin/bash 
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

sed -i -e "s/$value/$updated_version/" VERSION

GIT=`which git`
git add VERSION
git commit -m "version $updated_version"
${GIT} tag -a "$updated_version" -m "version $updated_version"
${GIT} push
${GIT} push --tags


