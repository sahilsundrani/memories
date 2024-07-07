import sys
import base64

# __all__ = ['convertToBase64', 'base64ToImage']
url = sys.argv[1]
def convertToBase64(url):
	with open(url, "rb") as image2string:
		converted_string = base64.b64encode(image2string.read())
		# print(converted_string)

	with open('encode.bin', "wb") as file:
		file.write(converted_string)
		# print(converted_string)
		# sys.stdout.flush()
		file = open('encode.bin', 'rb')
		byte = file.read()
		print(file)
		sys.stdout.flush()
    	# file.close()
  
    	# decodeit = open('hello_level.jpeg', 'wb')
    	# decodeit.write(base64.b64decode((byte)))
    	# decodeit.close()
	return;

convertToBase64(url)

# def base64ToImage(textFile):
# 	file = open(textFile, 'rb')
# 	byte = file.read()
# 	file.close()

# 	decodeit = open('hello_level-1.jpeg', 'wb')
# 	decodeit.write(base64.b64decode((byte)))
# 	decodeit.close()
# 	return
