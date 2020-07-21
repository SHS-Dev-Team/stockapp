store jupyter notebooks that you think could be useful here
#daily_returns
import os
import pandas as pd
import matplotlib.pyplot as plt
dates = 'Date'
HOUSING_PATH = os.path.join("Downloads")
def load_housing_data(housing_path=HOUSING_PATH):
    csv_path = os.path.join(housing_path, "GLD.csv")
    df = pd.read_csv(csv_path, usecols=['Adj Close'])
    daily_returns = df.copy()
    daily_returns[1:] = (df[1:] / df[:-1].values) - 1
    daily_returns.iloc[0, :] = 0
    return daily_returns
    #return df
    
#avg_daily_ret
import os
import pandas as pd
import matplotlib.pyplot as plt
dates = 'Date'
HOUSING_PATH = os.path.join("Downloads")
def load_housing_data(housing_path=HOUSING_PATH):
    csv_path = os.path.join(housing_path, "GLD.csv")
    df = pd.read_csv(csv_path, usecols=['Adj Close'])
    daily_returns = df.copy()
    daily_returns[1:] = (df[1:] / df[:-1].values) - 1
    daily_returns.iloc[0, :] = 0
    avg_daily_ret = daily_returns.mean()
    return avg_daily_ret
  
#std_daily_ret
import os
import pandas as pd
import matplotlib.pyplot as plt
dates = 'Date'
HOUSING_PATH = os.path.join("Downloads")
def load_housing_data(housing_path=HOUSING_PATH):
    csv_path = os.path.join(housing_path, "GLD.csv")
    df = pd.read_csv(csv_path, usecols=['Adj Close'])
    daily_returns = df.copy()
    daily_returns[1:] = (df[1:] / df[:-1].values) - 1
    daily_returns.iloc[0, :] = 0
    std_daily_ret = daily_returns.std()
    return std_daily_ret
    
#sharpe_ratio
import os
import pandas as pd
import matplotlib.pyplot as plt
import math
daily_rf = 0
dates = 'Date'
HOUSING_PATH = os.path.join("Downloads")
def load_housing_data(housing_path=HOUSING_PATH):
    csv_path = os.path.join(housing_path, "AAPL.csv")
    df = pd.read_csv(csv_path, usecols=['Adj Close'])
    daily_returns = df.copy()
    daily_returns[1:] = (df[1:] / df[:-1].values) - 1
    daily_returns.iloc[0, :] = 0
    std_daily_ret = daily_returns.std()
    sharpe_ratio = ((daily_returns - daily_rf).mean()) / ((daily_returns - daily_rf).std())
    k = math.sqrt(252)
    #weekly k = math.sqrt(52)
    #monthly k = math.sqrt(12)
    sr_annual = k * sharpe_ratio
    return sr_annual
 
 

