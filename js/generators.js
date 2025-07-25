// Veo 3 Prompt Builder - Generators Module
const Generators = {
    generateVideoSchema: function(data) {
        return {
            character_name: data.character_name,
            character_profile: {
                age: data.character_age,
                height: data.character_height,
                build: data.character_build,
                skin_tone: data.character_skin,
                hair: data.character_hair,
                eyes: data.character_eyes,
                distinguishing_marks: data.character_marks || null,
                demeanour: data.character_demeanour
            },
            global_style: {
                camera: data.camera_equipment,
                color_grade: data.color_grade,
                lighting: data.lighting,
                outfit: data.character_outfit,
                max_clip_duration_sec: data.duration,
                aspect_ratio: data.aspect_ratio,
                mouth_shape_intensity: 0.85,
                eye_contact_ratio: 0.7,
                audio_defaults: {
                    format: "wav",
                    sample_rate_hz: 48000,
                    channels: 2,
                    style: data.audio_style || null
                }
            },
            clips: [{
                id: "main_clip",
                shot: {
                    composition: data.composition,
                    camera_motion: data.camera_motion || null,
                    frame_rate: "24 fps",
                    film_grain: 0.05
                },
                subject: {
                    description: `${data.character_name} — ${data.character_age}-year-old, ${data.character_height}, ${data.character_build}; ${data.character_skin}; ${data.character_hair}; ${data.character_eyes}${data.character_marks ? '; ' + data.character_marks : ''}; wearing ${data.character_outfit}`,
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
                    tone: data.tone
                },
                audio_track: {
                    lyrics: data.dialogue,
                    emotion: data.voice_emotion,
                    flow: null,
                    wave_download_url: null,
                    youtube_reference: null,
                    audio_base64: null
                },
                color_palette: data.color_grade,
                dialogue: {
                    character: data.character_name,
                    line: data.dialogue,
                    subtitles: false
                },
                performance: {
                    mouth_shape_intensity: 0.85,
                    eye_contact_ratio: 0.7
                },
                duration_sec: data.duration,
                aspect_ratio: data.aspect_ratio
            }]
        };
    },

    generateNaturalPrompt: function(data) {
        const parts = [];
        
        // Postać i akcja
        const characterDesc = `${data.character_name} — ${data.character_age}-year-old, ${data.character_height}, ${data.character_build}; ${data.character_skin}; ${data.character_hair}; ${data.character_eyes}${data.character_marks ? '; ' + data.character_marks : ''}; wearing ${data.character_outfit}`;
        parts.push(`${characterDesc} ${data.action}`);
        
        // Lokalizacja i czas
        let sceneDesc = `Location: ${data.location}`;
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
        let dialogDesc = `${data.character_name} says: "${data.dialogue}"`;
        if (data.audio_style) {
            dialogDesc += `, ${data.audio_style}`;
        }
        parts.push(dialogDesc);
        
        // Rekwizyty
        if (data.props) {
            parts.push(`Props: ${data.props}`);
        }
        
        return parts.join(' ');
    },

    generateLLMPrompt: function(videoSchema) {
        return `I'm an AI video creator and need help improving my prompt for Veo 3 (Google Gemini Video). 

Here's my current video specification in JSON format:

${JSON.stringify(videoSchema, null, 2)}

Please provide:

1. **Analysis** - what can be improved in this prompt?
2. **Enhancement** - create a more detailed and effective natural prompt for Veo 3
3. **Optimization** - consider best practices for AI video generation:
   - Precise movement and action descriptions
   - Detailed lighting and composition information
   - Clear dialogue (mandatory in Veo 3)
   - Realistic and achievable scenes

4. **Output format**: Give me a ready-to-use natural prompt that I can copy and paste directly into Google AI Studio with Veo 3.

Remember:
- Maximum video length: 8 seconds
- Dialogue is mandatory
- Veo 3 works best with realistic scenes
- Prompt should be in English for Veo 3

What would be your improved, ready-to-use prompt?`;
    },

    generateResults: function() {
        const formData = Forms.collectData();
        const videoSchema = this.generateVideoSchema(formData);
        const naturalPromptText = this.generateNaturalPrompt(formData);
        const llmPromptText = this.generateLLMPrompt(videoSchema);

        // Display results
        const jsonOutput = document.getElementById('jsonOutput');
        const llmPrompt = document.getElementById('llmPrompt');
        const naturalPrompt = document.getElementById('naturalPrompt');

        if (jsonOutput) jsonOutput.textContent = JSON.stringify(videoSchema, null, 2);
        if (llmPrompt) llmPrompt.textContent = llmPromptText;
        if (naturalPrompt) naturalPrompt.textContent = naturalPromptText;
    },

    copyResults: function(type) {
        let textToCopy = '';
        let button;

        if (type === 'json') {
            textToCopy = document.getElementById('jsonOutput').textContent;
            button = document.getElementById('copyJsonBtn');
        } else if (type === 'prompt') {
            textToCopy = document.getElementById('llmPrompt').textContent;
            button = document.getElementById('copyPromptBtn');
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            this.showCopyFeedback(button);
        }).catch(err => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showCopyFeedback(button);
        });
    },

    showCopyFeedback: function(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Skopiowano!';
        button.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.backgroundColor = '';
        }, 2000);
    }
}; 