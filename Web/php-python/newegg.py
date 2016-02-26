#! python3
# searchNewEgg

import requests, sys, webbrowser, bs4

print('Searching...') # display text while downloading the page

#this is useful when ran in a command line, must supply the search term (goes to sys.argv[1:])
#res = requests.get('http://google.com/search?q=' + ' '.join(sys.argv[1:]))

''' GOOD FOR TESTING
searchString = "mouse"
requestString = 'http://www.newegg.ca/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=' + str(searchString) + '&N=-1&isNodeId=1'
'''

#but since we need to accept an arg from PHP, we need sys.argv
requestString = 'http://www.newegg.ca/Product/ProductList.aspx?Submit=ENE&DEPA=0&Order=BESTMATCH&Description=' + ' '.join(sys.argv[1:]) + '&N=-1&isNodeId=1'

res = requests.get(requestString)

res.raise_for_status()

# TODO: Retrieve top search result links.
soup = bs4.BeautifulSoup(res.text, "html.parser")

##
itemRootString = '#cellItem'

'''
sample HTML from newegg results

<div id="cellItem1" class="itemCell itemCell-ProductList itemCell-ProductGridList">
<div id="cellItem2" class="itemCell itemCell-ProductList itemCell-ProductGridList">
...

that means we know that the div ID is cellItem + num

'''
elemNum = soup.select('div.itemCell')			# all results with itemCell ID

#1st 10 results in new tabs, min to know 10 vs number of links opened
#(in case fewer than 10 results are gathered)
numOpen = min(30, len(elemNum))

#list of Products
productList = []


'''
under each item

<div id="cellItem1" class="itemCell itemCell-ProductList itemCell-ProductGridList">
<div class="itemGraphics ">
<div class="itemText">
<div class="itemAction">

the URL and NAME is in itemText
price is in itemAction

just follow the HTML hierarchy

'''


for i in range(numOpen) :
	elemLink = soup.select(itemRootString + str(i+1) + ' div.itemText div.wrapper a')
	elemPrice = soup.select(itemRootString + str(i+1) + ' div.itemAction input')
	elemPic = soup.select(itemRootString + str(i+1) + ' div.itemGraphics a.itemImage img')

	#print (itemRootString + str(i+1) + ' div.itemText div.wrapper a')
	#print ('URL:' + elemLink[0].get('href'))
	#print ('NAME:' + elemLink[0].contents[1].getText())

	#print(itemRootString + str(i+1) + ' div.itemAction ul.price price-product-cells has-label-from has-label-membership price-product-cells  input')
	#print ('PRICE:' + elemPrice[0].get('value'))

	tempDict = {'URL': '', 'Name': '', 'Price': '', 'Photo':''}
	tempDict['URL'] = elemLink[0].get('href')
	tempDict['Name'] = elemLink[0].contents[1].getText()

	price = elemPrice[0].get('value')
	price = price.replace("$", "")
	tempDict['Price'] = price

	tempDict['Photo'] = elemPic[0].get('src')

	productList.append(tempDict)


print(productList)

#if u appears in dictionary values, that means it is represented as unicode

'''
{'URL': u'http://www.ncix.com/detail/asus-pg279q-rog-swift-27in-2b-119675-1288.htm', 'Price': u'$1,149.99
', 'Name': u'ASUS PG279Q ROG Swift 27in G-SYNC 2560X1440 WQHD 1440P 165HZ 4ms HDMI DisplayPort USB3 LCD Mo
nitor'}
'''

#print (linkElems[i].get('href'))	# product URL
#print (linkElems[i].getText())		# product Name

#for linkPrices, we skip 2 counts for the headers
#print (linkPrices[i+3].getText())	#product price



