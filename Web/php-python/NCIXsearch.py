#! python3
# searchNCIX

import requests, sys, webbrowser, bs4

print('Searching...') # display text while downloading the page

#this is useful when ran in a command line, must supply the search term (goes to sys.argv[1:])
#res = requests.get('http://google.com/search?q=' + ' '.join(sys.argv[1:]))


''' GOOD FOR TESTING
searchString = "LCD+Monitors"
res = requests.get('http://search.ncix.com/search/?qcatid=0&q=' + searchString)
'''

#but since we need to accept an arg from PHP, we need sys.argv
res = requests.get('http://search.ncix.com/search/?qcatid=0&q=' + ' '.join(sys.argv[1:]))


res.raise_for_status()

# TODO: Retrieve top search result links.
soup = bs4.BeautifulSoup(res.text, "html.parser")



'''
sample HTML from NCIX results

<tr id="tr1" valign="top" align="left">
	<td class="line">
	<td class="line">
	<div>
	<div style="float:left">
	<div style="float:left;margin-left:25px">
	<span class="listing">
<tr id="tr2" valign="top" align="left">
<tr id="tr3" valign="top" align="left">
<tr id="tr4" valign="top" align="left">
<tr id="tr5" valign="top" align="left">
...

that means we know that the tr ID is cellItem + num

'''

itemRootString = '#tr'

elemNum = soup.select('tr td.line div span.listing')

#1st 10 results in new tabs, min to know 10 vs number of links opened
#(in case fewer than 10 results are gathered)
numOpen = min(10, len(elemNum))


# <a> element, soap class="listing" , result links
####linkElems = soup.select('.listing a')

#modified the selection process... since NCIX includes bundles and they also have the strong tag
linkPrices = soup.select('td.line .listing > strong')


#list of Products
productList = []

for i in range(numOpen) :

	elemLink = soup.select(itemRootString + str(i+1) + ' td.line div div span.listing a')
	#elemPrice = soup.select(itemRootString + str(i+1) + ' td.line font.listing strong')
	elemPic = soup.select(itemRootString + str(i+1) + ' td.line div a img.img')

	#print ('URL:' + elemLink[0].get('href'))
	#print ('NAME:' + elemLink[0].getText())
	###print(itemRootString + str(i+1) + ' td.line .listing strong')
	#print ('PRICE:' +  linkPrices[i+2].getText())

	tempDict = {'URL': '', 'Name': '', 'Price': '', 'Photo': ''}
	tempDict['URL'] = elemLink[0].get('href')
	tempDict['Name'] = elemLink[0].getText()
	#tempDict['Price'] =  elemPrice[0].getText()

	price = linkPrices[i].getText()
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



