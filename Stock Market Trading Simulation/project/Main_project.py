import time
import requests
import json
import strategies
# create a list to store 10 stock tickers
tickers = ['TSCO.LON', 'IBM', '600104.SHH', 'SHOP.TRT', 'APLE', 'ADAC', 'S0V.FRK', 'EL.TRV', 'KLAC','ABEA.DEX']

for ticker in tickers:
  #print(ticker)
  
  # https://www.alphavantage keys
  key1 = 'XW1O3HXTFRNWBC51';
  
  url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + ticker + '&outputsize=full&apikey=' + key1;

  req = requests.get(url)
  time.sleep(12)

  req_dct = json.loads(req.text)
  # print(req_dct)
  
  # gets daily prices(closing) from json
  lines = []
  for date in req_dct['Time Series (Daily)']:
    closing_price = req_dct['Time Series (Daily)'][date]["4. close"]
    lines.append (closing_price + '\n')
  # save prices to ticker.csv files  
  csv_file = open('./project/data/'+ticker + '.csv', 'w')
  csv_file.writelines(lines)
  csv_file.close()

# saves result to json
def saveResults (results):
  f = open("./project/results.json", "w")
  f.write(str(results) + '\n')
  f.write('\n')
  f.close()

# function runs strategies
def read_files(tickers):
  dict_results = {}
  for ticker in tickers:
    file = open('./project/data/'+ ticker + ".csv", "r")
    lines = file.readlines()
    prices = [float(line) for line in lines if line != "null\n"]

    dict_results[ticker + "_prices"] = prices

    # meanReversionStrategy
    total_profit_mean, final_percentage_mean = strategies.meanReversionStrategy(lines, ticker)

    dict_results[ticker + "_mr_profit"] = total_profit_mean
    dict_results[ticker + "_mr_returns"] = final_percentage_mean

    # simpleMovingAverageStrategy
    profit_simple_moving, final_percentage_simple_moving = strategies.simpleMovingAverageStrategy (lines, ticker)
    dict_results[ticker + "_sma_profit"] = profit_simple_moving
    dict_results[ticker + "_sma_returns"] = final_percentage_simple_moving

    # bollingerBands
    profit_bollinger, final_percentage_bollinger = strategies.bollingerBands (lines,ticker)
    dict_results[ticker + "_bb_profit"] = profit_bollinger
    dict_results[ticker + "_bb_returns"] = final_percentage_bollinger
# identifies which stock and strategy made the most profit
    maximum = max(profit_simple_moving, total_profit_mean, profit_bollinger)

    if maximum == total_profit_mean:
      max_profit_strategy = 'mr'
    elif maximum == profit_simple_moving:
      max_profit_strategy = 'sma'
    else: 
      max_profit_strategy = 'bb'
    dict_results['most_profitable_' + ticker] = max_profit_strategy
    
  saveResults(dict_results)
# starting point
read_files(tickers)
