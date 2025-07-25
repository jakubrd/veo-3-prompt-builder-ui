// Veo 3 Prompt Builder - Templates Module
const Templates = {
    data: {
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
    },

    load: function(templateName) {
        const template = this.data[templateName];
        
        // Handle blank template - clear all form fields
        if (!template || Object.keys(template).length === 0 || templateName === 'blank') {
            this.clearAllFields();
            return;
        }

        // Load template data into form
        Object.keys(template).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.value = template[key];
            }
        });
    },

    clearAllFields: function() {
        // List of all form field IDs
        const allFieldIds = [
            'idea', 'duration', 'aspect_ratio', 'character_name', 'character_age', 
            'character_height', 'character_build', 'character_skin', 'character_hair', 
            'character_eyes', 'character_marks', 'character_outfit', 'character_demeanour',
            'location', 'time_of_day', 'environment', 'action', 'props', 
            'composition', 'camera_motion', 'camera_equipment', 'lighting', 
            'tone', 'color_grade', 'dialogue', 'voice_emotion', 'audio_style'
        ];

        // Clear all form fields
        allFieldIds.forEach(fieldId => {
            const element = document.getElementById(fieldId);
            if (element) {
                if (element.type === 'select-one') {
                    // Reset dropdowns to first option
                    element.selectedIndex = 0;
                } else {
                    // Clear text inputs and textareas
                    element.value = '';
                }
            }
        });

        // Reset specific default values (locked fields)
        const durationField = document.getElementById('duration');
        if (durationField) durationField.value = '8'; // Always 8 seconds (locked)
        
        const aspectField = document.getElementById('aspect_ratio');
        if (aspectField) aspectField.value = '16:9'; // Always 16:9 (locked)


    },

    get: function(templateName) {
        return this.data[templateName] || {};
    },

    getAll: function() {
        return this.data;
    }
}; 