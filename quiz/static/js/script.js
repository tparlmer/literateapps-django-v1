document.addEventListener('DOMContentLoaded', () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let currentLetterIndex = 0;
    let score = 0;

    const letterDisplay = document.querySelector('.letter-display');
    const currentQuestion = document.querySelector('.current-question');
    const recordBtn = document.querySelector('.record-btn');
    const recordingStatus = document.querySelector('.recording-status');
    const submitAnswerBtn = document.querySelector('.submit-answer');
    const nextQuestionBtn = document.querySelector('.next-question');
    const currentScore = document.querySelector('.current-score');

    let mediaRecorder;
    let recordedAudio;

    function updateLetterDisplay() {
        letterDisplay.textContent = alphabet[currentLetterIndex];
    }

    function moveToNextLetter() {
        currentLetterIndex++;
        if (currentLetterIndex < alphabet.length) {
            updateLetterDisplay();
            currentQuestion.textContent = currentLetterIndex + 1;
            nextQuestionBtn.style.display = 'none';
            submitAnswerBtn.disabled = true;
        } else {
            // Quiz finished, handle the end of the quiz
        }
    }

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();

            mediaRecorder.addEventListener('dataavailable', (event) => {
                recordedAudio = event.data;
            });

            mediaRecorder.addEventListener('stop', () => {
                // Do something with the recorded audio, like submitting the answer
            });
        } catch (error) {
            console.error('Error accessing the user\'s microphone:', error);
        }
    }

    function stopRecording() {
        if (mediaRecorder) {
            mediaRecorder.stop();
        }
    }

    // Initialize the letter display
    updateLetterDisplay();

    // Event listener to handle starting and stopping audio recording
    recordBtn.addEventListener('click', () => {
        if (recordBtn.textContent === 'Record') {
            startRecording();
            recordBtn.textContent = 'Stop';
            recordingStatus.style.display = 'block';
            submitAnswerBtn.disabled = true;
        } else {
            stopRecording();
            recordBtn.textContent = 'Record';
            recordingStatus.style.display = 'none';
            submitAnswerBtn.disabled = false;
        }
    });

    // Event listener to handle submitting the recorded audio
    submitAnswerBtn.addEventListener('click', async () => {
        // Send the recorded audio to the backend
        const formData = new FormData();
        formData.append('audio', recordedAudio);

        try {
            const response = await fetch('/quiz/submit-answer/', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            // Process the response from the backend
            console.log(data);

            // Update the score if the recognized text matches the current letter
            // score++;
            // currentScore.textContent = score;

            // Show the "Next" button after submitting the answer
            nextQuestionBtn.style.display = 'block';
            submitAnswerBtn.disabled = true;
        } catch (error) {
            console.error('Error submitting the recorded audio:', error);
        }
    });

    // Event listener to move to the next letter
    nextQuestionBtn.addEventListener('click', moveToNextLetter);
});