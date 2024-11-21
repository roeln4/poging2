const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'default_service';
   const templateID = 'template_ldbu47e';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Verstuur email';
      alert('Bericht verzonden! We nemen zo snel mogelijk contact op!');
      document.getElementById('form').reset();
    }, (err) => {
      btn.value = 'Verstuur email';
      alert(JSON.stringify(err));
    });
});



const textElement = document.getElementById('dynamic-text');
const phrases = [
    "Ministerie van Muziek",
    "Ministerie van Geluid",
    "Ministerie van Licht"
];
let currentPhraseIndex = 0;
let currentLetterIndex = 0;
let isDeleting = false;
let typingSpeed = 150;
let pauseBetween = 1000; // Pauze na het typen van een volledige zin

function type() {
    let currentPhrase;

    // Bepaal welke zin we willen typen of terug gaan
    if (currentPhraseIndex < phrases.length) {
        currentPhrase = phrases[currentPhraseIndex];
    } else {
        currentPhrase = "Ministerie van Muziek"; // Laatste zin
    }

    if (isDeleting) {
        // Verwijder karakters
        currentLetterIndex--;
        textElement.textContent = currentPhrase.substring(0, currentLetterIndex);
    } else {
        // Voeg karakters toe
        currentLetterIndex++;
        textElement.textContent = currentPhrase.substring(0, currentLetterIndex);
    }

    // Wissel tussen typen en verwijderen
    if (!isDeleting && currentLetterIndex === currentPhrase.length) {
        // Pauze na het volledig typen van de zin
        setTimeout(() => {
            isDeleting = true; // Begin met verwijderen
        }, pauseBetween);
    } else if (isDeleting && currentLetterIndex === 11) { // Terug naar "Ministerie"
        isDeleting = false; // Start met typen van de volgende phrase
        currentPhraseIndex++; // Volgende phrase index
        currentLetterIndex = 10; // Reset de letter index voor de volgende zin
    }

    // Stoppen na de laatste zin
    if (currentPhraseIndex === phrases.length && currentLetterIndex === "Ministerie van Muziek".length) {
        return; // Stop de animatie
    }

    setTimeout(type, isDeleting ? typingSpeed / 2 : typingSpeed); // Versnelt het verwijderen
}

// Start de typewriter effect na DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    type(); // Start het type-effect zodra de pagina geladen is
});
