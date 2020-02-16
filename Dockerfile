#put python image in dockerfile
FROM python:3.9-rc-alpine3.10

#make working directory for app
WORKDIR /app

#put main python file into working directory
COPY . stockapp/manage.py /app/

#Install requirements (pandas, matplotlib etc)
RUN pip install --upgrade pip &&\
    pip install --trusted-host pypi.python.org -r requirements.txt
    python manage.py makemigrations
    python manage.py migrate

EXPOSE 80

#run main python file with python
CMD ["python", "manage.py","runserver"]

