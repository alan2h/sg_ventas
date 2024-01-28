FROM python:3.9
ENV PYTHONUNBUFFERED=1
WORKDIR /usr/src/app
COPY requirements/local.txt ./
RUN apt-get update && apt-get upgrade -y && apt-get install gcc
RUN pip install -r local.txt