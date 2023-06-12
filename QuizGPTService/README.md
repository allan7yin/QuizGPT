# QuizGPT 

## What is this
Fun application that generates quizes via OpenAI `text-davinci-003` model. Application built using Flask framework connected to local SQLite Database. 

This repo has been updated to work with `Python v3.9` and up.

## Prerequisites 
Sign up for [OpenAI](https://openai.com) and get your secret key. This is rotated periodically so needs to be updated. It is recommended to use a Python Virtual Environment.

## How To Run
1. Install Python >= 3.8. Below is for MacOS:
```
$ brew install Python@3.9
```
2. Enter Python Vritual Environment (Example shown below, e.g open a terminal in the project root directory and run):
```
$ virtualenv env
```
3. Then enter the virtual environment:
```
$ source env/bin/activate
```
4. Then install the dependencies:
```
$ (env) pip install -r requirements.txt
```
5. Finally start the web server:
```
$ (env) flask run
```

This server will start on port 5000 by default. You can change this in `app.py` by changing the following line to this:

```python
if __name__ == "__main__":
    app.run(debug=True, port=<desired port>)
```

## Next Steps
- Polish UI
- Allow for downloading into local file from site
- Implement a RabbitMQ features 