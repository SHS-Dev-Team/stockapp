# stockapp
web application helping people make more money in the stock market 
Using:
Sharpe Ratio
P/E returns


Here is a guide on how to run the Django project from your Mac:

1. Make sure you have python installed (latest version or anything above 3.0):
https://www.python.org/downloads/ and node.js installed (https://nodejs.org/en/)

2. Also make sure you have git installed (https://git-scm.com/downloads). This tool allows you to retrieve stuff from github.

3. Once downloaded, open the Mac terminal, go to a folder of your choice, then type
   `git clone https://github.com/SHS-Dev-Team/stockapp.git`
   
4. Once cloned, enter the directory you just cloned
   `cd stockapp`
   then download all required libraries for the project using
   `pip install -r requirements.txt` or `make install`
   
5. If you type `ls`, you’ll get a list of folders and files inside what you just cloned. The Django project is inside the folder called    “stockapp” (that can be a bit confusing). Everything else is for other aspects of the project such as sharing Jupyter notebooks.

6. Type `cd stockapp` again
   Now you’re inside the Django project. If you want to get the site started, skip this section. Otherwise, here’s a quick rundown on      what everything is
   * **Blog folder**: this is an app. Django projects consist of apps for different functionalities of the site such as the blog, the calendar function, the interactive map, or whatever. So far we have one app called “blog.” Inside are several files and folders. The important ones are
      * **models.py**: Django models describe what kind of data will be going inside your database. This is essentially the middleman between data submitted by users and the website’s database. One of my models is called “Post” which contains required information like title, date, and body. Models make saving new information in SQL databases easier. (This site uses SQLite). 
      * **urls.py**: This is where URL schemes are held. Whenever a user enters one of the url paths listed, the request goes through urls.py first.
      * **views.py**: (Most times) The urls.py then calls a function from the views.py folder. Functions include “createPost()” which creates the post and “delete()” which deletes a given post. Views get aid from the models.py to create or delete information in the database. 
      * **Template folder**: This is where all the html pages are stored. Usually views.py functions return a template from this folder. 
   * **Stockapp folder**: this is the main project folder which holds the settings and other url schemes.
   * **Db.sqlite3**: this is the actual database. It’s not meant to be opened. The models.py file interacts with this. 
   * **Manage.py**: this is the control deck. You use this to run the server, create new apps, or whatever. 
   
7. Go to the samplegraph folder and run `npm install` to install all dependencies. After that run `npm run dev` to pack all the javascript files into one main.js file (this uses something called webpack). Before you can run the server, you must register your models.py file with the database. Cloning this project won’t automatically do this. You have to do this yourself. This is done with these two commands:
    * `python manage.py makemigrations`
    * `python manage.py migrate`
    * Now you’re ready. Run this command
    * `python manage.py runserver`
    * You can access the site by going to this URL: http://127.0.0.1:8000/

8. If you ever made changes to the project and want to upload them to github, run these commands
    * `git add .`
    * `git commit -m "new commit"`
    * `git push origin master`
    * However, before uploading changes, always update the project with changes others have made. You can pull new changes made on the      project by others through `git pull .`

# How do you use the site?
The homepage is http://127.0.0.1:8000/ or http://127.0.0.1:8000/home which is where all your posts will be displayed. To create a new post, either click the button that says “Click to Create New Post” or visit http://127.0.0.1:8000/home/new. To delete a post, go to http://127.0.0.1:8000/delete and select which posts you want to delete. 




# please don't forget to use git pull




**FUTURE NOTES**
  * If we ever make this site public, make sure to go to stockapp/setting.py and make ‘DEBUG=False’  
