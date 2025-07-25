// Veo 3 Prompt Builder JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('promptForm');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const results = document.getElementById('results');
    const jsonOutput = document.getElementById('jsonOutput');
    const llmPrompt = document.getElementById('llmPrompt');
    const naturalPrompt = document.getElementById('naturalPrompt');
    const copyJsonBtn = document.getElementById('copyJsonBtn');
    const copyPromptBtn = document.getElementById('copyPromptBtn');

    // Generowanie JSON i promptów
    generateBtn.addEventListener('click', function() {
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = collectFormData();
        const videoSchema = generateVideoSchema(formData);
        const naturalPromptText = generateNaturalPrompt(formData);
        const llmPromptText = generateLLMPrompt(videoSchema);

        // Wyświetlenie wyników
        jsonOutput.textContent = JSON.stringify(videoSchema, null, 2);
        llmPrompt.textContent = llmPromptText;
        naturalPrompt.textContent = naturalPromptText;
        
        results.style.display = 'block';
        results.scrollIntoView({ behavior: 'smooth' });
    });

    // Czyszczenie formularza
    clearBtn.addEventListener('click', function() {
        form.reset();
        results.style.display = 'none';
    });

    // Kopiowanie JSON
    copyJsonBtn.addEventListener('click', function() {
        const jsonText = jsonOutput.textContent;
        copyToClipboard(jsonText);
        showCopyFeedback(copyJsonBtn);
    });

    // Kopiowanie promptu dla LLM
    copyPromptBtn.addEventListener('click', function() {
        const promptText = llmPrompt.textContent;
        copyToClipboard(promptText);
        showCopyFeedback(copyPromptBtn);
    });

    function collectFormData() {
        return {
            // Podstawowe
            idea: document.getElementById('idea').value,
            duration: parseInt(document.getElementById('duration').value),
            aspect_ratio: document.getElementById('aspect_ratio').value,
            
            // Postać
            character_name: document.getElementById('character_name').value,
            character_age: parseInt(document.getElementById('character_age').value),
            character_height: document.getElementById('character_height').value,
            character_description: document.getElementById('character_description').value,
            character_outfit: document.getElementById('character_outfit').value,
            character_demeanour: document.getElementById('character_demeanour').value,
            
            // Scena
            location: document.getElementById('location').value,
            time_of_day: document.getElementById('time_of_day').value,
            environment: document.getElementById('environment').value,
            
            // Akcja
            action: document.getElementById('action').value,
            props: document.getElementById('props').value,
            
            // Kamera
            composition: document.getElementById('composition').value,
            camera_motion: document.getElementById('camera_motion').value,
            camera_equipment: document.getElementById('camera_equipment').value,
            
            // Oświetlenie
            lighting: document.getElementById('lighting').value,
            tone: document.getElementById('tone').value,
            color_grade: document.getElementById('color_grade').value,
            
            // Dialog
            dialogue: document.getElementById('dialogue').value,
            audio_style: document.getElementById('audio_style').value,
            voice_emotion: document.getElementById('voice_emotion').value
        };
    }

    function generateVideoSchema(data) {
        return {
            characters: [{
                name: data.character_name,
                age: data.character_age,
                height: data.character_height,
                build: "standardowa budowa", // można rozszerzyć
                skin_tone: "naturalny", // można rozszerzyć
                hair: "standardowe", // można rozszerzyć
                eyes: "standardowe", // można rozszerzyć
                distinguishing_marks: null,
                demeanour: data.character_demeanour,
                default_outfit: data.character_outfit,
                mouth_shape_intensity: 0.8,
                eye_contact_ratio: 0.7
            }],
            clips: [{
                id: "main_clip",
                shot: {
                    composition: data.composition,
                    camera_motion: data.camera_motion || null,
                    frame_rate: "24 fps",
                    film_grain: null,
                    camera: data.camera_equipment
                },
                subject: {
                    description: `${data.character_name} — ${data.character_age}-letni/a, ${data.character_height}, ${data.character_description}`,
                    wardrobe: data.character_outfit
                },
                scene: {
                    location: data.location,
                    time_of_day: data.time_of_day,
                    environment: data.environment
                },
                visual_details: {
                    action: data.action,
                    props: data.props || null
                },
                cinematography: {
                    lighting: data.lighting,
                    tone: data.tone,
                    color_grade: data.color_grade
                },
                audio_track: {
                    lyrics: null,
                    emotion: data.voice_emotion,
                    flow: null,
                    style: data.audio_style || null
                },
                dialogue: {
                    character: data.character_name,
                    line: data.dialogue,
                    subtitles: false
                },
                performance: {
                    mouth_shape_intensity: 0.8,
                    eye_contact_ratio: 0.7
                },
                duration_sec: data.duration,
                aspect_ratio: data.aspect_ratio
            }]
        };
    }

    function generateNaturalPrompt(data) {
        const parts = [];
        
        // Postać i akcja
        parts.push(`${data.character_description} ${data.action}`);
        
        // Lokalizacja i czas
        let sceneDesc = `w lokalizacji: ${data.location}`;
        if (data.time_of_day !== 'mid-day') {
            sceneDesc += `, ${data.time_of_day}`;
        }
        sceneDesc += `. ${data.environment}`;
        parts.push(sceneDesc);
        
        // Kamera i styl
        let cameraDesc = data.composition;
        if (data.camera_motion) {
            cameraDesc += `, ${data.camera_motion}`;
        }
        cameraDesc += `. ${data.lighting}, ${data.tone}`;
        parts.push(cameraDesc);
        
        // Dialog
        let dialogDesc = `${data.character_name} mówi: "${data.dialogue}"`;
        if (data.audio_style) {
            dialogDesc += `, ${data.audio_style}`;
        }
        parts.push(dialogDesc);
        
        // Rekwizyty
        if (data.props) {
            parts.push(`Rekwizyty: ${data.props}`);
        }
        
        return parts.join(' ');
    }

    function generateLLMPrompt(videoSchema) {
        return `Jestem twórcą wideo AI i potrzebuję pomocy w ulepszeniu promptu do Veo 3 (Google Gemini Video). 

Oto moja obecna specyfikacja wideo w formacie JSON:

${JSON.stringify(videoSchema, null, 2)}

Proszę o:

1. **Analizę** - co można poprawić w tym prompcie?
2. **Ulepszenie** - stwórz bardziej szczegółowy i skuteczny prompt naturalny dla Veo 3
3. **Optymalizację** - uwzględnij najlepsze praktyki dla generowania wideo AI:
   - Precyzyjne opisy ruchu i akcji
   - Szczegółowe informacje o oświetleniu i kompozycji
   - Jasno określone dialogi (obowiązkowe w Veo 3)
   - Realistyczne i wykonalne sceny

4. **Format wyjścia**: Podaj mi gotowy prompt naturalny, który mogę skopiować i wkleić bezpośrednio do Google AI Studio z Veo 3.

Pamiętaj:
- Maksymalna długość wideo: 8 sekund
- Dialog jest obowiązkowy
- Veo 3 najlepiej radzi sobie z realistycznymi scenami
- Prompt powinien być w języku angielskim dla Veo 3

Jaki byłby Twój ulepszone, gotowy do użycia prompt?`;
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(function() {
            console.log('Skopiowano do schowka');
        }).catch(function(err) {
            console.error('Błąd kopiowania: ', err);
            // Fallback dla starszych przeglądarek
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        });
    }

    function showCopyFeedback(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Skopiowano!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }

    // Przykładowe dane do testowania
    function loadExampleData() {
        document.getElementById('idea').value = 'Szef kuchni prezentuje autorskie risotto w eleganckiej restauracji';
        document.getElementById('character_name').value = 'Chef Marco';
        document.getElementById('character_age').value = '35';
        document.getElementById('character_height').value = '6\'0" / 183 cm';
        document.getElementById('character_description').value = 'Doświadczony szef kuchni o pewnej postawie, krótkie czarne włosy, profesjonalny wygląd';
        document.getElementById('character_outfit').value = 'Biały fartuch szefa kuchni, czarne spodnie, profesjonalne buty kuchenne';
        document.getElementById('character_demeanour').value = 'Pewny siebie, pełen pasji do gotowania';
        document.getElementById('location').value = 'Nowoczesna kuchnia restauracyjna z otwartą przestrzenią';
        document.getElementById('environment').value = 'Błyszczące stalowe powierzchnie, profesjonalny sprzęt, eleganckie oświetlenie';
        document.getElementById('action').value = 'Delikatnie układa risotto na białym talerzu, dodaje świeże zioła i uśmiecha się do kamery';
        document.getElementById('props').value = 'Biały porcelanowy talerz, świeże zioła, stalowe przybory';
        document.getElementById('dialogue').value = 'To jest moja autorska interpretacja klasycznego risotto milańskiego - każdy ziarnko ryżu ma swoją historię!';
        document.getElementById('audio_style').value = 'Delikatne dźwięki kuchni w tle, szelest garnków';
    }

    // Dodaj przycisk do ładowania przykładowych danych (dla developmentu)
    if (window.location.search.includes('debug')) {
        const debugBtn = document.createElement('button');
        debugBtn.textContent = '🧪 Załaduj przykład';
        debugBtn.style.position = 'fixed';
        debugBtn.style.top = '10px';
        debugBtn.style.right = '10px';
        debugBtn.style.zIndex = '9999';
        debugBtn.onclick = loadExampleData;
        document.body.appendChild(debugBtn);
    }
});