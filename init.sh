# install git
sudo apt update
sudo apt install git

### Configure git
# git config --global user.name "Your Name"
# git config --global user.email "youremail@yourdomain.com"

# make directory for app and clone code
PISHOPDIR=/home/pi/PiShopping
mkdir PiShopping
cd $PISHOPDIR
git clone https://github.com/peterelmwood/PiShopping.git $PISHOPDIR

# create and activate virtual environment
python3 -m venv venv
source $PISHOPDIR/venv/bin/activate

# install requirements, including Django
pip install -r requirements.txt

# migrate the database changes
python manage.py migrate
