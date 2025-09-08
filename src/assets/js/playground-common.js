// Common playground functionality
class ChronoUtilzPlayground {
    constructor() {
        this.currentFunction = '';
        this.functions = {};
    }

    initialize() {
        // Check if ChronoUtilz is available
        if (typeof ChronoUtilz !== 'undefined') {
            console.log('✅ ChronoUtilz library loaded successfully!');
            const statusEl = document.getElementById('libraryStatus');
            if (statusEl) {
                statusEl.innerHTML = '<p class="text-green-600 font-semibold">✅ ChronoUtilz library loaded</p>';
            }
            this.setupEventListeners();
        } else {
            console.error('❌ ChronoUtilz library not found!');
            const statusEl = document.getElementById('libraryStatus');
            if (statusEl) {
                statusEl.innerHTML = '<p class="text-red-600 font-semibold">❌ ChronoUtilz library not loaded</p>';
            }
        }
    }

    setupEventListeners() {
        // Function selector handler
        const selector = document.getElementById('functionSelector');
        if (selector) {
            selector.addEventListener('change', (e) => {
                const functionName = e.target.value;
                if (functionName) {
                    this.showFunctionDetails(functionName);
                } else {
                    this.hideFunctionDetails();
                }
            });
        }

        // Execute function button handler
        const executeBtn = document.getElementById('executeFunction');
        if (executeBtn) {
            executeBtn.addEventListener('click', () => this.executeCurrentFunction());
        }

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    }

    populateFunctionSelector(functions) {
        this.functions = functions;
        const selector = document.getElementById('functionSelector');
        if (!selector) return;

        selector.innerHTML = '<option value="">Choose a function...</option>';
        
        Object.keys(functions).forEach(funcName => {
            const option = document.createElement('option');
            option.value = funcName;
            option.textContent = functions[funcName].name;
            selector.appendChild(option);
        });
    }

    showFunctionDetails(functionName) {
        this.currentFunction = functionName;
        const funcData = this.functions[functionName];
        if (!funcData) return;
        
        // Show function details
        const detailsEl = document.getElementById('functionDetails');
        if (detailsEl) {
            detailsEl.classList.remove('hidden');
        }

        // Update function info
        this.updateElement('functionName', funcData.name);
        this.updateElement('functionDescription', funcData.description);
        this.updateElement('functionParams', funcData.params.map(p => p.name).join(', '));

        // Generate parameter inputs
        this.generateParameterInputs(funcData.params);
    }

    hideFunctionDetails() {
        const detailsEl = document.getElementById('functionDetails');
        if (detailsEl) {
            detailsEl.classList.add('hidden');
        }
        this.currentFunction = '';
    }

