import sys
from textblob import TextBlob  #type:ignore

# Get text input from command line
text = sys.argv[1]

# Analyze sentiment
analysis = TextBlob(text)   #type:ignore
polarity = analysis.sentiment.polarity  #type:ignore

# Convert polarity to label
if polarity > 0:
    sentiment = "Positive"
elif polarity < 0:
    sentiment = "Negative"
else:
    sentiment = "Neutral"

# Print result (IMPORTANT for Node to read)
print(sentiment)