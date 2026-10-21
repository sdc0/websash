# use official Python runtime as parent image
FROM python:3.11-slim

# set working directory
WORKDIR /apps/websash

# copy requirements file and install dependencies
COPY requirements.txt /apps/websash/
RUN pip install --no-cache-dir -r requirements.txt

# copy all files to workdir
COPY . /apps/websash

# make port 5000 available
EXPOSE 5000

# setup database and then run server
CMD ["python", "init_db.py"]
CMD ["python", "main.py"]