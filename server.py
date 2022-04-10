from flask import request, Flask

app = Flask(__name__)
@app.route('/', methods=['GET', 'POST'])
def root():
    if request.method == 'POST':
        print(request.get_json())
        return("?")
if __name__=="__main__":
	app.run(port = 8000)

