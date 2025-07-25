// Veo 3 Prompt Builder - Forms Module
const Forms = {
    validate: function(currentStep) {
        const currentStepElement = document.querySelector(`.step-content[data-step="${currentStep}"]`);
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
    },

    getFieldValue: function(fieldId) {
        const element = document.getElementById(fieldId);
        return element ? element.value : '';
    },

    collectData: function() {
        return {
            // Podstawowe
            idea: this.getFieldValue('idea'),
            duration: parseInt(this.getFieldValue('duration')),
            aspect_ratio: this.getFieldValue('aspect_ratio'),
            
            // Postać
            character_name: this.getFieldValue('character_name'),
            character_age: parseInt(this.getFieldValue('character_age')),
            character_height: this.getFieldValue('character_height'),
            character_build: this.getFieldValue('character_build'),
            character_skin: this.getFieldValue('character_skin'),
            character_hair: this.getFieldValue('character_hair'),
            character_eyes: this.getFieldValue('character_eyes'),
            character_marks: this.getFieldValue('character_marks'),
            character_outfit: this.getFieldValue('character_outfit'),
            character_demeanour: this.getFieldValue('character_demeanour'),
            
            // Scena
            location: this.getFieldValue('location'),
            time_of_day: this.getFieldValue('time_of_day'),
            environment: this.getFieldValue('environment'),
            
            // Akcja
            action: this.getFieldValue('action'),
            props: this.getFieldValue('props'),
            
            // Kamera
            composition: this.getFieldValue('composition'),
            camera_motion: this.getFieldValue('camera_motion'),
            camera_equipment: this.getFieldValue('camera_equipment'),
            
            // Oświetlenie
            lighting: this.getFieldValue('lighting'),
            tone: this.getFieldValue('tone'),
            color_grade: this.getFieldValue('color_grade'),
            
            // Dialog
            dialogue: this.getFieldValue('dialogue'),
            audio_style: this.getFieldValue('audio_style'),
            voice_emotion: this.getFieldValue('voice_emotion')
        };
    },

    reset: function() {
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
    },

    setupAutoSave: function(saveCallback) {
        // Auto-save on form field changes
        document.addEventListener('input', saveCallback);
        document.addEventListener('change', saveCallback);
    }
}; 