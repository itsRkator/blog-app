# Use an official Python runtime as a parent image
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

# Set the working directory to /backend
WORKDIR /backend

# Copy the current directory contents into the container at /backend
COPY . .

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the FastAPI app
CMD ["python", "main.py"]
