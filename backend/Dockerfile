# use official Python runtime as parent image
FROM python:3.11-slim

# set working directory
WORKDIR /app

# copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# copy all files to workdir
COPY --exclude=badges.db --exclude=images/ . /app

# make port 5000 available
EXPOSE 5000

# setup and then run server
CMD python init_db.py && python main.py
