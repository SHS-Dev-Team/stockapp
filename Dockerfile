#put python image in dockerfile
FROM python:3.8.1-buster

ADD . /stockapp
#make working directory for app
WORKDIR /stockapp

#put main python file into working directory
RUN ls

#DO NOT CHANGE {
## Step 3:
# Install packages from requirements.txt
# hadolint ignore=DL3013
RUN pip install --upgrade pip &&\
    pip install --trusted-host pypi.python.org -r requirements.txt
WORKDIR /stockapp/stockapp
RUN npm install
#}
COPY do.sh /root/do.sh
RUN chmod +x do.sh

RUN ./do.sh

EXPOSE 80

#run main python file with python
CMD ["python", "stockapp/manage.py", "runserver"]

