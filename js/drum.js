
// play samples with QWERTY keys using keyCode
function playSound(event) {
    const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
    console.log("Audio: ", audio);

    if(!audio) return //stop the function from running all together   
    audio.currentTime=0; //rewind to the start    
    audio.play();
    key.classList.add('playing'); 
}

// animate drum button
function removeTransition(event) {
  if (event.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove('playing');
  }

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound) 

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

  function playMidiSound(event) {
    const audio = document.querySelector(`audio[midi-val="${event.note.number}"]`);
    const midiKey = document.querySelector(`.key[midi-val="${event.note.number}"]`);
    console.log("midiKey:", midiKey)

    if(!audio) return //stop the function from running all together   
    audio.currentTime=0; //rewind to the start    
    audio.play();
    midiKey.classList.add('playing'); 
  }

  function removeTransition(event) {
  if (event.propertyName !== 'transform') return; // skip it if it's not a transform
  this.classList.remove('playing');
  }

  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));

  // Listen for a 'note on' message on all channels
  input.addListener('noteon', "all",
    function (e) {
      console.log("Received 'noteon' message (" + e.note.name + e.note.octave + "). Note number: " + e.note.number + ".");
      playMidiSound(e)
    }
  );

});