    updateElement(id, content) {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = content;
        }
    }

    getTimezoneOptions() {
        if (typeof ChronoUtilz !== 'undefined' && ChronoUtilz.listTimezones) {
            // Return ALL timezones from the database, sorted alphabetically
            const allTimezones = ChronoUtilz.listTimezones();
            const userTimezone = ChronoUtilz.getUserTimezone();
            
            // Put user's timezone first, then UTC, then all others sorted
            const priorityTimezones = [userTimezone, 'UTC'];
            const remaining = allTimezones.filter(tz => !priorityTimezones.includes(tz)).sort();
            
            return [...new Set([...priorityTimezones, ...remaining])]; // Remove duplicates
        }
        
        // Fallback if library not loaded
        return ["UTC", "America/New_York", "Europe/London", "Asia/Tokyo"];
    }

    generateParameterInputs(params) {
        const container = document.getElementById('parameterInputs');
        if (!container) return;

        container.innerHTML = '';

        params.forEach(param => {
            const div = document.createElement('div');
            div.className = 'mb-4';
            
            let input;
            if (param.type === 'select') {
                input = document.createElement('select');
                input.className = 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
                
                let options = param.options;
                
                // Handle dynamic timezone loading
                if (options === "DYNAMIC_TIMEZONES") {
                    options = this.getTimezoneOptions();
                }
                
                options.forEach(option => {
                    const optElement = document.createElement('option');
                    optElement.value = option;
                    optElement.textContent = option;
                    if (option === param.default) optElement.selected = true;
                    input.appendChild(optElement);
                });
            } else if (param.type === 'checkbox') {
                const wrapper = document.createElement('div');
                wrapper.className = 'flex items-center';
                
                input = document.createElement('input');
                input.type = 'checkbox';
                input.checked = param.default;
                input.className = 'rounded focus:ring-2 focus:ring-indigo-500 mr-2';
                
                const label = document.createElement('span');
                label.textContent = param.description;
                label.className = 'text-sm text-gray-700';
                
                wrapper.appendChild(input);
                wrapper.appendChild(label);
                
                div.appendChild(this.createLabel(param.name));
                div.appendChild(wrapper);
                
                input.id = `param_${param.name}`;
                container.appendChild(div);
                return;
            } else {
                input = document.createElement('input');
                input.type = param.type;
                input.value = param.default || '';
                input.className = 'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent';
            }
            
            input.id = `param_${param.name}`;
            
            const label = this.createLabel(param.name);
            label.setAttribute('for', input.id);
            
            const desc = document.createElement('p');
            desc.textContent = param.description;
            desc.className = 'text-sm text-gray-500 mt-1';

            div.appendChild(label);
            div.appendChild(input);
            div.appendChild(desc);
            
            container.appendChild(div);
        });
    }

    createLabel(text) {
        const label = document.createElement('label');
        label.textContent = text;
        label.className = 'block text-sm font-medium text-gray-700 mb-2';
        return label;
    }

    executeCurrentFunction() {
        if (!this.currentFunction) return;

        const funcData = this.functions[this.currentFunction];
        const params = [];
        const codeParams = [];

        // Collect parameter values
        funcData.params.forEach(param => {
            const input = document.getElementById(`param_${param.name}`);
            if (!input) return;

            let value = param.type === 'checkbox' ? input.checked : input.value;
            
            // Convert values to appropriate types
            if (param.type === 'number') {
                value = parseFloat(value);
            } else if (param.type === 'date' || param.type === 'datetime-local') {
                value = new Date(value);
            } else if (param.type === 'text' && value.match(/^\d{2}\/\d{2}\/\d{4}(\s\d{2}:\d{2}:\d{2})?$/)) {
                // Handle DD/MM/YYYY HH:mm:ss format
                const parts = value.split(/[\s\/]/);
                if (parts.length === 3) {
                    // DD/MM/YYYY format
                    value = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
                } else if (parts.length === 4) {
                    // DD/MM/YYYY HH:mm:ss format
                    const [day, month, year, time] = parts;
                    value = new Date(`${year}-${month}-${day}T${time}`);
                }
            }
            
            params.push(value);
            
            // Format for code display
            if (param.type === 'date' || param.type === 'datetime-local') {
                codeParams.push(`new Date('${input.value}')`);
            } else if (param.type === 'text' && input.value.match(/^\d{2}\/\d{2}\/\d{4}(\s\d{2}:\d{2}:\d{2})?$/)) {
                // Handle DD/MM/YYYY format for code display
                codeParams.push(`'${input.value}'`);
            } else if (param.type === 'text') {
                codeParams.push(`'${value}'`);
            } else {
                codeParams.push(value);
            }
        });

        try {
            // Execute function
            let result;
            if (ChronoUtilz[this.currentFunction]) {
                result = ChronoUtilz[this.currentFunction](...params);
            } else {
                throw new Error(`Function ${this.currentFunction} not found in ChronoUtilz`);
            }

            // Display result
            let resultDisplay;
            if (result instanceof Date) {
                // Display in DD/MM/YYYY HH:mm:ss format in user's local timezone
                const userTimezone = ChronoUtilz.getUserTimezone();
                const options = { 
                    timeZone: userTimezone,
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                };
                const localeString = result.toLocaleString('en-GB', options); // en-GB uses DD/MM/YYYY format
                resultDisplay = localeString;
            } else if (Array.isArray(result)) {
                resultDisplay = JSON.stringify(result, null, 2);
            } else if (typeof result === 'object' && result !== null) {
                resultDisplay = JSON.stringify(result, null, 2);
            } else {
                resultDisplay = String(result);
            }

            this.updateElement('functionResult', resultDisplay);

            // Generate code
            const code = `const result = ChronoUtilz.${this.currentFunction}(${codeParams.join(', ')});
console.log(result);

// Result: ${resultDisplay}`;
            
            this.updateElement('generatedCode', code);

        } catch (error) {
            this.updateElement('functionResult', `Error: ${error.message}`);
            this.updateElement('generatedCode', `// Error occurred: ${error.message}`);
        }
    }

    // Utility method to format function examples
    formatExample(funcName, params, description) {
        return `// ${description}
const result = ChronoUtilz.${funcName}(${params});
console.log(result);`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window.playground === 'undefined') {
        window.playground = new ChronoUtilzPlayground();
    }
    window.playground.initialize();
});