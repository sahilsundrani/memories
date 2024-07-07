import sys
import base64
textFile = ''
def base64ToImage(textFile):
    file = open('encode.bin', 'rb')
    byte = file.read()
    file.close()
  
    decodeit = open('hello_level.jpeg', 'wb')
    decodeit.write(base64.b64decode((byte)))
    decodeit.close()
    return
    
base64ToImage(textFile)