def  meanReversionStrategy(prices, ticker):
  i = 0
  buying_price = 0
  total_profit = 0
  profit = 0
  first_buy = 1
  average_five_days = 0
  buying = True
  current_price = 0
  very_first_buy = True
  counter = 0
  # loop through prices
  for line in prices:
    counter +=1
    price = float(line)
    price = round(price,2)
    # print(price)
    # get current_price
    if (i < len(prices)-1):
      current_price = float(prices[i+1])
    i += 1
    # calculate the average
    if i >= 5:
      average_five_days = (float(prices[i-1]) + float(prices[i-2]) + float(prices[i-3])+ float(prices[i-4]) + float(prices[i-5])) / 5
    # if the program detects a buy signal or sell signal on the last day in the data
    # check if we can buy
    if current_price > average_five_days * 1.05  and buying == True:
      buying_price = current_price
      if counter == len(prices):
        print('You should buy this stock today: ' + ticker)
      # calculate the first buy
      if very_first_buy == True:
        first_buy = buying_price
        very_first_buy  = False
      buying = False
      # print("buying_price", buying_price)
      
  # check if we can sell 
    elif current_price < average_five_days * 0.95 and buying == False:
      selling_price = current_price
      if counter == len(prices):
        print('You should sell this stock today: ' + ticker)
      # calculate profit
      profit = (selling_price - buying_price)
      total_profit += profit
      buying = True
      # print("selling_price", selling_price)

    else:
      pass
  # calculate the final percentage
  final_profit_percentage = (total_profit / first_buy)*100 
  # format the final percentage
  final_profit_percentage = str(round(final_profit_percentage,2)) + '%'
  #The function returns the profit and final percentage
  return round(total_profit, 2), (final_profit_percentage)

# The function runs a Simple Moving Average strategy, 
# and outputs to the console the buys and sells of the strategy
def simpleMovingAverageStrategy (prices, ticker):
  i = 0
  buying = True # switch between buy or sell
  average_five_days = 0
  profit = 0
  first_buy = True #to check if it's a first buy
  f_buy = 1
  counter = 0
  for line in prices:
    counter += 1
    price = float(line)
    price = round(price,2)
    i+=1
    # calculate the average
    if i>=5:
      average_five_days = (float(prices[i-1]) + float(prices[i-2]) + float(prices[i-3])+ float(prices[i-4]) + float(prices[i-5])) / 5
    #if the program detects a buy signal or sell signal on the last day in the data
    # check if we can buy
    if price > average_five_days * 1.05  and buying == True:
      buying_price = price
      
      #calculate the first buy
      if first_buy == True:
        f_buy = buying_price
        first_buy == False
      if counter == len(prices):
        print('You should buy this stock today: ' + ticker)
      buying = False
# check if we can sell 
    elif price < average_five_days * 0.95 and buying == False:
      selling = price
      if counter == len(prices):
        print('You should sell this stock today: ' + ticker)
      trade_profit = selling - buying_price
      profit+= trade_profit
      buying = True
    else:
      pass
    # calculate the final percentage
  final_returns_percentage = (profit/ f_buy)*100
  final_returns_percentage = str(round(final_returns_percentage,2)) + '%'
  # The function returns the profit and final percentage
  return round(profit,2), (final_returns_percentage)

# defines function bollingerBands
def bollingerBands(prices, ticker):
  i = 0
  buying = True
  average_five_days = 0
  profit = 0
  first_buy_sell = True
  f_buy = 1
  counter = 0
  buying_price = 0
  for line in prices:
    counter += 1
    price = float(line)
    price = round(price,2)
    i+=1
    # calculate the average
    if i>=5:
      average_five_days = (float(prices[i-1]) + float(prices[i-2]) + float(prices[i-3])+ float(prices[i-4]) + float(prices[i-5])) / 5
    # check if we can buy
    #if the program detects a buy signal or sell signal on the last day in the data
    if price > average_five_days * 1.05 and buying == True:
      buying_price = price
      if first_buy_sell == True:
        f_buy = buying_price
        first_buy_sell == False
      if counter == len(prices):
        print('You should buy this stock today: ' + ticker)
      buying = False
# check if we can sell
    elif price < average_five_days * 0.95:
      selling = price
      if first_buy_sell == True:
        f_buy = selling
        first_buy_sell == False
      if counter == len(prices):
        print('You should sell this stock today: ' + ticker)
      trade_profit = selling - buying_price
      profit+= trade_profit
      buying = True
    else:
      pass
    # calculate the final percentage
  final_returns_percentage = (profit/ f_buy)*100
  final_returns_percentage = str(round(final_returns_percentage,2)) + '%'
  # The function returns the profit and final percentage
  return round(profit,2), (final_returns_percentage)
