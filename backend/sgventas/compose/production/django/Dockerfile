# pull official base image
FROM python:3.11.4-slim-buster as builder

# set work directory
WORKDIR /usr/src/backend

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc

# lint
RUN pip install --upgrade pip
RUN pip install flake8==6.0.0
COPY . /usr/src/backend/
# RUN flake8 --ignore=E501,F401 .

# install python dependencies
COPY ./requirements/local.txt .
RUN pip wheel --no-cache-dir --no-deps --wheel-dir /usr/src/backend/wheels -r local.txt


#########
# FINAL #
#########

# pull official base image
FROM python:3.11.4-slim-buster

# create directory for the backend user
RUN mkdir -p /home/backend

# create the backend user
RUN addgroup --system backend && adduser --system --group backend

# create the appropriate directories
ENV HOME=/home/backend
ENV APP_HOME=/home/backend/web
RUN mkdir $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN chown -R backend:backend $APP_HOME/staticfiles
WORKDIR $APP_HOME

# install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends netcat
COPY --from=builder /usr/src/backend/wheels /wheels
COPY --from=builder /usr/src/backend/local.txt .
RUN pip install --upgrade pip
RUN pip install --no-cache /wheels/*

# copy entrypoint.prod.sh
COPY ./compose/production/django/entrypoint.sh .
RUN sed -i 's/\r$//g'  $APP_HOME/entrypoint.sh
RUN chmod +x  $APP_HOME/entrypoint.sh


# copy project
COPY . $APP_HOME

# chown all the files to the backend user
RUN chown -R backend:backend $APP_HOME


# change to the app user
USER backend

# run entrypoint.prod.sh
ENTRYPOINT ["/home/backend/web/entrypoint.sh"]