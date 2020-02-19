#put python image in dockerfile
FROM python:3.8.1-buster

#make working directory for app
WORKDIR /app

#put main python file into working directory
COPY . stockapp/manage.py /app/

#DO NOT CHANGE {
## Step 3:
# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN pip install --upgrade pip &&\
    pip install --trusted-host pypi.python.org -r requirements.txt
#}

EXPOSE 80

#run main python file with python
CMD ["python", "manage.py"]

