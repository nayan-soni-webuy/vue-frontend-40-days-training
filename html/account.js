//################ javscript to show dynamic panel on right side on tab click ######################

// 1. sidebar ke buttons jinme data-tab hai get krna history, logout ko ni 
// 2. right ke tab-panel get krna h sare
const tabButtons = document.querySelectorAll('.tab-link[data-tab');
const panels = document.querySelectorAll('.tab-panel');

// har button ke click pe tab change krna h 
tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const tabName = button.dataset.tab;

        // 3. at first sare panels hide  
        panels.forEach(function (panel) {
            panel.hidden = true;
        });
        // 4. sare btns se highlight remve
        tabButtons.forEach(function(btn) {
            btn.removeAttribute('aria-current');
        });
        // 5. jsi tab pe click kia uska panel show ir btn highlight krna h 
        document.getElementById('panel-' + tabName).hidden = false;
        button.setAttribute('aria-current', 'true');

    });


});