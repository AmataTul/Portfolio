## Stock Market Trading

The project includes 10 stocks that implements short selling. Meaning you can sell before you buy.
<br> 
<br>
To implement this, I added a sell variable to my program and allow it to sell without buying first. I dded the logic to the buy if statement to add to profits when my buy also (profit += sell - buy). This logic will now be in my
buy and my sell if statements. 
<br><br>
This program should save the data in CSV files and should be able to save new data into the files. Meaning, when I go running my program, it should go get the latest data, update the files, and run a new analysis. If my program detects a buy signal or sells signal on the last day in the data, it prints a message like “You should buy this stock today”.


### The code does the following:

* Obtains data from a web JSON API.
* Stores the data in CSV files on your server/development environment (AWS Cloud9 in my case).
* Adds new data to the dataset. This means that tomorrow you can run the program again, and it will get the latest data and run the analysis again.
* Data analysis.
* Stores the results in a results.json file on your server/development environment (AWS Cloud9).


### How to use <br>
* Create a folder called “project” and put all the code in there. 
* Inside the folder “project” create another folder called “data”, and store 
the csv files in there.
* Have a Main_project.py file, which will get the latest data, 
run analysis on the latest data, and store the updated results in the 
results.json file.
* Save the results.json file in the “project” folder.
