#put python image in dockerfile
FROM python:3.9.0a3-buster

#make working directory for app
WORKDIR /app

#put main python file into working directory
COPY . manage.py /app/

#Install requirements (pandas, matplotlib etc)
RUN pip install --upgrade pip &&\
    pip install --trusted-host pypi.python.org -r requirements.txt


EXPOSE 80

#run main python file with python
CMD ["python", "manage.py"]

