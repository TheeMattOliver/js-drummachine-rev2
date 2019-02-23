
// original script
function playSound(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"`);
    console.log("Audio: ", audio);

    if(!audio) return //stop the function from running all together   
    audio.currentTime=0; //rewind to the start    
    audio.play();
    key.classList.add('playing'); 
}

function removeTransition(event) {
  if (event.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove('playing');
  }

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound) 

// add MIDI values
var midiNumber = {
   95:'B7',
   94:'A#7',
   93:'A7',
   92:'G#7',
   91:'G7',
   90:'F#7',
   89:'F7',
   88:'E7',
   87:'D#7',
   86:'D7',
   85:'C#7',
   84:'C7',
   83:'B6',
   82:'A#6',
   81:'A6',
   80:'G#6',
   79:'G6',
   78:'F#6',
   77:'F6',
   76:'E6',
   75:'D#6',
   74:'D6',
   73:'C#6',
   72:'C6',
   71:'B5',
   70:'A#5',
   69:'A5',
   68:'G#5',
   67:'G5',
   66:'F#5',
   65:'F5',
   64:'E5',
   63:'D#5',
   62:'D5',
   61:'C#5',
   60:'C5',
   59:'B4',
   58:'A#4',
   57:'A4',
   56:'G#4',
   55:'G4',
   54:'F#4',
   53:'F4',
   52:'E4',
   51:'D#4',
   50:'D4',
   49:'C#4',
   48:'C4',
   47:'B3',
   46:'A#3',
   45:'A3',
   44:'G#3',
   43:'G3',
   42:'F#3',
   41:'F3',
   40:'E3',
   39:'D#3',
   38:'D3',
   37:'C#3',
   36:'C3',
   35:'B2',
   34:'A#2',
   33:'A2',
   32:'G#2',
   31:'G2',
   30:'F#2',
   29:'F2',
   28:'E2',
   27:'D#2',
   26:'D2',
   25:'C#2',
   24:'C2',
   23:'B1',
   22:'A#1',
   21:'A1',
   20:'G#1',
   19:'G1',
   18:'F#1',
   17:'F1',
   16:'E1',
   15:'D#1',
   14:'D1',
   13:'C#1',
   12:'C1',
   11:'B0',
   10:'A#0',
   9:'A0'
};



// enable WebMIDI
WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  } else {
    console.log("WebMidi enabled!");
  }
  
  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

  // Display the current time
  console.log(WebMidi.time);

  // Retrieve an input by name, id or index
  var input = WebMidi.getInputByName("MPD218 Port A");
  input = WebMidi.getInputById("-703533521");
  input = WebMidi.inputs[0];

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
      playSound(e)
    }
  );


});