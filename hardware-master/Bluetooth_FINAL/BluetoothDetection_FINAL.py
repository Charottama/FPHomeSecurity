##Run in python 2.7

from bt_proximity import BluetoothRSSI
import requests
import bluetooth
import time
import json

WebName1 = 'http://178.128.214.101:7000/home-security/user/sign-in'
Username = 'string'
Password = 'H3h3h3?!'
LogIn = requests.post(WebName1, json = {'email': Username, 'password': Password}, headers = {'Content-Type': 'application/json'})
print(LogIn)
LogIn1 = LogIn.json()
ID = LogIn1['data']['id']
token = LogIn1['data']['token']
print(LogIn1['data']['token'])
print(LogIn1['data']['id'])
WebName = "http://178.128.214.101:7000/home-security/user"
get = requests.get(WebName, headers = {'accessToken': token})
loader = get.json()
JLen = len(loader['data'])
print(JLen)
MACAddressList = []

for i in range(JLen):
        MACAddressList.append(loader['data'][i]['macAddress'])
        print(MACAddressList[i])

bNear = False


BT_ADDR = MACAddressList  # You can put your Bluetooth address here 


url = 'http://192.168.0.12:3000/bt' #config url before use
result = 0
JLen = 3
MACAddressList = ['B8:53:AC:6A:1B:D4', 'EC:51:BC:66:71:B4', '20:5E:F7:A7:B4:95']

def detect():
        global bNear, result
        print(result, " ", bNear)
        
        # KALO DEKET
        if (result > 0) and (bNear == False):   

                toApp = 1
                
                bNear = True
                #print ("Your phone is on the perimeter")

                print(toApp)
                # Trs post ke App
                post_request = requests.post(url, json = {'status': toApp}, headers = {'Content-Type': 'application/json'})
                
        # KALO JAUH                
        elif (bNear == True) and (result < 0):
                
                toApp = 0
                
                bNear = False
                #print ("Your phone is not on the perimeter")
                #print ("Door is Closing")

                print(toApp)
                # Trs post ke App
                post_request = requests.post(url, json = {'status': toApp}, headers = {'Content-Type': 'application/json'})

while True:
        global MACAddressList
        global JLen
        global result
        mac_found = ''
        btrssi = None
        
        # plan: find all devices in range in 5 seconds interval,
        # then compare to our madaddresslist, then rssi when an address is common
        # devices_found = bluetooth.discover_devices(duration=5, flush_cache=True, lookup_names=False)
        # print(devices_found)
        
        for i in range(JLen):
                
                yesno = bluetooth.lookup_name(MACAddressList[i], timeout = 3)
                print('lookup device', yesno, ' ', MACAddressList[i])
                
                if yesno != None:
                        
                        mac_found = MACAddressList[i]
                        
                        
                        while result > -1:
                                
                                btrssi = BluetoothRSSI(addr=mac_found)                        
                                result = btrssi.get_rssi()
                                print('result: ' + str(result))
                                detect()
                                time.sleep(1)

                        result = 0
                        
                time.sleep(1)
                        
        time.sleep(2)
