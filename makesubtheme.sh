if [ $# -eq 0 ]
  then
    echo "No arguments supplied, pass in subtheme name."
  else 
    echo "Create themes/custom folder"
    mkdir -p themes/custom
    echo "Copy starterkit"
    cp  -r  themes/contrib/prudentia/starterkit/yourthemename  themes/custom/$1
    echo "Rename files"
    mv themes/custom/$1/yourthemename.info.rename.me.yml themes/custom/$1/$1.info.yml
    for file in themes/custom/$1/*yourthemename*.yml ; do mv $file ${file//yourthemename/$1} ; done
    for file in themes/custom/$1/sass/*yourthemename*.scss ; do mv $file ${file//yourthemename/$1} ; done
    for file in themes/custom/$1/config/install/*yourthemename*.yml ; do mv $file ${file//yourthemename/$1} ; done
    for file in themes/custom/$1/config/optional/*yourthemename*.yml ; do mv $file ${file//yourthemename/$1} ; done
    for file in themes/custom/$1/config/schema/*yourthemename*.yml ; do mv $file ${file//yourthemename/$1} ; done
    for file in themes/custom/$1/js/*yourthemename*.js ; do mv $file ${file//yourthemename/$1} ; done
    echo "String replacements"
    for file in themes/custom/$1/*.yml ; do sed -i "s/yourthemename/$1/" $file; done
    for file in themes/custom/$1/sass/*.scss ; do sed -i "s/yourthemename/$1/" $file; done
    for file in themes/custom/$1/config/optional/*.yml ; do sed -i "s/yourthemename/$1/" $file; done
   for file in themes/custom/$1/config/schema/*.yml ; do sed -i "s/yourthemename/$1/" $file; done
fi
