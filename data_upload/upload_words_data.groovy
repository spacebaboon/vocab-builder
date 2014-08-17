#!/usr/bin/env groovy

if (args.length < 2) {
	println "usage: upload_words_data.groovy <input file> <output file>"
	return
}

def fileIn = new File(args[0])
def fileOut = new File(args[1])


fileIn.eachLine {
	def germanAndEnglish = it.split("\t+")
	fileOut << "{ \"german\": \"${germanAndEnglish[0]}\", \"english\": \"${germanAndEnglish[1]}\" }\n"
}