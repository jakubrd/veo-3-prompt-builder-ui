// Veo 3 Prompt Builder JavaScript - Stepped Version
document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 0;
    const totalSteps = 9; // 0-8
    let templateSelected = false;
    
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const generateBtn = document.getElementById('generateBtn');
    const progressFill = document.getElementById('progressFill');
    const copyJsonBtn = document.getElementById('copyJsonBtn');
    const copyPromptBtn = document.getElementById('copyPromptBtn');

    // Templates data
    const templates = {
        'nyx-cipher': {
            idea: 'Stylowa scena przy basenie z neonowymi kolorami i trap-pop muzyką',
            duration: 8,
            aspect_ratio: '16:9',
            character_name: 'Nyx Cipher',
            character_age: 27,
            character_height: '5\'8" / 173 cm',
            character_build: 'lean, athletic, swimmer\'s shoulders',
            character_skin: 'deep bronze with a subtle sun-kissed glow',
            character_hair: 'jet-black, shoulder-length, slicked straight back and dripping',
            character_eyes: 'almond-shaped hazel with faint gold flecks',
            character_marks: 'tiny star tattoo tucked behind her right ear; gold stud in upper left helix',
            character_outfit: 'metallic-coral bikini, mirrored sunglasses, gold hoop earrings',
            character_demeanour: 'playfully self-assured, almost dare-you smirk',
            location: 'rooftop infinity pool overlooking a neon-tropic city skyline',
            time_of_day: 'mid-day',
            environment: 'sunlit pool water reflecting shifting patterns; floating dollar-sign inflatables',
            action: 'Nyx leans on pool edge and, on beat four, fans her hand cheekily toward camera as droplets sparkle in the air',
            props: 'floating dollar-sign inflatables',
            composition: 'Medium close-up, 35mm lens, deep focus',
            camera_motion: 'slow dolly-in 60 cm',
            camera_equipment: 'smooth gimbal 35mm',
            lighting: 'high-key mid-day sunlight with specular highlights',
            tone: 'vibrant, playful, confident',
            color_grade: 'hyper-saturated neon-tropic (hot-pink, aqua, tangerine)',
            dialogue: 'Splash-cash, bling-blap—pool water pshh! Charts skrrt! like my wave, hot tropics whoosh!',
            voice_emotion: 'confident, tongue-in-cheek',
            audio_style: 'trap-pop rap, 145 BPM, swung hats, sub-bass'
        },
        'chef-marco': {
            idea: 'Profesjonalny szef kuchni prezentuje autorskie risotto w eleganckiej restauracji',
            duration: 8,
            aspect_ratio: '16:9',
            character_name: 'Chef Marco',
            character_age: 35,
            character_height: '6\'0" / 183 cm',
            character_build: 'sturdy build, weathered hands from years of cooking',
            character_skin: 'olive-toned with weathered texture',
            character_hair: 'salt-and-pepper beard, short dark hair',
            character_eyes: 'warm brown eyes with laugh lines',
            character_marks: '',
            character_outfit: 'pristine white chef\'s coat with rolled sleeves, black pants',
            character_demeanour: 'professional, passionate about cooking',
            location: 'modern restaurant kitchen with open space',
            time_of_day: 'golden hour just before sunset',
            environment: 'stainless steel surfaces, professional equipment, warm lighting from windows',
            action: 'carefully plates microgreens with tweezers, each movement precise and deliberate, smiles at camera',
            props: 'elegant white plate, fresh herbs, steel kitchen tools',
            composition: 'Medium close-up, 35mm lens, deep focus',
            camera_motion: '',
            camera_equipment: 'smooth gimbal 35mm',
            lighting: 'warm kitchen ambient lighting',
            tone: 'warm, professional, inviting',
            color_grade: 'warm, golden tones',
            dialogue: 'This is my signature interpretation of classic risotto - every grain tells a story!',
            voice_emotion: 'confident, passionate',
            audio_style: 'soft kitchen ambiance, gentle clinking of utensils'
        },
        'tech-presenter': {
            idea: 'Młoda programistka wyjaśnia kod na monitorze w nowoczesnym biurze tech',
            duration: 8,
            aspect_ratio: '16:9',
            character_name: 'Sarah Chen',
            character_age: 28,
            character_height: '5\'6" / 168 cm',
            character_build: 'lean, professional posture',
            character_skin: 'natural, professional look',
            character_hair: 'shoulder-length black hair, neat professional style',
            character_eyes: 'focused dark brown eyes behind stylish glasses',
            character_marks: '',
            character_outfit: 'modern business casual, navy blazer, white shirt',
            character_demeanour: 'confident, knowledgeable, approachable',
            location: 'modern tech office with glass walls and city view',
            time_of_day: 'overcast afternoon',
            environment: 'multiple monitors, modern desk setup, soft natural lighting',
            action: 'points to code on screen, gestures while explaining, maintains eye contact with camera',
            props: 'multiple monitors, laptop, code editor, coffee cup',
            composition: 'Medium close-up, 35mm lens, deep focus',
            camera_motion: '',
            camera_equipment: 'professional cinema camera setup',
            lighting: 'soft natural window light',
            tone: 'modern, clean, minimalist',
            color_grade: 'cool, modern blue tones',
            dialogue: 'This algorithm optimizes performance by 40% - let me show you how it works!',
            voice_emotion: 'enthusiastic, energetic',
            audio_style: 'soft office ambiance, keyboard clicks'
        },
        'blank': {}
    };

    // Initialize
    loadFromLocalStorage();
    updateProgressBar();
    updateStepIndicators();
    updateNavigation();
    
    // Add click handlers for step indicators
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            // Only allow navigation to completed steps or next step
            if (index <= currentStep || (index === currentStep + 1 && canMoveToStep(index))) {
                goToStep(index);
            }
        });
    });

    // Template selection
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            const templateName = this.dataset.template;
            loadTemplate(templateName);
            templateSelected = true;
            
            // Visual feedback
            document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            // Save selection to localStorage
            localStorage.setItem('veo3_selectedTemplate', templateName);
            saveToLocalStorage();
            
            // Move to next step after template selection
            setTimeout(() => {
                nextStep();
            }, 500);
        });
    });

    // Navigation
    nextBtn.addEventListener('click', nextStep);
    prevBtn.addEventListener('click', prevStep);
    generateBtn.addEventListener('click', generateResults);
    
    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Czy na pewno chcesz zacząć od nowa? Wszystkie wprowadzone dane zostaną utracone.')) {
                resetForm();
            }
        });
    }

    // Copy functionality
    if (copyJsonBtn) copyJsonBtn.addEventListener('click', () => copyResults('json'));
    if (copyPromptBtn) copyPromptBtn.addEventListener('click', () => copyResults('prompt'));

    function loadTemplate(templateName) {
        const template = templates[templateName];
        if (!template || Object.keys(template).length === 0) return;

        // Load template data into form
        Object.keys(template).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = template[key];
            }
        });
    }

    function nextStep() {
        if (currentStep < totalSteps - 1) {
            // Validate current step
            if (!canMoveToStep(currentStep + 1)) {
                return;
            }
            
            goToStep(currentStep + 1);
        }
    }
    
    function canMoveToStep(stepIndex) {
        // Step 0: Template selection - check if template is selected
        if (currentStep === 0 && stepIndex > 0) {
            if (!templateSelected) {
                alert('Proszę wybrać template lub pusty szablon.');
                return false;
            }
        }
        
        // Other steps: validate required fields
        if (currentStep > 0 && stepIndex > currentStep) {
            return validateCurrentStep();
        }
        
        return true;
    }
    
    function goToStep(stepIndex) {
        // Hide current step
        document.querySelector(`[data-step="${currentStep}"]`).classList.remove('active');
        
        // Show target step
        currentStep = stepIndex;
        document.querySelector(`[data-step="${currentStep}"]`).classList.add('active');
        
        // Update UI
        updateProgressBar();
        updateStepIndicators();
        updateNavigation();
        
        // Save progress
        saveToLocalStorage();
        
        // Scroll to top
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    }

    function prevStep() {
        if (currentStep > 0) {
            goToStep(currentStep - 1);
        }
    }

    function updateProgressBar() {
        const progress = ((currentStep) / (totalSteps - 1)) * 100;
        progressFill.style.width = `${progress}%`;
    }

    function updateStepIndicators() {
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            indicator.classList.remove('active', 'completed', 'clickable');
            
            if (index === currentStep) {
                indicator.classList.add('active');
            } else if (index < currentStep) {
                indicator.classList.add('completed', 'clickable');
            } else if (index === currentStep + 1 && (templateSelected || currentStep > 0)) {
                indicator.classList.add('clickable');
            }
            
            // Update cursor style
            indicator.style.cursor = indicator.classList.contains('clickable') || index <= currentStep ? 'pointer' : 'default';
        });
    }

    function updateNavigation() {
        // Previous button
        if (currentStep === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-flex';
        }

        // Next/Generate button
        if (currentStep === totalSteps - 1) {
            // Last step - show results
            nextBtn.style.display = 'none';
            generateBtn.style.display = 'inline-flex';
            generateResults(); // Auto-generate on last step
        } else if (currentStep === totalSteps - 2) {
            // Second to last step
            nextBtn.innerHTML = '<i class="fas fa-magic"></i> Zobacz wyniki';
        } else {
            nextBtn.style.display = 'inline-flex';
            generateBtn.style.display = 'none';
            nextBtn.innerHTML = 'Następny <i class="fas fa-chevron-right"></i>';
        }
    }

    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        
        for (let field of requiredFields) {
            if (!field.value.trim()) {
                field.focus();
                field.style.border = '2px solid #e53e3e';
                
                // Remove error styling after user starts typing
                field.addEventListener('input', function() {
                    this.style.border = '';
                }, { once: true });
                
                return false;
            }
        }
        return true;
    }

    function generateResults() {
        const formData = collectFormData();
        const videoSchema = generateVideoSchema(formData);
        const naturalPromptText = generateNaturalPrompt(formData);
        const llmPromptText = generateLLMPrompt(videoSchema);

        // Display results
        const jsonOutput = document.getElementById('jsonOutput');
        const llmPrompt = document.getElementById('llmPrompt');
        const naturalPrompt = document.getElementById('naturalPrompt');

        if (jsonOutput) jsonOutput.textContent = JSON.stringify(videoSchema, null, 2);
        if (llmPrompt) llmPrompt.textContent = llmPromptText;
        if (naturalPrompt) naturalPrompt.textContent = naturalPromptText;
    }

    function collectFormData() {
        return {
            // Podstawowe
            idea: getFieldValue('idea'),
            duration: parseInt(getFieldValue('duration')),
            aspect_ratio: getFieldValue('aspect_ratio'),
            
            // Postać
            character_name: getFieldValue('character_name'),
            character_age: parseInt(getFieldValue('character_age')),
            character_height: getFieldValue('character_height'),
            character_build: getFieldValue('character_build'),
            character_skin: getFieldValue('character_skin'),
            character_hair: getFieldValue('character_hair'),
            character_eyes: getFieldValue('character_eyes'),
            character_marks: getFieldValue('character_marks'),
            character_outfit: getFieldValue('character_outfit'),
            character_demeanour: getFieldValue('character_demeanour'),
            
            // Scena
            location: getFieldValue('location'),
            time_of_day: getFieldValue('time_of_day'),
            environment: getFieldValue('environment'),
            
            // Akcja
            action: getFieldValue('action'),
            props: getFieldValue('props'),
            
            // Kamera
            composition: getFieldValue('composition'),
            camera_motion: getFieldValue('camera_motion'),
            camera_equipment: getFieldValue('camera_equipment'),
            
            // Oświetlenie
            lighting: getFieldValue('lighting'),
            tone: getFieldValue('tone'),
            color_grade: getFieldValue('color_grade'),
            
            // Dialog
            dialogue: getFieldValue('dialogue'),
            audio_style: getFieldValue('audio_style'),
            voice_emotion: getFieldValue('voice_emotion')
        };
    }

    function getFieldValue(fieldId) {
        const element = document.getElementById(fieldId);
        return element ? element.value : '';
    }

    function generateVideoSchema(data) {
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
    }

    function generateNaturalPrompt(data) {
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
    }

    function generateLLMPrompt(videoSchema) {
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
    }

    function copyResults(type) {
        let textToCopy = '';
        let button;

        if (type === 'json') {
            textToCopy = document.getElementById('jsonOutput').textContent;
            button = copyJsonBtn;
        } else if (type === 'prompt') {
            textToCopy = document.getElementById('llmPrompt').textContent;
            button = copyPromptBtn;
        }

        navigator.clipboard.writeText(textToCopy).then(() => {
            showCopyFeedback(button);
        }).catch(err => {
            console.error('Error copying: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopyFeedback(button);
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
    
    // LocalStorage functions
    function saveToLocalStorage() {
        const formData = {
            currentStep: currentStep,
            templateSelected: templateSelected,
            selectedTemplate: localStorage.getItem('veo3_selectedTemplate'),
            formFields: {}
        };
        
        // Save all form field values
        const fields = ['idea', 'duration', 'aspect_ratio', 'character_name', 'character_age', 
                       'character_height', 'character_build', 'character_skin', 'character_hair', 
                       'character_eyes', 'character_marks', 'character_outfit', 'character_demeanour',
                       'location', 'time_of_day', 'environment', 'action', 'props', 
                       'composition', 'camera_motion', 'camera_equipment', 'lighting', 
                       'tone', 'color_grade', 'dialogue', 'voice_emotion', 'audio_style'];
        
        fields.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                formData.formFields[fieldId] = element.value;
            }
        });
        
        localStorage.setItem('veo3_builder_state', JSON.stringify(formData));
    }
    
    function loadFromLocalStorage() {
        const savedState = localStorage.getItem('veo3_builder_state');
        if (savedState) {
            try {
                const data = JSON.parse(savedState);
                currentStep = data.currentStep || 0;
                templateSelected = data.templateSelected || false;
                
                // Restore form field values
                if (data.formFields) {
                    Object.keys(data.formFields).forEach(fieldId => {
                        const element = document.getElementById(fieldId);
                        if (element && data.formFields[fieldId]) {
                            element.value = data.formFields[fieldId];
                        }
                    });
                }
                
                // Restore selected template visual state
                if (data.selectedTemplate) {
                    const templateCard = document.querySelector(`[data-template="${data.selectedTemplate}"]`);
                    if (templateCard) {
                        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
                        templateCard.classList.add('selected');
                    }
                }
                
                // Show the correct step
                document.querySelectorAll('.step-content').forEach(step => step.classList.remove('active'));
                const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
                if (currentStepElement) {
                    currentStepElement.classList.add('active');
                }
                
            } catch (e) {
                console.error('Error loading saved state:', e);
                resetForm();
            }
        }
    }
    
    function resetForm() {
        currentStep = 0;
        templateSelected = false;
        
        // Clear localStorage
        localStorage.removeItem('veo3_builder_state');
        localStorage.removeItem('veo3_selectedTemplate');
        
        // Reset all form fields
        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.value = '';
        });
        
        // Reset dropdowns to first option
        document.querySelectorAll('select').forEach(select => {
            if (select.options.length > 0) {
                select.selectedIndex = 0;
            }
        });
        
        // Reset duration to 8
        const durationField = document.getElementById('duration');
        if (durationField) durationField.value = '8';
        
        // Reset aspect ratio to 16:9
        const aspectField = document.getElementById('aspect_ratio');
        if (aspectField) aspectField.value = '16:9';
        
        // Clear template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // Reset to first step
        document.querySelectorAll('.step-content').forEach(step => step.classList.remove('active'));
        document.querySelector('[data-step="0"]').classList.add('active');
        
        // Update UI
        updateProgressBar();
        updateStepIndicators();
        updateNavigation();
    }
    
    // Auto-save on form field changes
    document.addEventListener('input', saveToLocalStorage);
    document.addEventListener('change', saveToLocalStorage);
    
});