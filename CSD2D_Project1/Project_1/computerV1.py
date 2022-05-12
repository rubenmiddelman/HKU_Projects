## this is a script that makes the looper work on your pc on linux
## there is no stop button programmed so you will have to stop with ctrl + shift + c
import sounddevice as sd
from scipy.io.wavfile import write
import soundfile as sf
import simpleaudio as sa
import time
import random

fs = 44100  # Sample rate
seconds = 3  # Duration of recording

myrecording = sd.rec(int(seconds * fs), samplerate=fs, channels=2)
sd.wait()  # Wait until recording is finished
write('output.wav', fs, myrecording)  # Save as WAV file


global bpm
filename = 'output.wav'
# Extract data and sampling rate from file
data, fs = sf.read(filename, dtype='float32')
bpm = int(input("whats the bpm -->"))
numberOfNotes = int(input("how many notes do you want to hear in your sequence"))
quarterNoteDuration = 60 / bpm
sixteenthNoteDuration = quarterNoteDuration / 4
timestamps = []
timestamp16th = []
listOfNoteLengths = [0.25, 0.5, 1.0]
counter = 0
timestampslist = []
copyOfTimestampslist = timestampslist
timestampslist.append(0)

##makes a list with the note lengths
for notes in range(0, numberOfNotes):
    noteLenght = random.choice(listOfNoteLengths)
    listOfNoteLengths.append(noteLenght)


##function that changes list of note lengths to time stamps
def DurationToTimestamp():
    global counter
    length1 = listOfNoteLengths.pop(0)
    if listOfNoteLengths:
        if length1 == 0.25:
            counter = counter + 1
            timestampslist.append(counter)
            DurationToTimestamp()
        if length1 == 0.5:
            counter = counter + 2
            timestampslist.append(counter)
            DurationToTimestamp()
        if length1 == 1:
            counter = counter + 4
            timestampslist.append(counter)
            DurationToTimestamp()

#function that plays the sample at the correct time according to the timestamp list
def PlayLoopOnce():
      for timestamp in timestampslist:
          timestamps.append(timestamp * sixteenthNoteDuration)
      timestamp = timestamps.pop(0)
      startTime = time.time()
      while True:
          currentTime = time.time()
          if(currentTime - startTime >= timestamp):
              sd.play(data, fs)
              if timestamps:
                  timestamp = timestamps.pop(0)
              else:
                  break
          else:
            time.sleep(0.001)
      time.sleep(1.0)
      PlayLoopOnce()


DurationToTimestamp()
PlayLoopOnce()
