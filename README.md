![Shhh](https://i.imgur.com/0MPGbQj.png)

[![Build Status](https://travis-ci.com/smallwat3r/shhh.svg?branch=master)](https://travis-ci.com/smallwat3r/shhh)
[![codecov](https://codecov.io/gh/smallwat3r/shhh/branch/master/graph/badge.svg)](https://codecov.io/gh/smallwat3r/shhh)
[![Maintainability](https://api.codeclimate.com/v1/badges/f7c33b1403dd719407c8/maintainability)](https://codeclimate.com/github/smallwat3r/shhh/maintainability)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/smallwat3r/shhh/blob/master/LICENSE)

## What is it?

**Shhh** is a tiny Flask app to create encrypted secrets and share 
them securely with people. The goal of this application is to get rid
of plain text sensitive information into emails or chat logs.  

Shhh is deployed [here](https://shhh-encrypt.herokuapp.com/), but
**it's better for organisations and people to deploy it on their own
personal / private server** for even better security. You can find
in this repo everything you need to host the app yourself.  

Or you can **one-click deploy to Heroku** using the below button.
It will generate a fully configured private instance of Shhh 
immediately (using your own server and Postgres database, for free).  

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/smallwat3r/shhh)

## How does it work?

The sender has to set an expiration date along with a passphrase to
protect the information he wants to share.  

A unique link is generated by Shhh that the sender can share with the
receiver in an email, alongside the temporary passphrase he created
in order to reveal the secret.  

The secret will be **permanently removed** from the database as soon 
as one of these events happens:  

* the expiration date has passed (max 7 days). 
* the receiver has decrypted the message. 
* or the amount of tries to open the secret has exceeded (max 10). 

The secrets are encrypted in order to make the data anonymous, 
especially in the database, and the passphrases are not stored 
anywhere.  

_Encryption method used: Fernet with password, random salt value and
strong iteration count (100 000)._  

_Tip: For added security, avoid telling in Shhh what is the use of
the secret you're sharing. Instead, explain this in your email, and 
copy the Shhh link to it with the passphrase._  

## Is there an API?

Yes, you can find the doc [here](https://app.swaggerhub.com/apis-docs/smallwat3r/shhh-api/1.0.0).  

Also, checkout [shhh-cli](https://github.com/smallwat3r/shhh-cli), 
a Go client to interact with the Shhh API from the terminal.  


## What's the stack?

### Core application
* **[Flask](https://flask.palletsprojects.com/en/1.1.x/)**, used as
our Python backend web-framework.  
* **[Postgres](https://www.postgresql.org/)** used to store only: 
the unique links, the encrypted messages, the creation and expiration
dates.  
* **[Bulma](https://bulma.io/)**, the CSS framework.  


### Tools
* **[Adminer](https://www.adminer.org/)**, check database records.  


## What are the dependencies?

You can find the list of the Python dependencies 
[here](https://github.com/smallwat3r/shhh/blob/master/requirements.txt), 
and the list of the frontend dependencies 
[here](https://github.com/smallwat3r/shhh/blob/master/package.json).

## How to launch Shhh locally?

These instructions are for development purpose only. For production 
use you might want to use a more secure configuration.

<details>
<summary><b>Launch it natively</b></summary>

#### Deps  

Make sure you have `make`, `yarn`, and obviously `python@3.8` 
installed on your machine.  

#### Postgres  

You will need a Postgres server running locally in the background. 
Create a database named `shhh`.  

```sql
CREATE DATABASE IF NOT EXISTS shhh;
```

#### Flask  

You will need to set up a few environment variables. We use them to 
configure Flask, as well as the application connection to the 
database.  

Rename the file `/envs/local.dev.template` to `/envs/local.dev` and 
fill in the missing values inside it (these are the values needed to 
connect to your local Postgres database).  

Once done, from the root of the repository, run  

```
make local
```

This command will make sure a virtual environment is created and that
all the needed dependencies are installed, and finally launch a flask
local server  

You can now access the app at http://localhost:5000  

</details>

<details>
<summary><b>Launch it with docker-compose</b></summary>

#### Deps

Make sure you have `make`, `docker` and `docker-compose` installed on
your machine.  

#### Docker

From the root of the repository, run

```sh
make dc-start  # to start the app
made dc-stop   # to stop the app
```

Once the container image has finished building and has started, you 
can access:  

* Shhh at http://localhost:5000
* See the database records using Adminer at http://localhost:8080

Note: using docker-compose the application will be running with 
Gunicorn.  

</details>

## Run the checks

```sh
make tests   # run tests
make lint    # run pylint report
make secure  # run bandit report
make mypy    # run mypy report

make checks  # run all checks
```

## Credits

#### Existing cool apps that gave me the idea to develop my own version using Python and Flask

* [OneTimeSecret](https://github.com/onetimesecret/onetimesecret)
* [PasswordPusher](https://github.com/pglombardo/PasswordPusher)

#### Thanks to

* [@AustinTSchaffer](https://github.com/AustinTSchaffer) for 
contributing to set-up a Docker environment.
* [@kleinfelter](https://github.com/kleinfelter) for finding bugs 
and security issues.

## License

See [LICENSE](https://github.com/smallwat3r/shhh/blob/master/LICENSE)
file.  

## Contact

Please report issues or questions 
[here](https://github.com/smallwat3r/shhh/issues).
