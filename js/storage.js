// Veo 3 Prompt Builder - Storage Module
const Storage = {
    keys: {
        builderState: 'veo3_builder_state',
        selectedTemplate: 'veo3_selectedTemplate'
    },

    save: function(appState) {
        const formData = {
            currentStep: appState.currentStep,
            templateSelected: appState.templateSelected,
            selectedTemplate: localStorage.getItem(this.keys.selectedTemplate),
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
        
        localStorage.setItem(this.keys.builderState, JSON.stringify(formData));
    },

    load: function() {
        const savedState = localStorage.getItem(this.keys.builderState);
        if (!savedState) return null;

        try {
            const data = JSON.parse(savedState);
            
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
            
            return {
                currentStep: data.currentStep || 0,
                templateSelected: data.templateSelected || false,
                selectedTemplate: data.selectedTemplate
            };
            
        } catch (e) {

            return null;
        }
    },

    saveTemplate: function(templateName) {
        localStorage.setItem(this.keys.selectedTemplate, templateName);
    },

    clear: function() {
        localStorage.removeItem(this.keys.builderState);
        localStorage.removeItem(this.keys.selectedTemplate);
    },

    clearAll: function() {
        localStorage.clear();
    }
}; 