        var startTime;
        var currentPartIndex = 0;
        var partIds = ['part-i', 'part-ii', 'part-iii', 'part-iv', 'part-v', 'part-finished'];
        var stopwatchInterval;

        function showStep(stepNumber) {
            document.getElementById('home-screen').style.display = 'none';
            document.getElementById('step-screen').style.display = 'block';

            // Reset highlighting when switching steps
            resetHighlighting();

            // You can customize the content for each step here
            document.getElementById('step-title').innerText = `Step ${stepNumber}`;
            if (stepNumber === 1) {
                resetElapsedTime();
                getDataFromGoogleSheets(); // Fetch data from Google Sheets
            }
        }

        function showHome() {
            document.getElementById('home-screen').style.display = 'block';
            document.getElementById('step-screen').style.display = 'none';
            resetElapsedTime();
            stopStopwatch();
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === '1') {
                highlightNextPart();
                e.preventDefault(); // Prevent the default behavior of the Enter key
            }
        });

        function highlightNextPart() {
            if (currentPartIndex < partIds.length) {
                var partId = partIds[currentPartIndex];
                highlightSpecificPart(partId);
                currentPartIndex++;

                // If "Finished" is reached, stop the stopwatch and reset highlighting
                if (currentPartIndex === 6) {
                    stopStopwatch();
                    resetHighlighting();
                }

                // If Part i is reached, start the stopwatch
                if (currentPartIndex === 1) {
                    startElapsedTime();
                }
            }
        }

        function resetHighlighting() {
            // Remove highlighting from all parts
            var parts = document.querySelectorAll('#step-screen p');
            parts.forEach(part => part.classList.remove('highlight'));
            currentPartIndex = 0; // Reset the current part index

            // Hide "Finished"
            document.getElementById('part-finished').style.visibility = 'hidden';
            // Remove red color and stop flashing
            document.getElementById('elapsed-time').classList.remove('red');
        }

        function highlightSpecificPart(partId) {
            var partElement = document.getElementById(partId);
            partElement.classList.add('highlight');
            if (partId === 'part-finished') {
                partElement.style.visibility = 'visible';
            }
        }

        function toggleHighlight(partId) {
            resetHighlighting(); // Reset highlighting when a part is clicked
            var partElement = document.getElementById(partId);
            partElement.classList.add('highlight');
        }

        function startElapsedTime() {
            startTime = new Date();
            stopwatchInterval = setInterval(updateElapsedTime, 10); // Update every 10 milliseconds
        }

        function updateElapsedTime() {
            var currentTime = new Date();
            var elapsedTime = currentTime - startTime;
            var minutes = Math.floor(elapsedTime / (60 * 1000));
            var seconds = Math.floor((elapsedTime % (60 * 1000)) / 1000);
            var milliseconds = Math.floor((elapsedTime % 1000) / 100); // Rounded to the nearest tenth
            document.getElementById('elapsed-time').innerText = `${minutes}m ${seconds}s ${milliseconds}s`;

            // Change color to red after 4 minutes
            if (minutes >= 4) {
                document.getElementById('elapsed-time').classList.add('red');
            }
        }

        function resetElapsedTime() {
            document.getElementById('elapsed-time').innerText = '';
            // Remove red color and stop flashing
            document.getElementById('elapsed-time').classList.remove('red');
        }

        function stopStopwatch() {
            clearInterval(stopwatchInterval);
        }

        // function getDataFromGoogleSheets() {
        //     // Load the Google Sheets API
        //     gapi.load('client', initClient);

        //     function initClient() {
        //         gapi.client.init({
        //             apiKey: 'YOUR_API_KEY',
        //             clientId: 'YOUR_CLIENT_ID',
        //             discoveryDocs: [""],
        //         }).then(function () {
        //             // Fetch data from Google Sheets
        //             gapi.client.sheets.spreadsheets.values.get({
        //                 spreadsheetId: 'YOUR_SPREADSHEET_ID',
        //                 range: 'Sheet1!A2:A2', // Change the range accordingly
        //             }).then(function (response) {
        //                 var orderID = response.result.values[0][0];
        //                 document.getElementById('order-id').innerText = 'Order ID: ' + orderID;
        //             }, function (reason) {
        //                 console.error('Error: ' + reason.result.error.message);
        //             });
        //         });
        //     }
        // }
        //gay