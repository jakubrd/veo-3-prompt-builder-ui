// Veo 3 Prompt Builder - Main Application Module
const App = {
    // Application state
    state: {
        currentStep: 0,
        totalSteps: 9, // 0-8
        templateSelected: false
    },

    // DOM elements
    elements: {
        nextBtn: null,
        prevBtn: null,
        progressFill: null,
        copyJsonBtn: null,
        copyPromptBtn: null,
        resetBtn: null
    },

    init: function() {

        
        // Get DOM elements
        this.elements.nextBtn = document.getElementById('nextBtn');
        this.elements.prevBtn = document.getElementById('prevBtn');
        this.elements.progressFill = document.getElementById('progressFill');
        this.elements.copyJsonBtn = document.getElementById('copyJsonBtn');
        this.elements.copyPromptBtn = document.getElementById('copyPromptBtn');
        this.elements.resetBtn = document.getElementById('resetBtn');

        // Setup event listeners
        this.setupEventListeners();
        
        // Load saved state
        this.loadFromStorage();
        
        // Update UI
        this.updateProgressBar();
        this.updateStepIndicators();
        this.updateNavigation();
        
        // Setup safeguards
        this.setupSafeguards();
        
        // Setup auto-save
        Forms.setupAutoSave(() => this.saveToStorage());
        

    },

    setupEventListeners: function() {
        // Navigation buttons
        if (this.elements.nextBtn) {
            this.elements.nextBtn.addEventListener('click', () => this.nextStep());
        }
        if (this.elements.prevBtn) {
            this.elements.prevBtn.addEventListener('click', () => this.prevStep());
        }

        // Reset button
        if (this.elements.resetBtn) {
            this.elements.resetBtn.addEventListener('click', () => {
                if (confirm('Czy na pewno chcesz zacząć od nowa? Wszystkie wprowadzone dane zostaną utracone.')) {
                    this.resetForm();
                }
            });
        }

        // Copy buttons
        if (this.elements.copyJsonBtn) {
            this.elements.copyJsonBtn.addEventListener('click', () => Generators.copyResults('json'));
        }
        if (this.elements.copyPromptBtn) {
            this.elements.copyPromptBtn.addEventListener('click', () => Generators.copyResults('prompt'));
        }

        // Step indicators
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                // Allow navigation to any step if validation passes
                if (this.canMoveToStep(index)) {
                    this.goToStep(index);
                }
            });
        });

        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', () => {
                const templateName = card.dataset.template;
                
                // If blank template is selected, clear stored form data
                if (templateName === 'blank') {
                    Storage.clear();
                }
                
                Templates.load(templateName);
                this.state.templateSelected = true;
                
                // Visual feedback
                document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                
                // Save selection
                Storage.saveTemplate(templateName);
                this.saveToStorage();
                
                // Move to next step after template selection
                setTimeout(() => {
                    this.nextStep();
                }, 500);
            });
        });
    },

    nextStep: function() {
        if (this.state.currentStep < this.state.totalSteps - 1) {
            // Validate current step
            if (!this.canMoveToStep(this.state.currentStep + 1)) {
                return;
            }
            
            this.goToStep(this.state.currentStep + 1);
        }
    },

    prevStep: function() {
        if (this.state.currentStep > 0) {
            this.goToStep(this.state.currentStep - 1);
        }
    },

    canMoveToStep: function(stepIndex) {
        // Only restriction: can't leave step 0 without selecting a template
        if (this.state.currentStep === 0 && stepIndex > 0) {
            if (!this.state.templateSelected) {
                alert('Proszę wybrać template lub pusty szablon przed przejściem dalej.');
                return false;
            }
        }
        
        // Allow free navigation between all other steps
        return true;
    },

    goToStep: function(stepIndex) {
        // Check if target step exists
        const targetStepElement = document.querySelector(`.step-content[data-step="${stepIndex}"]`);
        if (!targetStepElement) {
            return;
        }
        
        // Update current step
        this.state.currentStep = stepIndex;
        
        // Show the step
        this.showStep(this.state.currentStep);
        
        // Update UI
        this.updateProgressBar();
        this.updateStepIndicators();
        this.updateNavigation();
        
        // Save progress
        this.saveToStorage();
    },

    showStep: function(stepIndex) {
        // Find the target step content (not the indicator)
        const targetStep = document.querySelector(`.step-content[data-step="${stepIndex}"]`);
        if (!targetStep) {
            return;
        }
        
        // Hide all steps first
        document.querySelectorAll('.step-content').forEach((step, index) => {
            step.classList.remove('active');
            step.removeAttribute('data-force-visible');
            step.style.display = '';
        });
        
        // Show target step
        targetStep.classList.add('active');
        targetStep.setAttribute('data-force-visible', 'true');
        
        // Force display using inline style as backup
        targetStep.style.display = 'block';
    },

    updateProgressBar: function() {
        if (this.elements.progressFill) {
            const progress = ((this.state.currentStep) / (this.state.totalSteps - 1)) * 100;
            this.elements.progressFill.style.width = `${progress}%`;
        }
    },

    updateStepIndicators: function() {
        document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
            indicator.classList.remove('active', 'completed', 'clickable');
            
            if (index === this.state.currentStep) {
                indicator.classList.add('active');
            } else if (index < this.state.currentStep) {
                indicator.classList.add('completed', 'clickable');
            } else if (index > 0 && this.state.templateSelected) {
                // All steps beyond 0 are clickable once template is selected
                indicator.classList.add('clickable');
            } else if (index === 0) {
                // Step 0 is always clickable
                indicator.classList.add('clickable');
            }
            
            // Update cursor style - all indicators should be clickable except when no template selected
            const isClickable = index === 0 || this.state.templateSelected;
            indicator.style.cursor = isClickable ? 'pointer' : 'default';
        });
    },

    updateNavigation: function() {
        // Previous button
        if (this.state.currentStep === 0) {
            if (this.elements.prevBtn) this.elements.prevBtn.style.display = 'none';
        } else {
            if (this.elements.prevBtn) this.elements.prevBtn.style.display = 'inline-flex';
        }

        // Next button
        if (this.state.currentStep === this.state.totalSteps - 1) {
            // Last step - hide next button and auto-generate results
            if (this.elements.nextBtn) this.elements.nextBtn.style.display = 'none';
            Generators.generateResults(); // Auto-generate on last step
        } else if (this.state.currentStep === this.state.totalSteps - 2) {
            // Second to last step
            if (this.elements.nextBtn) this.elements.nextBtn.innerHTML = '<i class="fas fa-magic"></i> Zobacz wyniki';
        } else {
            if (this.elements.nextBtn) {
                this.elements.nextBtn.style.display = 'inline-flex';
                this.elements.nextBtn.innerHTML = 'Następny <i class="fas fa-chevron-right"></i>';
            }
        }
    },

    saveToStorage: function() {
        Storage.save(this.state);
    },

    loadFromStorage: function() {
        const savedState = Storage.load();
        if (savedState) {
            this.state.currentStep = savedState.currentStep;
            this.state.templateSelected = savedState.templateSelected;
            
            // Show the correct step ONLY if it's not step 0 (which should already be active)
            if (this.state.currentStep !== 0) {
                this.showStep(this.state.currentStep);
            } else {
                // For step 0, just ensure it's properly visible without unnecessary DOM manipulation
                const step0 = document.querySelector('.step-content[data-step="0"]');
                if (step0) {
                    step0.classList.add('active');
                    step0.setAttribute('data-force-visible', 'true');

                }
            }
        } else {
            // No saved state, initialize to first step
            this.initializeFirstStep();
        }
    },

    initializeFirstStep: function() {
        this.state.currentStep = 0;
        this.state.templateSelected = false;
        
        // Check if step 0 is already active (from HTML)
        const step0 = document.querySelector('.step-content[data-step="0"]');
        if (step0 && step0.classList.contains('active')) {
            step0.setAttribute('data-force-visible', 'true');
        } else {
            this.showStep(this.state.currentStep);
        }
    },

    setupSafeguards: function() {
        // Final safeguard - ensure step 0 is visible if no other step is active
        setTimeout(() => {
            const activeSteps = document.querySelectorAll('.step-content.active');
            const step0 = document.querySelector('.step-content[data-step="0"]');
            
            if (activeSteps.length === 0 && step0) {
                step0.classList.add('active');
                step0.setAttribute('data-force-visible', 'true');
                this.state.currentStep = 0;
            }
            
            // Extra safeguard for step 0 specifically
            if (step0 && this.state.currentStep === 0) {
                step0.classList.add('active');
                step0.setAttribute('data-force-visible', 'true');
            }
        }, 100);
        
        // Even more aggressive fallback
        setTimeout(() => {
            const step0 = document.querySelector('.step-content[data-step="0"]');
            if (step0 && this.state.currentStep === 0) {
                const computedDisplay = window.getComputedStyle(step0).display;
                if (computedDisplay === 'none') {
                    step0.classList.add('active');
                    step0.setAttribute('data-force-visible', 'true');
                    step0.style.display = 'block !important';
                }
            }
        }, 500);
    },

    resetForm: function() {
        this.state.currentStep = 0;
        this.state.templateSelected = false;
        
        // Clear storage
        Storage.clear();
        
        // Reset form fields
        Forms.reset();
        
        // Reset to first step
        this.initializeFirstStep();
        
        // Update UI
        this.updateProgressBar();
        this.updateStepIndicators();
        this.updateNavigation();
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    App.init();
}); 