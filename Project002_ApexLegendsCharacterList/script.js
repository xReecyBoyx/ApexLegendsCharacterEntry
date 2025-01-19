
// Character Collection & Other Variables //
let characterCollection = [];

// --- Document Elements --- //
// Injection Element //
let characterAddButton = document.getElementById('addCharacterButton');
let tableBody = document.getElementById('tableBody');

// Boxes to Be Injected //
let legendNameBox = document.getElementById('legendNameTextBox');
let legendSeasonSlider = document.getElementById('seasonJoinedSlider');
let legendTypeCombo = document.getElementById('legendTypeCombo');
let legendPassiveBox = document.getElementById('legendPassiveTextBox');
let legendTacticalBox = document.getElementById('legendTacticalTextBox');
let legendUltimateBox = document.getElementById('legendUltimateTextBox');

// KPI DOM //
let assaultKPILabel = document.getElementById('AssaultKPI');
let controllerKPILabel = document.getElementById('ControllerKPI');
let reconKPILabel = document.getElementById('ReconKPI');
let skirmisherKPILabel = document.getElementById('SkirmisherKPI');
let supportKPILabel = document.getElementById('SupportKPI');

// Other DOM //
let sliderLabel = document.getElementById('seasonJoinedLabel');

// Add Event Listener //
characterAddButton.addEventListener('click', addCharacter);

// FUNCTIONS //
// Check Blank String Return Bool //
function checkBlankString(stringCheck) {

    let bool = stringCheck == '' ? true : false;
    return bool;
}

// Swap Image //
function replaceImage(imageElement, imagePath) {
    imageElement.src = imagePath;
}

// Slider Event //
legendSeasonSlider.addEventListener('input', function() {

    // Slider Event //
    seasonJoinedLabel.textContent = this.value;
})

// Update Visual - KPI & Grid //
function addCharacter() {

    if (checkBlankString(legendNameBox.value))
        {
            alert('Please enter a name for your Legend');
            return;
        }
    
    if (checkBlankString(legendTypeCombo.value))
        {
            alert('Please enter a type for your Legend');
            return;
        }

    if (checkBlankString(legendPassiveBox.value))
        {
            alert('Please enter a passive ability for your Legend');
            return;
        }

    if (checkBlankString(legendTacticalBox.value))
        {
            alert('Please enter a tactical ability for your Legend');
            return;
        }

    if (checkBlankString(legendUltimateBox.value))
        {
            alert('Please enter a ultimate ability for your Legend');
            return;
        }

    // Create Object and Push to Array //
    let newCharacter = 
    {
        legendName: legendNameBox.value,
        legendSeason: legendSeasonSlider.value,
        legendType: legendTypeCombo.value,
        legendPassive: legendPassiveBox.value,
        legendTactical: legendTacticalBox.value,
        legendUltimate: legendUltimateBox.value
    }

    characterCollection.push(newCharacter);

    let characterCount = characterCollection.length;
    let rowClass = (characterCount / 2) > Math.floor(characterCount / 2) ? 'rowStandard' : 'rowAlternate';
    let colorClass = newCharacter.legendType + "Font";

    let htmlInject = `<tr>
                      <td class = "${rowClass}">${newCharacter.legendName}</td>
                      <td class = "${rowClass}">${newCharacter.legendSeason}</td>
                      <td class = "${rowClass} ${colorClass}">${newCharacter.legendType}</td>
                      <td class = "${rowClass}">${newCharacter.legendPassive}</td>
                      <td class = "${rowClass}">${newCharacter.legendTactical}</td>
                      <td class = "${rowClass}">${newCharacter.legendUltimate}</td>
                      <td class = "${rowClass}"><img src="images/binIcon.png" class="binIcon"></td>
                      </tr>
                     `
      
                     tableBody.insertAdjacentHTML('beforeend', htmlInject);

    // Update KPIs //
    UpdateKPI();                 

    // Update Bin Listeners //
    updateBinIconListeners();

}

function UpdateKPI() {

    let assaultCount = 0;
    let controllerCount = 0;
    let reconCount = 0;
    let skirmisherCount = 0;
    let supportCount = 0;

    characterCollection.forEach(character => {
     
        if (character.legendType == 'Assault') {assaultCount++;}
        if (character.legendType == 'Controller') {controllerCount++;}
        if (character.legendType == 'Recon') {reconCount++;}
        if (character.legendType == 'Skirmisher') {skirmisherCount++;}
        if (character.legendType == 'Support') {supportCount++;}
    })

    assaultKPILabel.textContent = assaultCount;
    controllerKPILabel.textContent = controllerCount;
    reconKPILabel.textContent = reconCount;
    skirmisherKPILabel.textContent = skirmisherCount;
    supportKPILabel.textContent = supportCount;
}

// BIN LISTENER //
function binMouseOver(event) {  

    let binIcon = event.target;
    replaceImage(binIcon, 'images/binIconRed.png');
}

function binMouseExit(event) {
    
    let binIcon = event.target;
    replaceImage(binIcon, 'images/binIcon.png');
}

function binMouseDown(event) {

    // Define The binIcon //
    let binIcon = event.target;

    // Find the Row (Closest tr) //
    let row = binIcon.closest('tr');

     // Find the index of the character in the characterCollection array
     let rowIndex = Array.from(tableBody.children).indexOf(row);    

    // Remove the row from the table //
    row.remove();

    // Update Frontend Alternate Row //
    updateAlternateRowColor();

    // Remove the character from the characterCollection array //
    characterCollection.splice(rowIndex, 1);
    
    // Update KPIs after deletion //
    UpdateKPI();
}

function updateBinIconListeners() {

    let binCollection = document.getElementsByClassName('binIcon');

    for (let i = 0; i < binCollection.length; i++)
    {
        let binIcon = binCollection[i];
        // Add Hover Event //
        binIcon.addEventListener('mouseover', binMouseOver);
        binIcon.addEventListener('mouseleave', binMouseExit);

        // Add Down Event //
        binIcon.addEventListener('mousedown', binMouseDown);
    }
}

// Row Color Update //
function updateAlternateRowColor() {

    let rows = tableBody.getElementsByTagName('tr');

        // Iterate through all rows and set the correct class for alternating row colors
        for (let i = 0; i < rows.length; i++) 
        {
            
            let cells = rows[i].getElementsByTagName('td')

            for (let j = 0; j < cells.length; j++)
            {
    
                // Remove the existing row classes
                cells[j].classList.remove('rowStandard', 'rowAlternate');

                // Apply alternating row colors based on index
                if (Math.floor(i / 2) < (i / 2)) 
                {                
                    cells[j].classList.add('rowAlternate');
                } 
            
                else 
                {
                    cells[j].classList.add('rowStandard');
                }
            }
        }
}




